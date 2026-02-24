import Execution from "../domain/executionModel.js";
import createHttpError from "http-errors";

const retryService = async (executionId) => {

  //  Find execution
  const execution = await Execution.findOne({ executionId });

  if (!execution) {
    throw createHttpError(404, "Execution not found");
  }

  //  Find failed actions
  const failedActions = execution.actions.filter(
    action => action.state === "FAILED"
  );

  if (failedActions.length === 0) {
    return { message: "No failed actions to retry" };
  }

  //  Mark all failed actions as PROCESSING first
  for (const action of failedActions) {
    action.state = "PROCESSING";
    action.attempts += 1;
  }

  // Save once
  await execution.save();

  //  Simulate async retry processing
  for (const action of failedActions) {

    setTimeout(async () => {

      try {
        const exec = await Execution.findOne({ executionId });

        if (!exec) return;

        const targetAction = exec.actions.find(
          a => a.actionId === action.actionId
        );

        if (!targetAction) return;

        // 20% failure simulation
        if (Math.random() < 0.2) {
          targetAction.state = "FAILED";
        } else {
          targetAction.state = "COMPLETED";
        }

        await exec.save();

        console.log(
          `[Retry] Execution ${executionId} - Action ${action.actionId} → ${targetAction.state}`
        );

      } catch (err) {
        console.error("Retry processing error:", err.message);
      }

    }, 2000);
  }

  return execution;
};

export default retryService;
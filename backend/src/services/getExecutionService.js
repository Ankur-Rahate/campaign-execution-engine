import Execution from "../domain/executionModel.js"

const getExecutionService = async (userId) =>{
  const executions = await Execution.find({userId}).populate("campaignId", "name triggerEvent").sort({createdAt:-1});
  return executions;
}

export default getExecutionService;
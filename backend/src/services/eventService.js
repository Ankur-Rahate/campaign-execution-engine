import Event from "../domain/eventModel.js";
import Campaign from "../domain/campaignModel.js";
import Execution from "../domain/executionModel.js";
import { processActions } from "./actionProcessor.js";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";

const eventService = async (data) => {

  const { eventId, userId, type, timestamp } = data;

  let execution;

  try {
    //  Try to create Event (Idempotency guard)
    await Event.create({ eventId, userId, type, timestamp });

  } catch (error) {

    //  If duplicate event
    if (error.code === 11000) {

      // Wait briefly in case execution is still being created
      await new Promise(resolve => setTimeout(resolve, 200));

      const existingExecution = await Execution.findOne({ eventId });

      if (!existingExecution) {
        throw createHttpError(
          409,
          "Duplicate event detected but execution not ready. Try again."
        );
      }

      return existingExecution;
    }

    throw error;
  }

  //  Find matching campaign
  const campaign = await Campaign.findOne({ triggerEvent: type });

  if (!campaign) {
    return { message: "No campaign found for this event" };
  }

  //  Create execution instance
  execution = await Execution.create({
    executionId: uuidv4(),
    campaignId: campaign._id,
    eventId,
    userId,
    actions: campaign.actions.map(action => ({
      actionId: action.id,
      state: "PENDING",
      attempts: 0
    }))
  });

  // 5️⃣ Start async processing
  processActions(execution._id);

  return execution;
};

export default eventService;
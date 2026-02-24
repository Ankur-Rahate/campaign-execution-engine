import express from "express";
import retryController from "../controllers/retryController.js";
import getExecutionController from "../controllers/getExecutionController.js";

const executionRouter = express.Router();

executionRouter.post("/:executionId/retry",retryController);
executionRouter.get("/:userId", getExecutionController);

export default executionRouter;
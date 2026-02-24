import express from "express";
import eventController from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.post("/", eventController);

export default eventRouter;
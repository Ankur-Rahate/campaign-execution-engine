import express from "express";
import campaignController from "../controllers/campaignController.js";

const campaignRouter = express.Router();

campaignRouter.post("/", campaignController);

export default campaignRouter;
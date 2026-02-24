import express from "express";
import  globalErrorHandeler  from "./middlewares/globalErrorHandler.js";
import campaignRouter from "./routes/campaignRouter.js";
import eventRouter from "./routes/eventRouter.js";
import executionRouter from "./routes/executionRouter.js";

const app = express();
app.use(express.json())
app.get("/", (req, res, next)=>{
  res.json({message:"Welcome"})
})

app.use("/api/campaigns", campaignRouter);
app.use("/api/events", eventRouter);
app.use("/api/executions", executionRouter);

app.use(globalErrorHandeler)

export default app;
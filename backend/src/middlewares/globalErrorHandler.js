import { config } from "../config/config.js";

const globalErrorHandler = (err, req, res, next) => {
const statuscode = err.statusCode || 500;

return res.status(statuscode).json({
  message:err.message,
  errorStack :config.env === "development" ? err.stack : ""
})
}

export default globalErrorHandler;
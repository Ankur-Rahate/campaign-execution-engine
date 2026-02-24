import createHttpError from "http-errors";
import retryService from "../services/retryService.js";

const retryController = async (req, res, next) =>{
  try{
    const { executionId } = req.params;

    if(!executionId){
      return next (createHttpError(400, "Execution ID required"));
    }

    const result = await retryService(executionId);
    res.status(200).json({
      success:true,
      data:result
    });
  }catch(error){
    next(error)
  }
};

export default retryController;
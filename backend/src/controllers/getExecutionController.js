import createHttpError from "http-errors";
import getExecutionService from "../services/getExecutionService.js";

const getExecutionController = async(req, res, next) =>{
  try{
    const { userId } =  req.params;

    if(!userId){
      return next (createHttpError(400,"User ID require"))
    };
    const execution = await getExecutionService(userId);

    res.status(200).json({
      success:true,
      data:execution
    })
  }catch(error){
    next(error)
  }
}

export default getExecutionController;
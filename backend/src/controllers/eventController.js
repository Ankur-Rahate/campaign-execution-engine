import createHttpError from "http-errors";
import eventService from "../services/eventService.js";

const eventController =  async(req, res, next) =>{
  try{
  const {eventId, userId, type, timestamp}= req.body;

  if(!eventId || !userId || !type || !timestamp){
    return next(createHttpError(400,"All fields are required"))
  }
  const execution = await eventService(req.body);

  res.status(201).json({
    success:true,
    data:execution
  });
}catch(err){
  next(err)
}
} 

export default eventController;
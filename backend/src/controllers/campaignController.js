import createHttpError from "http-errors";
import createCampaign from "../services/campaignService.js";


const campaignController = async (req, res, next) =>{
  try{
  const {name, triggerEvent, actions} = req.body;

 if(!name){
  return next(createHttpError(400, "Name is require"))
 }
 if(!triggerEvent){
  return next(createHttpError(400, "triggerEvent is require"))
 }
 if(!actions || !Array.isArray(actions) || actions.length === 0){
  return next(createHttpError(400, "Actions array is require"))
 }

 for(const action of actions){
  if(action.delayInMinutes < 0){
    return next(createHttpError(400, `Delay cannot be negative for action${action.id}`))
  }
 }

 const campaign = await createCampaign(req.body);

 res.status(201).json({
  success:true,
  data:campaign,
 });
}catch(err){
  return next(err)
}
};

export default campaignController;
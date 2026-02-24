import campaignModel from "../domain/campaignModel.js";

 const createCampaign = async (data) =>{

  const campaign = await campaignModel.create(data);
  return campaign;

}

export default createCampaign;
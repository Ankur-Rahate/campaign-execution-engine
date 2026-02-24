import mongoose from "mongoose";

const actionSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true,
    enum:["SEND_EMAIL","ADD_TAG"]
  },
  delayInMinutes:{
    type:Number,
    required:true,
    min:0
  }
},
{id:false}
);

const campaignSchema = new mongoose.Schema({
  name:{
    required:true,
    trim:true,
    type:String
  },
  triggerEvent:{
    type:String,
    required:true,
  },
  actions:{
    type:[actionSchema],
    required:true,
    validate:{
      validator:function (actions) {
       const ids = actions.map((a)=> a.id);
       return new Set(ids).size === ids.length 
      },
      message:"Action Ids must be unique"

    }
  }
},
{timestamps:true}
);

export default mongoose.model("Campaign", campaignSchema)
import mongoose from "mongoose";

const executionSchema = new mongoose.Schema({
  executionId:{
    type:String,
    required:true
  },
  campaignId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Campaign",
    required:true
  },
  eventId:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true
  },
  actions:[
    {
      actionId:String,
      state:{
        type:String,
        enum:["PENDING", "PROCESSING", "COMPLETED","FAILED"],
        default:"PENDING"
      },
      attempts:{
        type:Number,
        default:0
      }
    }
  ],

  
},{timestamps:true}
)

export default mongoose.model("Execution",executionSchema)
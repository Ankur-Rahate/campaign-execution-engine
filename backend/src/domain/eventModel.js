import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventId:{
    type:String,
    required:true,
    unique:true,
  },
  userId:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true,
  },
  timestamp:{
    type:Date,
    required:true,
  }
},
{timestamps:true}
);

export default mongoose.model("Event", eventSchema);
import mongoose from "mongoose";
import { config } from "./config.js";

const DBconnect = async() =>{
  try{
  await mongoose.connect(config.dbConnectionString);
  console.log("Database Connecting Successfully")
  }catch(error) {
    console.log("Error While Connecting Database", error)
  }
}

export default DBconnect;
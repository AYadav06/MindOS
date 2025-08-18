import mongoose from "mongoose";
import { ENV } from "./env";
import { error } from "console";



export const ConnectDB=async ()=>{
    try{
    await mongoose.connect(ENV.MONGODB_URL);
    console.log("mongodb is connected")
    }
    catch(error){
        console.log("mongodb is failed ",error);
    }
}
import mongoose from "mongoose";
import { ENV } from "./env";


export const ConnectDB=async ()=>{
    try{
    await mongoose.connect(ENV.MONGODB_URL);
    console.log("mongodb is connected");
    console.log(ENV.MONGODB_URL);
    }
    catch(error){
        console.log("mongodb is failed ",error);
    }
}
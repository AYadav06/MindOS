import { Request, Response, Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { random } from "../utils/hash";
import { ContentModel, LinkModel } from "../models/user";
import mongoose from "mongoose";

export const brainRouter=Router();

brainRouter.post("/share",authMiddleware,async(req:AuthRequest,res:Response)=>{
    try{

        const shareLink:boolean=req.body.share;
        const userId=req.userId;

        //check if there is a content to not 
        console.log(shareLink);
        const content=await ContentModel.findOne({userId})

         if(!content){
            res.status(200).json({
                message:"There is no content for the user"
            })

            return;
             }

             if(shareLink){
               const hash=random(1);
               console.log(hash);

               const linkCreated=await LinkModel.findOneAndUpdate({
                   userId: new mongoose.Types.ObjectId(userId as string)},
                {hash:hash},
                {upsert:true,new:true}
               );

               res.json({
                message:`Share link is created ${linkCreated.userId}`,
                link:linkCreated.hash
               })
              return;
             }
             else{
                await LinkModel.deleteOne({userId});
                res.status(200).json({
                    message:"link is disabled"
                })
                return;
             }

    }
    catch(e){
        res.status(500).json({
            message: "Internal Server Error in /share",
            error:e
        });

    }


})
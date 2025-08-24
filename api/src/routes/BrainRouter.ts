import { Request, Response, Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { random } from "../utils/hash";
import { ContentModel, LinkModel } from "../models/user";
import mongoose from "mongoose";

export const brainRouter=Router();

brainRouter.post("/share",authMiddleware,async(req:AuthRequest,res:Response)=>{
    try{

        const enableLink:boolean=req.body.share;
        const userId=req.userId;

    
        const content=await ContentModel.findOne({userId})

         if(!content){
            res.status(200).json({
                message:"There is no content for the user"
            })

            return;
             }

             if(enableLink){
                let linkCreated=await LinkModel.findOne({userId})
               if(!linkCreated){
                 const hash=random(1);
                   linkCreated=await LinkModel.create({
                       userId: new mongoose.Types.ObjectId(userId as string),
                       hash
                })
            }

               return res.json({
                message:`Share link is created ${linkCreated.userId}`,
                link: `${req.protocol}://${req.get("host")}/api/v1/brain/${linkCreated.hash}`
               })
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


brainRouter.get("/:shareLink",async (req:Request,res:Response)=>{

    const shareLink=req.params.shareLink;

    try {
        const collection =await LinkModel.findOne({
            hash:shareLink
        });

        if(!collection){
            res.json({
                message:"No collection is found"
            })
            return;
        }
        else{
            const content=await ContentModel.find({
                userId:collection.userId
            }).populate('tags','title')

            res.status(200).json({
                content

            })
            return;
        }


    } catch (error) {
        console.error("Error in GET /:shareLink:", error);
        res.status(500).json({
            message:"Internal server Error"
        })
        return;
    }
})
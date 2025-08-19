import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/user";
import { safeParse } from "zod";
import { AuthSchema } from "../types/Schema";

export const userRouter = Router()

userRouter.post("/signup", async (req: Request, res: Response) => {

    try {
        const {success,data,error}=AuthSchema.safeParse(req.body);

        if(!success){
            res.status(411).json({
                message:"Error in inputs"
                
            })
        }
            else{
                const hashedPassword = await bcrypt.hash(data.password, 10);
                const response = await UserModel.create({
            username: data.username,
            password: hashedPassword,
        })
        res.status(201).json({
            message: "user is created ... "
        })

            }
        }
    catch(error){
        console.log("error while signup...");
    }
})

userRouter.post("/signin", (req: Request, res: Response) => {
const username=req.body.username;
const password=req.body.password;

try{


}
catch(err){

}


})




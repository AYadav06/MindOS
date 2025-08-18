import { Router ,Request,Response} from "express";

export const userRouter=Router()

userRouter.get("/test",(req:Request,res:Response)=>{
    res.json({
        message:"server is running "
    })
})




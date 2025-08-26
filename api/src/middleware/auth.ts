import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, Router } from "express";
import { ENV } from "../config/env";
import { UserModel } from "../models/user";
export const router=Router();
export interface AuthRequest extends Request {
  userId?: string;
}
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[ENV.COOKIE_NAME];

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, ENV.JWT_SECRETE as string) as JwtPayload;
   req.userId=decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
};

router.get("/me",authMiddleware,async (req:AuthRequest,res:Response)=>{

  try{
const user=await UserModel.findById(req.userId).select("-password");
if(!user)return res.status(404).json({message:"user not found"});

res.json(user);
  }
  catch(e){
res.status(500).json({ message: "Server error" });
  }
}
)

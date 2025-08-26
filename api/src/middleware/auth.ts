import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env";

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
   req.userId=decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
};

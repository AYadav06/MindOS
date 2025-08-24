import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env";

// Extend Request with userId
export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRETE as string) as JwtPayload;

    // ✅ Make sure token has an id
    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
   req.userId=decoded.userId;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

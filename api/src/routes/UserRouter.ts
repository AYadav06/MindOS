import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user";
import { AuthSchema, SignSchema } from "../types/Schema";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { authMiddleware } from "../middleware/auth";

export const userRouter = Router();
userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { success, data, error } = AuthSchema.safeParse(req.body);

        if (!success) {
            res.status(411).json({
                message: "Error in inputs",
                errors: error.format()
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        await UserModel.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "user is created ... ",
        });
    } catch (error: any) {
        console.error("error while signup:", error);
        
        if (error.code === 11000) {
            res.status(409).json({
                message: "User with this email or name already exists"
            });
            return;
        }

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        const { data, success, error } = SignSchema.safeParse(req.body);
        if (!success) {
            res.status(411).json({
                message: "Error in inputs",
                errors: error.format(),
            });
            return;
        }

        const existingUser = await UserModel.findOne({
            email: data.email,
        });

        if (!existingUser) {
            res.status(403).json({
                message: "Invalid email or password",
            });
            return;
        }

        const matchPassword = await bcrypt.compare(
            data.password,
            existingUser.password as string
        );

        if (matchPassword) {
            const token = jwt.sign(
                {
                    id: existingUser._id,
                },
                ENV.JWT_SECRETE
            );
            const isProd = process.env.NODE_ENV === "production" || true;
            res.cookie(ENV.COOKIE_NAME, token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });

            res.json({
                message: "login is successful",
                token: token,
            });
        } else {
            res.status(403).json({
                message: "Invalid email or password",
            });
        }
    } catch (err) {
        console.error("error while signin:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

userRouter.post("/logout",(_,res)=>{
    res.clearCookie(ENV.COOKIE_NAME, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    res.json({
        message:"User is Loggout"
    })
})


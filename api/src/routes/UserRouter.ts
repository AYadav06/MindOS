import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user";
import { safeParse } from "zod";
import { AuthSchema } from "../types/Schema";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { success, data, error } = AuthSchema.safeParse(req.body);

        if (!success) {
            res.status(411).json({
                message: "Error in inputs",
            });
        } else {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const response = await UserModel.create({
                username: data.username,
                password: hashedPassword,
            });
            res.status(201).json({
                message: "user is created ... ",
            });
        }
    } catch (error) {
        console.log("error while signup...");
    }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        const { data, success, error } = AuthSchema.safeParse(req.body);
        if (!success) {
            res.json({
                message: "error in inputs",
                error: error,
            });
            return;
            } 
        else {
            const existingUser = await UserModel.findOne({
                username: data.username,
            });

            if (!existingUser?.password) {
                throw new Error("user password  not found ..");
            }
            const matchPassword = await bcrypt.compare(
                data.password,
                existingUser.password
            );

            if (matchPassword) {
                const token = jwt.sign(
                    {
                        id: existingUser._id,
                    },
                    ENV.JWT_SECRETE
                );

                res.json({
                    message: "login is succesful",
                    token: token,
                });
                return;
            } else {
                res.json({
                    message: "username or password is invalid",
                });
                return;
            } 
        }
    } catch (err) {
        res.status(500).json({
            message:"Internal server error"
        })
     }
});



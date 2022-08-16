import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db/db";
import { signUpFormSchema } from "../../../types/authschemas";

export default async function signUpUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { username, password } = signUpFormSchema.parse(req.body);
            const avatar = createAvatar(style, { dataUri: true, size: 128 });
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    avatar
                }
            });
            res.status(201).end();
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    res.status(409).json({
                        error: "That username is already in use"
                    });
                }
            } else {
                res.status(400).json(error);
            }
        }
    }
}

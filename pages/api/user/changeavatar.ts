import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { changeAvatarSchema } from "../../../types/authschemas";
import { authOptions } from "../auth/[...nextauth]";

export default async function handleAvatarChange(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "PATCH") {
        try {
            const { avatar, id } = changeAvatarSchema.parse(req.body);

            await prisma.user.update({
                where: { id },
                data: { avatar }
            });

            res.status(200).json(avatar);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

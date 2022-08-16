import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { userSchema } from "../../../types/authschemas";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "POST") {
        try {
            const { id } = userSchema.parse(req.body);
            const user = await prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            });

            if (!user) res.status(400).end();

            res.status(200).json({ user });
        } catch (error) {
            res.status(400).end();
        }
    }
}

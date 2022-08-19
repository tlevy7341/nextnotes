import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { deleteSchema } from "../../../shared/authschemas";
import { authOptions } from "../auth/[...nextauth]";

export default async function deleteAccount(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "DELETE") {
        try {
            const { id } = deleteSchema.parse(req.body);

            await prisma.user.delete({
                where: { id }
            });

            res.status(200).json({ message: "User deleted" });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { authOptions } from "../auth/[...nextauth]";

const getNotes = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "GET") {
        try {
            const id = session!.user!.id!;
            const notes = await prisma.notes.findMany({
                where: {
                    user_id: id
                },
                orderBy: {
                    created_at: "desc"
                }
            });
            res.status(200).json(notes);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

export default getNotes;

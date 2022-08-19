import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { authOptions } from "../auth/[...nextauth]";
import { updateNoteSchema } from "./noteszodschema";

const updateNote = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "PUT") {
        try {
            const { id, title, content } = updateNoteSchema.parse(
                req.body.data
            );

            const updatedNote = await prisma.notes.update({
                where: { id },
                data: { title, content }
            });
            res.status(200).json(updatedNote);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

export default updateNote;

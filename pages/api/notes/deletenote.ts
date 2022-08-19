import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { authOptions } from "../auth/[...nextauth]";
import { deleteNoteSchema } from "./noteszodschema";

const deleteNote = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "DELETE") {
        try {
            const { id } = deleteNoteSchema.parse(req.body);
            const deletedNote = await prisma.notes.delete({
                where: { id }
            });
            res.status(200).json(deletedNote);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

export default deleteNote;

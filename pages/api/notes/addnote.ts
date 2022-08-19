import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { authOptions } from "../auth/[...nextauth]";
import { addNoteSchema } from "./noteszodschema";

const addNote = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "POST") {
        try {
            const id = session!.user!.id!;
            const { title, content } = addNoteSchema.parse(req.body);
            const addedNote = await prisma.notes.create({
                data: {
                    title,
                    content,
                    user_id: id
                }
            });
            res.status(201).json(addedNote);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

export default addNote;

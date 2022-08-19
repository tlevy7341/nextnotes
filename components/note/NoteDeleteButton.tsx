import { useMutation, useQueryClient } from "@tanstack/react-query";
import NProgress from "nprogress";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { NoteType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { DeleteNoteType, NoteDeleteButtonProps } from "./notetypes";

const NoteDeleteButton = ({ note, isSelected }: NoteDeleteButtonProps) => {
    const queryClient = useQueryClient();
    const deleteNote = async ({ id }: DeleteNoteType) => {
        return customAxios.delete("/notes/deletenote", {
            data: { id }
        });
    };

    const deleteMutation = useMutation(deleteNote, {
        onMutate: (deletedNoteId) => {
            NProgress.start();
            queryClient.setQueryData(["notes"], (prevNotes: any) => {
                return prevNotes.filter(
                    (note: NoteType) => note.id !== deletedNoteId.id
                );
            });
        },
        onError: (error: string) => {
            toast.error(error);
        },
        onSettled: () => {
            NProgress.done();
            queryClient.invalidateQueries(["notes"]);
        }
    });

    return (
        <button
            onClick={() => deleteMutation.mutate({ id: note.id })}
            className={`mx-3 hover:scale-110 my-1 text-sm ${
                isSelected ? "cursor-pointer" : "cursor-default"
            } `}>
            <FaTrash className="text-red-700" />
        </button>
    );
};

export default NoteDeleteButton;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { FaTrash } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { NoteType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { DeleteNoteType, NoteDeleteButtonProps } from "./notetypes";

const NoteDeleteButton = ({ note, isSelected }: NoteDeleteButtonProps) => {
    const queryClient = useQueryClient();
    const { theme } = useTheme();
    const deleteNote = async ({ id }: DeleteNoteType) => {
        return customAxios.delete("/notes/deletenote", {
            data: { id }
        });
    };

    const deleteMutation = useMutation(deleteNote, {
        onMutate: (deletedNoteId) => {
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
            queryClient.invalidateQueries(["notes"]);
        }
    });

    if (deleteMutation.isLoading) {
        return (
            <div className="flex items-center w-screen">
                <BeatLoader
                    color={`${theme === "dark" ? "#d0d0d0" : "#00000"}`}
                />
            </div>
        );
    }

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

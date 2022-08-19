import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { FaSave } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import customAxios from "../../utils/axios";
import NoteDeleteButton from "./NoteDeleteButton";
import { NoteEditingProps, NoteProps } from "./notetypes";

const NoteEditingIcons = ({
    setNoteError,
    setIsSelected,
    isSelected,
    note,
    noteTitleRef,
    noteContentRef
}: NoteEditingProps) => {
    const queryClient = useQueryClient();
    const { theme } = useTheme();

    const submitNote = () => {
        const newTitle = noteTitleRef?.current?.innerText;
        const newContent = noteContentRef?.current?.innerText;

        setIsSelected(false);
        if (newTitle === "" || newContent === "") {
            setNoteError({
                titleError: newTitle === "" ? "Title is required" : "",
                contentError: newContent === "" ? "Content is required" : ""
            });
            return;
        }
        setNoteError({
            titleError: "",
            contentError: ""
        });

        if (newTitle === note.title && newContent === note.content) return;

        updateMutation.mutate({
            note: {
                id: note.id,
                title: newTitle!,
                content: newContent!
            }
        });
    };

    const updateNote = async ({ note }: NoteProps) => {
        return customAxios.put("/notes/updatenote", {
            data: note
        });
    };

    const updateMutation = useMutation(updateNote, {
        onMutate: ({ note: updatedNote }) => {
            noteContentRef.current!.innerText = updatedNote.content;
            noteTitleRef.current!.innerText = updatedNote.title;
        },
        onError: (error: string) => {
            toast.error(error);
        },
        onSettled: () => {
            setIsSelected(false);
            queryClient.invalidateQueries(["notes"]);
        }
    });

    if (updateMutation.isLoading) {
        return (
            <div className="flex items-center w-screen">
                <BeatLoader
                    color={`${theme === "dark" ? "#d0d0d0" : "#00000"}`}
                />
            </div>
        );
    }

    return (
        <div
            className={`flex justify-between p-2 mt-2  ${
                isSelected ? "opacity-100" : "opacity-0"
            }`}>
            <NoteDeleteButton isSelected={isSelected} note={note} />
            <button
                onClick={submitNote}
                className={`text-teal-700 hover:scale-110 mx-3 my-1 ${
                    isSelected ? "cursor-pointer" : "cursor-default"
                } `}>
                <FaSave />
            </button>
        </div>
    );
};

export default NoteEditingIcons;

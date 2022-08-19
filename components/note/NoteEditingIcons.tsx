import { useMutation, useQueryClient } from "@tanstack/react-query";
import NProgress from "nprogress";
import { FaSave } from "react-icons/fa";
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

        mutate({
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

    const { mutate } = useMutation(updateNote, {
        onMutate: ({ note: updatedNote }) => {
            NProgress.start();
            noteContentRef.current!.innerText = updatedNote.content;
            noteTitleRef.current!.innerText = updatedNote.title;
        },
        onError: (error: string) => {
            toast.error(error);
        },
        onSettled: () => {
            NProgress.done();
            setIsSelected(false);
            queryClient.invalidateQueries(["notes"]);
        }
    });

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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import useOnClickOutside from "use-onclickoutside";
import customAxios from "../../utils/axios";
import NoteFormContentSection from "./NoteFormContentSection";
import NoteFormTitleSection from "./NoteFormTitleSection";
import { NoteFormType } from "./noteformtypes";

const NoteForm = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const formRef = useRef(null);
    const queryClient = useQueryClient();
    const { theme } = useTheme();

    const initialNoteErrorState = {
        titleError: "",
        contentError: ""
    };

    const [noteError, setNoteError] = useState(initialNoteErrorState);
    const noteTitleRef = useRef<HTMLDivElement>(null);
    const noteContentRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(formRef, () => {
        setIsExpanded(false);
        noteTitleRef.current!.textContent = "";
        noteContentRef.current!.textContent = "";
        setNoteError({ ...initialNoteErrorState });
    });

    const addNote = async ({ title, content }: NoteFormType) => {
        return await customAxios.post("/notes/addnote", {
            title,
            content
        });
    };

    const submitNote = async () => {
        const title = noteTitleRef?.current?.innerText;
        const content = noteContentRef?.current?.innerText;

        if (title === "" || content === "") {
            setNoteError({
                titleError: title === "" ? "Title is required" : "",
                contentError: content === "" ? "Content is required" : ""
            });
            return;
        }
        setNoteError({ ...initialNoteErrorState });

        addMutation.mutate({ title: title!, content: content! });
        setIsExpanded(false);
    };

    const addMutation = useMutation(addNote, {
        onError: (error: string) => {
            toast.error(error);
        },
        onSuccess: () => {
            noteTitleRef.current!.textContent = "";
            noteContentRef.current!.textContent = "";
        },
        onSettled: () => {
            queryClient.invalidateQueries(["notes"]);
        }
    });

    if (addMutation.isLoading) {
        return (
            <div className="flex items-center w-screen">
                <ClipLoader
                    color={`${theme === "dark" ? "#d0d0d0" : "#00000"}`}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center pt-10">
            <span className="pb-2 font-semibold text-red-500">
                {noteError.titleError || noteError.contentError}
            </span>
            <div
                ref={formRef}
                className="flex flex-col w-full px-4 sm:shadow-lg sm:px-0 sm:w-1/3">
                <NoteFormTitleSection
                    setIsExpanded={setIsExpanded}
                    isExpanded={isExpanded}
                    noteTitleRef={noteTitleRef}
                    noteContentRef={noteContentRef}
                    setNoteError={setNoteError}
                />
                <NoteFormContentSection
                    isExpanded={isExpanded}
                    noteContentRef={noteContentRef}
                    submitNote={submitNote}
                />
            </div>
        </div>
    );
};

export default NoteForm;

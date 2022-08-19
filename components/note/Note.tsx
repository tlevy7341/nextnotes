import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import NoteEditingIcons from "./NoteEditingIcons";
import { NoteProps } from "./notetypes";

const Note = ({ note }: NoteProps) => {
    const [isSelected, setIsSelected] = useState(false);
    const noteContentRef = useRef<HTMLDivElement>(null);
    const noteRef = useRef<HTMLDivElement>(null);
    const noteTitleRef = useRef<HTMLDivElement>(null);

    const [noteError, setNoteError] = useState({
        titleError: "",
        contentError: ""
    });

    useOnClickOutside(noteRef, () => {
        setIsSelected(false);
        noteContentRef.current!.innerText = note.content;
        noteTitleRef.current!.innerText = note.title;
    });

    useEffect(() => {
        noteContentRef.current!.innerText = note.content;
        noteTitleRef.current!.innerText = note.title;
    }, []);

    return (
        <div
            onClick={() => {
                setIsSelected(true);
            }}
            className={`mx-4 last:mb-4 md:mb-0 duration-75 ${
                isSelected ? "lg:scale-110" : "scale-100"
            }`}>
            <div className="text-sm font-semibold text-red-500 sm:pb-6 sm:m-0 sm:h-4">
                {noteError.titleError || noteError.contentError}
            </div>

            <motion.div
                layout
                key={note.id}
                initial={{ opacity: 0, y: "50%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                    opacity: 0,
                    y: "-50%",
                    transition: { duration: 0.1 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                ref={noteRef}
                className={`flex flex-col border shadow-lg rounded`}>
                <div
                    ref={noteTitleRef}
                    spellCheck={false}
                    className="h-auto px-3 py-1 overflow-y-auto font-semibold break-words whitespace-normal outline-none bg-base-100"
                    suppressContentEditableWarning
                    contentEditable={true}></div>
                <div
                    ref={noteContentRef}
                    spellCheck={false}
                    className="h-auto px-3 py-2 mt-1 overflow-x-hidden overflow-y-auto break-words whitespace-normal outline-none"
                    suppressContentEditableWarning
                    contentEditable={true}></div>
                <NoteEditingIcons
                    setIsSelected={setIsSelected}
                    isSelected={isSelected}
                    note={note}
                    noteContentRef={noteContentRef}
                    noteTitleRef={noteTitleRef}
                    setNoteError={setNoteError}
                />
            </motion.div>
        </div>
    );
};

export default Note;

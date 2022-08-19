import { FaTimes } from "react-icons/fa";
import { NoteFormTitleSectionProps } from "./noteformtypes";

const NoteFormTitleSection = ({
    isExpanded,
    setIsExpanded,
    noteTitleRef,
    noteContentRef,

    setNoteError
}: NoteFormTitleSectionProps) => {
    const closeInput = () => {
        setIsExpanded(false);
        noteTitleRef.current!.textContent = "";
        noteContentRef.current!.textContent = "";
        setNoteError({
            titleError: "",
            contentError: ""
        });
    };

    return (
        <div
            className={`flex border ${
                isExpanded ? "border-b-0 rounded-b-none" : null
            }   rounded pr-3`}>
            <div
                ref={noteTitleRef}
                id="note-form-title"
                suppressContentEditableWarning
                contentEditable={isExpanded}
                spellCheck={false}
                onClick={() => {
                    setIsExpanded(true);
                    setTimeout(function () {
                        noteTitleRef.current!.focus();
                    }, 0);
                }}
                data-placeholder={isExpanded ? "Title" : "Take a note..."}
                className={`px-5 h-12 flex-1 bg-base-100 py-2 outline-none `}></div>
            {isExpanded && (
                <button
                    className="text-red-500 hover:scale-110"
                    onClick={closeInput}>
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

export default NoteFormTitleSection;

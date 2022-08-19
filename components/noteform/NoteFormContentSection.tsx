import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
import { NoteFormContentSectionProps } from "./noteformtypes";

const NoteFormContentSection = ({
    isExpanded,
    noteContentRef,
    submitNote
}: NoteFormContentSectionProps) => {
    return (
        <>
            <motion.div
                onClick={() => {
                    setTimeout(function () {
                        noteContentRef.current!.focus();
                    }),
                        0;
                }}
                initial={{ height: 0 }}
                animate={isExpanded ? { height: "min-content" } : { height: 0 }}
                transition={{ duration: 0.25 }}
                className={`border border-y-0 border-cool-gray-100 `}>
                <div
                    ref={noteContentRef}
                    id="note-form-content"
                    spellCheck={false}
                    data-placeholder={`Take a note...`}
                    suppressContentEditableWarning
                    contentEditable={isExpanded}
                    className={`px-5 pt-2 bg-base-100 w-full outline-none overflow-x-hidden overflow-y-auto break-words whitespace-normal ${
                        isExpanded ? "block" : "hidden"
                    }`}></div>
            </motion.div>

            {isExpanded && (
                <div className="flex justify-end p-2 border border-t-0 rounded-b">
                    <button
                        onClick={submitNote}
                        className="pr-2 text-teal-600 hover:scale-110">
                        <FaLongArrowAltRight />
                    </button>
                </div>
            )}
        </>
    );
};

export default NoteFormContentSection;

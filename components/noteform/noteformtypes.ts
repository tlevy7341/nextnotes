import { Dispatch, SetStateAction } from "react";

export interface NoteFormType {
    title: string;
    content: string;
}

export interface NoteFormErrorType {
    titleError: string;
    contentError: string;
}

export interface NoteFormTitleSectionProps {
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>;
    noteTitleRef: React.RefObject<HTMLDivElement>;
    noteContentRef: React.RefObject<HTMLDivElement>;
    setNoteError: Dispatch<SetStateAction<NoteFormErrorType>>;
}

export interface NoteFormContentSectionProps {
    isExpanded: boolean;
    noteContentRef: React.RefObject<HTMLDivElement>;
    submitNote: () => void;
}

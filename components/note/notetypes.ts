import { Dispatch, RefObject, SetStateAction } from "react";
import { NoteType } from "../../shared/sharedtypes";

export interface NoteProps {
    note: NoteType;
}

export interface DeleteNoteType {
    id: number;
}

export interface NoteDeleteButtonProps {
    note: NoteType;
    isSelected: boolean;
}

export interface NoteEditingProps {
    setIsSelected: Dispatch<SetStateAction<boolean>>;
    isSelected: boolean;
    note: NoteType;
    noteContentRef: RefObject<HTMLDivElement>;
    noteTitleRef: RefObject<HTMLDivElement>;
    setNoteError: Dispatch<
        SetStateAction<{
            titleError: string;
            contentError: string;
        }>
    >;
}

export interface AppUserType {
    user: {
        id: number;
        username: string;
        avatar: string;
    };
}

export interface NoteType {
    id: number;
    title: string;
    content: string;
}

export interface IdProps {
    id: number;
}

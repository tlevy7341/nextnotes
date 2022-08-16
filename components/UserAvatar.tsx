import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "react-toastify";
import { AppUser } from "../types/types";
import customAxios from "../utils/axios";

const UserAvatar = ({ user }: AppUser) => {
    const queryClient = useQueryClient();

    const changeAvatar = async () => {
        const avatar = createAvatar(style, {
            dataUri: true,
            size: 128
        });

        return await customAxios.patch<AppUser>("/user/changeavatar", {
            avatar,
            id: user.id
        });
    };

    const avatarMutation = useMutation(changeAvatar, {
        onError: () => {
            toast.error("Error updating avatar");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["user"]);
        }
    });

    return (
        <section>
            <div className="flex items-center justify-center p-3 border-2 rounded-3xl">
                <Image
                    id="avatarImage"
                    src={user.avatar}
                    alt="user avatar"
                    width={128}
                    height={128}
                />
            </div>
            <button
                id="changeAvatarButton"
                onClick={() => avatarMutation.mutate()}
                className="mt-3 btn btn-block">
                Change Avatar
            </button>
        </section>
    );
};

export default UserAvatar;

import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { MenuButtonProps } from "./menubuttontypes";

const MenuButton = ({ user }: MenuButtonProps) => {
    const [firstInitial, setFirstInitial] = useState("");
    const router = useRouter();
    useEffect(() => {
        if (user) {
            setFirstInitial(user?.user.username.charAt(0).toUpperCase());
        }
    }, [user]);
    return (
        <div className="flex justify-center mt-12 mr-12 md:justify-end dropdown">
            <label
                tabIndex={0}
                className="px-12 text-2xl font-bold drop-shadow btn btn-square btn-accent">
                {firstInitial}
            </label>
            <ul
                tabIndex={0}
                className="w-40 p-2 border shadow dropdown-content menu bg-base-300 rounded-box">
                <li onClick={() => router.push("/user/userprofile")}>
                    <p className="p-2">
                        <FaCog />
                        Settings
                    </p>
                </li>
                <div className="p-0 m-0 divider"></div>
                <li
                    onClick={() =>
                        signOut({
                            redirect: true,
                            callbackUrl: "/signin"
                        })
                    }>
                    <p className="p-2">
                        <FaSignOutAlt /> Sign out
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default MenuButton;

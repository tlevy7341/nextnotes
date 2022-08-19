import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BarLoader } from "react-spinners";
import DeleteAccountButton from "../../components/userprofile/DeleteAccountButton";
import ThemeSwitcher from "../../components/userprofile/ThemeSwitcher";
import UserAvatar from "../../components/userprofile/UserAvatar";
import { AppUserType, IdProps } from "../../shared/sharedtypes";
import { getUser } from "../../utils/helperfunctions";
import { authOptions } from "../api/auth/[...nextauth]";

const UserProfile: NextPage<IdProps> = ({ id }) => {
    const router = useRouter();
    const { data, isLoading } = useQuery<AppUserType, Error>(
        ["user"],
        () => getUser(id),
        {
            onError: () => {
                signOut({ redirect: true, callbackUrl: "/signin" });
            }
        }
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-screen h-screen">
                <BarLoader />
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <main className="flex items-center justify-center w-screen h-screen">
                <div className="flex flex-col items-center justify-around w-screen h-screen">
                    <div className="flex items-center w-screen">
                        <div className="flex justify-center flex-1 ">
                            <FaLongArrowAltLeft
                                onClick={() => router.push("/")}
                                className="text-4xl transition-all duration-100 hover:cursor-pointer hover:scale-125"
                            />
                        </div>

                        <h1 className="flex items-center justify-center">
                            <span className="text-2xl font-bold ">
                                Welcome {data?.user.username}
                            </span>
                        </h1>
                        <div className="flex-1"></div>
                    </div>

                    <div className="flex flex-col justify-center space-y-4">
                        {data && <UserAvatar user={data.user} />}

                        <ThemeSwitcher />
                    </div>
                    {data && <DeleteAccountButton id={data.user.id} />}
                </div>
            </main>
        </>
    );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await unstable_getServerSession(
        ctx.req,
        ctx.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false
            }
        };
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["user"], () => getUser(session.user.id));

    return {
        props: {
            deydratedState: dehydrate(queryClient),
            id: session.user.id
        }
    };
};

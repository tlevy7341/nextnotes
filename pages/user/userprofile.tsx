import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { BarLoader } from "react-spinners";
import DeleteAccountButton from "../../components/DeleteAccountButton";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import UserAvatar from "../../components/UserAvatar";
import { AppUser, IdProps } from "../../types/types";
import { getUser } from "../../utils/helperfunctions";
import { authOptions } from "../api/auth/[...nextauth]";

const UserProfile: NextPage<IdProps> = ({ id }) => {
    const { data, isLoading } = useQuery<AppUser, Error>(
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
                <div className="flex flex-col justify-around h-full">
                    <h1 className="flex items-center">
                        <span className="pr-2 text-2xl font-bold ">
                            Welcome {data?.user.username}
                        </span>
                    </h1>
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

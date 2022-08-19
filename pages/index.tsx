import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import Head from "next/head";
import NProgress from "nprogress";
import MenuButton from "../components/menubutton/MenuButton";
import Note from "../components/note/Note";
import NoteForm from "../components/noteform/NoteForm";
import { AppUserType, IdProps, NoteType } from "../shared/sharedtypes";
import customAxios from "../utils/axios";
import { getUser } from "../utils/helperfunctions";
import { authOptions } from "./api/auth/[...nextauth]";

const getNotes = async () => {
    const response = await customAxios.get("/notes/getnotes");
    return response.data;
};

const Home: NextPage<IdProps> = ({ id }) => {
    const { data: user } = useQuery<AppUserType, Error>(
        ["user"],
        () => getUser(id),
        {
            onError: () => {
                signOut({ redirect: true, callbackUrl: "/signin" });
            }
        }
    );

    const { data, isLoading } = useQuery<NoteType[], Error>(
        ["notes"],
        getNotes,
        {
            onError: () => {
                signOut({ redirect: true, callbackUrl: "/signin" });
            },
            onSettled: () => NProgress.done()
        }
    );

    if (isLoading) NProgress.start();

    return (
        <div>
            <Head>
                <title>Next Notes</title>
            </Head>

            <main className="flex flex-col w-screen h-screen">
                <MenuButton user={user!} />
                <NoteForm />

                <div className="container grid grid-cols-1 mx-auto mt-10 auto-rows-auto sm:grid-cols-3 lg:grid-cols-6">
                    <AnimatePresence>
                        {data &&
                            data.map((note) => {
                                return <Note key={note.id} note={note} />;
                            })}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Home;

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
    await queryClient.prefetchQuery(["notes"], getNotes);

    return {
        props: {
            deydratedState: dehydrate(queryClient),
            id: session.user.id
        }
    };
};

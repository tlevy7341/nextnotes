import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { AppUser, IdProps } from "../types/types";
import { getUser } from "../utils/helperfunctions";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage<IdProps> = ({ id }) => {
    useQuery<AppUser, Error>(["user"], () => getUser(id), {
        onError: () => {
            signOut({ redirect: true, callbackUrl: "/signin" });
        }
    });

    return (
        <div>
            <Head>
                {/* TODO Change title */}
                <title>Main Page</title>
            </Head>

            <main className="flex items-center justify-center w-screen h-screen">
                <h1>Hello Next.js</h1>
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

    return {
        props: {
            deydratedState: dehydrate(queryClient),
            id: session.user.id
        }
    };
};

import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signInFormSchema, signInFormSchemaType } from "../types/authschemas";
import { authOptions } from "./api/auth/[...nextauth]";

const SignInPage = () => {
    const router = useRouter();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<signInFormSchemaType>({
        resolver: zodResolver(signInFormSchema)
    });

    const handleSignInUser = async (formData: signInFormSchemaType) => {
        const response = signIn("credentials", {
            ...formData,
            redirect: false
        });
        const results = await response;
        if (results?.error) {
            toast.error("Invalid credentials");
            return;
        }
        reset();
        router.push("/");
    };

    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>
            <main className="flex flex-col justify-around min-h-screen min-w-screen">
                <h1 className="font-black text-center sm:text-6xl">
                    Project Name
                </h1>
                <div className="px-4 pt-10 border rounded shadow-full sm:max-w-xl sm:mx-auto sm:p-20 sm:pb-0">
                    <div>
                        <h3 className="text-2xl font-semibold text-center">
                            Sign In
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit(handleSignInUser)}>
                        <div className="pt-8 space-y-4 text-base sm:text-lg ">
                            <div>
                                <label htmlFor="username" className="invisible">
                                    username
                                </label>
                                <input
                                    {...register("username")}
                                    id="username"
                                    type="text"
                                    className="w-full input input-bordered input-accent"
                                    placeholder="username"
                                    autoFocus
                                />

                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="invisible">
                                    Password
                                </label>
                                <input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    className="w-full input input-bordered input-accent"
                                    placeholder="Password"
                                />

                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500 ">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <button
                                    id="signInButton"
                                    type="submit"
                                    className="mt-2 btn btn-accent btn-block">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-center pt-10 pb-2">
                        <p className="text-sm ">
                            Don&apos;t have an account?
                            <Link href="/signup">
                                <a className="pl-1 text-sm link-accent hover:underline">
                                    Sign Up
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SignInPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await unstable_getServerSession(
        ctx.req,
        ctx.res,
        authOptions
    );

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
};

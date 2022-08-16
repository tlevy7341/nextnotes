import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signUpFormSchema, signUpFormSchemaType } from "../types/authschemas";
import customAxios from "../utils/axios";
import { authOptions } from "./api/auth/[...nextauth]";

const SignUpPage = () => {
    const router = useRouter();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<signUpFormSchemaType>({
        resolver: zodResolver(signUpFormSchema)
    });

    const handleSignUpUser = async (formData: signUpFormSchemaType) => {
        try {
            const response = await customAxios.post("/auth/signup", formData);
        } catch (error) {
            toast.error(error as string);
            return;
        }

        reset();
        toast.success("User created successfully");
        router.push("/signin");
    };

    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <main className="flex flex-col justify-around min-h-screen min-w-screen">
                <h1 className="font-black text-center sm:text-6xl">
                    Project Name
                </h1>

                <section className="px-4 pt-10 border rounded shadow-full sm:max-w-xl sm:mx-auto sm:p-20 sm:pb-0">
                    <div>
                        <h3 className="text-2xl font-semibold text-center">
                            Sign Up
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit(handleSignUpUser)}>
                        <div className="pt-8 space-y-2 text-base sm:text-lg ">
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
                                    id="signUpButton"
                                    type="submit"
                                    className="mt-4 btn btn-block btn-accent ">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-center pt-20 pb-2">
                        <p className="text-sm text-gray-500">
                            Already have an account?
                            <Link href="/signin">
                                <a className="pl-1 text-sm link-accent hover:underline">
                                    Sign In
                                </a>
                            </Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default SignUpPage;

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

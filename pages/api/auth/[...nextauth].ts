import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../db/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials, req) {
                const username: string = credentials!.username;
                const password = credentials!.password;
                const user = await prisma.user.findUnique({
                    where: { username }
                });
                if (!user) {
                    return null;
                }

                const isCorrectPassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!isCorrectPassword) return null;

                return user;
            }
        })
    ],
    secret: process.env.JWT_SECRET as string,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        async session({ token, session }: any) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin"
    }
};

export default NextAuth(authOptions);

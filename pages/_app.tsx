import {
    Hydrate,
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import "../styles/globals.css";

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps) => {
    const [queryClient] = useState(
        () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
    );

    return (
        <SessionProvider session={session}>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </Hydrate>
                </QueryClientProvider>
            </ThemeProvider>
        </SessionProvider>
    );
};

export default MyApp;

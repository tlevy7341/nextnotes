import { useRouter } from "next/router";

const Custom404 = () => {
    const { push } = useRouter();
    return (
        <main className="flex items-center w-screen h-screen p-16 ">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h1 className="mb-8 font-extrabold text-9xl ">404</h1>
                    <h2 className="text-2xl font-semibold md:text-3xl">
                        Sorry, we couldn&apos;t find this page.
                    </h2>
                    <p className="mt-4 mb-8 ">
                        But dont worry, you can find plenty of other things on
                        the homepage.
                    </p>
                    <button
                        type="button"
                        onClick={() => push("/")}
                        className="btn btn-accent btn-wide">
                        Back Home
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Custom404;

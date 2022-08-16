import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: any) => {
    const { systemTheme } = useTheme();

    return (
        <>
            <ToastContainer
                toastStyle={{
                    width: "max-content",
                    background: systemTheme === "dark" ? "#161A1D" : "#fff",
                    border: "2px solid",
                    borderColor: systemTheme === "dark" ? "#0d7377" : "#2195ed",
                    color: systemTheme === "dark" ? "#fff" : "#000"
                }}
                hideProgressBar={true}
                autoClose={2000}
                position="top-center"
            />
            {children}
        </>
    );
};

export default Layout;

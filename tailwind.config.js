/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],

    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    primary: "#e667f7",
                    secondary: "#fff3b7",
                    accent: "#4da7af",
                    neutral: "#241C31",
                    "base-100": "#F9FAFB",
                    info: "#59C7F3",
                    success: "#116956",
                    warning: "#DB9D0A",
                    error: "#F03359"
                },
                dark: {
                    primary: "#e05e64",
                    secondary: "#f9fc5f",
                    accent: "#0f766e",
                    neutral: "#22263A",
                    "base-100": "#1e293b",
                    "base-content": "#d0d0d0",
                    info: "#A7C2E2",
                    success: "#1DB966",
                    warning: "#C7770F",
                    error: "#E83052"
                }
            }
        ]
    }
};

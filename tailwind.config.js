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
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=light]"
                    ],
                    primary: "#a991f7",
                    secondary: "#f6d860",
                    accent: "#2195ed",
                    neutral: "#202331",
                    "base-100": "#ffffff",
                    "accent-content": "#ffffff"
                },
                dark: {
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=dark]"
                    ],
                    primary: "#98f9eb",
                    secondary: "#3994bf",
                    accent: "#0d7377",
                    neutral: "#3d4451",
                    "base-100": "#161A1D"
                }
            }
        ]
    }
};

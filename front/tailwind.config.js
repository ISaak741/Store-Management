/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "dark-heading": "#1f2428",
            },
            boxShadow: {
                dark: "0px 2px 2px rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                quickSand: ["Quicksand", "sans-serif"],
            },
        },
    },
    plugins: [
        function ({ addUtilities, theme }) {
            addUtilities(
                {
                    ".max-width": {
                        "margin-left": "auto",
                        "margin-right": "auto",
                        "padding-left": theme("spacing.5"),
                        "padding-right": theme("spacing.5"),
                        "@screen lg": {
                            "padding-left": theme("spacing.24"),
                            "padding-right": theme("spacing.24"),
                        },
                        "@screen xl": {
                            "padding-left": theme("spacing.48"),
                            "padding-right": theme("spacing.48"),
                        },
                    },
                },
                ["responsive"]
            );
        },
    ],
};

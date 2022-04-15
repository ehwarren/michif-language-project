const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./app/**/*.{ts,tsx,jsx,js}"],
    theme: {
        extend: {
            spacing: {
                128: "32rem",
                144: "36rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            colors: {
                primary: {
                    100: "#ccd4dd",
                    200: "#99a9bb",
                    300: "#667f99",
                    400: "#335477",
                    500: "#002955",
                    600: "#002144",
                    700: "#001933",
                    800: "#001022",
                    900: "#000811",
                },
                secondary: {
                    100: "#f5f5ef",
                    200: "#ecebdf",
                    300: "#e2e0cf",
                    400: "#d9d6bf",
                    500: "#cfccaf",
                    600: "#a6a38c",
                    700: "#7c7a69",
                    800: "#535246",
                    900: "#292923",
                },
            },
            fontFamily: {
                serif: ["le-monde-livre-classic-byol", ...defaultTheme.fontFamily.serif],
                sans: ["graphie", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {},
    plugins: [],
};

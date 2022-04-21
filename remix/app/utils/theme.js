import { createTheme } from "@mui/material/styles";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigModule from "~/../tailwind.config.js";


const tailwindConfig = resolveConfig(tailwindConfigModule);

const theme = createTheme({
    palette: {
        primary: {
            light: tailwindConfig.theme.colors.primary['300'],
            main: tailwindConfig.theme.colors.primary['500'],
            dark: tailwindConfig.theme.colors.primary['700'],
        },
        secondary: {
            light: tailwindConfig.theme.colors.secondary['300'],
            main: tailwindConfig.theme.colors.secondary['500'],
            dark: tailwindConfig.theme.colors.secondary['700'],
        },
    },
});

export default theme;

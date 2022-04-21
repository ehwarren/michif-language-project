import { createTheme } from "@mui/material/styles";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigModule from "~/../tailwind.config.js";


const tailwindConfig = resolveConfig(tailwindConfigModule);

const theme = createTheme({
    palette: {
        primary: {
            main: tailwindConfig.theme.colors.primary['500'],
        },
        secondary: {
            main: tailwindConfig.theme.colors.secondary['500'],
        },
    },
});

export default theme;

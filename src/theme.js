import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
      dark: "#1F58D8",
    },
    background: {
      default: "#F1F5F9",
    },
    divider: "#c4c7d2",
  },
  typography: {
    fontFamily: "Outfit, sans-serif",
  },
});

export default theme;

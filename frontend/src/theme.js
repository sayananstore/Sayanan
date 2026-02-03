import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#C9A24D", // muted luxury gold
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1C1C1C",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1C1C1C",
      secondary: "#6E6E6E",
    },
  },

  typography: {
    fontFamily: `"Playfair Display", "Roboto", serif`,
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    button: {
      textTransform: "none",
      fontWeight: 500,
      letterSpacing: "0.5px",
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export default theme;

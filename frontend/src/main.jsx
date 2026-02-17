import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <GlobalStyles
            //   styles={{
            //     html: { overflowX: "hidden",
			// 		width: "100%",
			// 		paddingTop: 70},
            //     body: {
			// 	  overflowX: "hidden",
            //       width: "100%",
            //       margin: 0,
            //     },
            //     "#root": { width: "100%" },
            //   }}
            />
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

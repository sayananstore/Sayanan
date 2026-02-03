import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { CssBaseline, GlobalStyles } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
	<AuthProvider>
		<ThemeProvider theme={theme}>
		<CssBaseline />
		<BrowserRouter>
		    <CssBaseline />
				<GlobalStyles
				styles={{
					html: {
					width: "100%",
					},
					body: {
					width: "100%",
					margin: 0,
					padding: 0,
					},
					"#root": {
					width: "100%",
					},
				}}
				/>
				
			<App />
		</BrowserRouter>
		</ThemeProvider>
	</AuthProvider>
  </React.StrictMode>
);

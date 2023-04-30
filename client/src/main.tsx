import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B17A50",
      light: "rgba(241, 180, 115, 0.5)",
    },
    text: {
      primary: "#B17A50",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

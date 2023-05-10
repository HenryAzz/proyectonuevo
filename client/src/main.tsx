import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./reduxToolkit/apiSlice.ts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B17A50",
      light: "rgba(241, 180, 115, 0.5)",
    },
    text: {
      primary: "#995f32",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 200,
    fontWeightRegular: 500,
    fontWeightMedium: 500,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import reportWebVitals from "./reportWebVitals";
import App from "./App";

import "./index.css";

declare module "@mui/material/styles" {
  interface Palette {
    yolo: { light: string; main: string };
    yoloYellow: { main: string };
  }
  interface PaletteOptions {
    yolo: { light: string; main: string };
    yoloYellow: { main: string };
  }
}

export const theme = createTheme({
  palette: {
    yolo: {
      light: "#6bb6ff",
      main: "#0785db",
    },
    yoloYellow: {
      main: "#e5ef3f",
    },
  },
  breakpoints: {
    values: {
      xs: 430,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1440,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

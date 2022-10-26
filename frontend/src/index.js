import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { JobsContextProvider } from "./context/JobsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // ck editor won't work in a strict mode
  // <React.StrictMode>
    <JobsContextProvider>
      <App />
    </JobsContextProvider>
  // </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
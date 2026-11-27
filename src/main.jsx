
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "./App.css";

import App from "./App.jsx";
import { AuthProvider } from "./admin/context/authContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/specterra">
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

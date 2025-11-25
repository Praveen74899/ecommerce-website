
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
createRoot(document.getElementById("root")).render(
  <AuthProvider>

    <App />
    <ToastContainer
        position="top-right"
        autoClose={2000}   // ⏳ toast 2 second me close ho jayega
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="light"
          progressClassName="toast-progress-bar"
  bodyClassName="toast-body"
  toastClassName="toast-container"
      />
 
  </AuthProvider>
);

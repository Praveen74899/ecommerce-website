import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const login = (tokenValue, roleValue, adminEmail) => {
    setToken(tokenValue);
    setRole(roleValue);
    setEmail(adminEmail);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("role", roleValue);
    localStorage.setItem("email", adminEmail);
    
  };

  const logout = () => {
    setToken("");
    setRole("");
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    
  };

   useEffect(() => {
  const interval = setInterval(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (!token || !role) {
      logout(); // this will navigate to login page
    }
  }, 100); // check every 0.7 sec (fast + smooth)

  return () => clearInterval(interval);
}, []);


  return React.createElement(
    AuthContext.Provider,
    { value: { token, role, email,login, logout } },
    children
  );
};

export const useAuth = () => useContext(AuthContext);
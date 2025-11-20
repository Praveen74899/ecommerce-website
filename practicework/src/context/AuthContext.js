import React, { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const login = (tokenValue, roleValue) => {
    setToken(tokenValue);
    setRole(roleValue);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("role", roleValue);
    
  };

  const logout = () => {
    setToken("");
    setRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { token, role, login, logout } },
    children
  );
};

export const useAuth = () => useContext(AuthContext);
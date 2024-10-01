/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, setAuthToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthTokenState] = useState(
    localStorage.getItem("token") || null
  );
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const data = await login(username, password);
      const token = data.token;
      localStorage.setItem("token", token);
      setAuthTokenState(token);
      setAuthToken(token);
      navigate("/");
    } catch (error) {
      console.error("Login error", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthTokenState(null);
      setAuthToken(null);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ login: handleLogin, logout: handleLogout, authToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

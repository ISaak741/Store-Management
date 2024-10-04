/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);
  if (!authToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

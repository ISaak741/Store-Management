/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export const PublicRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);
  if (authToken) {
    return <Navigate to="/" />;
  }
  return children;
};

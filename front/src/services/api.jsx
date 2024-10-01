import axios from "axios";

const api = axios.create({
  baseURL: "",
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const login = async (username, password) => {
  const response = await api.post("/login", { username, password });
  return response.data;
};

export const logout = async () => {
  await api.post("/logout");
};

export default api;

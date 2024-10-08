import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const login = async (name, password) => {
  const response = await api.post("/login", {
    name: name,
    password: password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const add = async (name, quantity, price) => {
  const response = await api.post("/products", {
    name: name,
    quantity: quantity,
    price: price,
  });
  return response.data;
};

export const listProduct = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const updateProduct = async (id, name, price, quantity) => {
  const response = await api.put(`/products/${id}`, {
    name: name,
    price: price,
    quantity: quantity,
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export default api;

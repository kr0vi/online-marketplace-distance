// lib/api.js
import axios from "axios";
import { getToken, removeToken, setToken } from "./auth/token";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!backendUrl) {
  throw new Error(
    "NEXT_PUBLIC_BACKEND_URL is not defined in environment variables.",
  );
}

console.log("API base URL:", backendUrl);
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});

api.interceptors.request.use((config) => {
  console.log("Making API request to:", config.url);
  const token = getToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//login utility
export const login = async (email: string, password: string) => {
  const { data } = await api.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
    email,
    password,
  });
  if (data?.success && data.token) {
    setToken(data.token);
  }
  return data;
};

export const signup = async (name: string, password: string, email: string) => {
  const { data } = await api.post(`${process.env.NEXT_PUBLIC_SIGNUP_URL}`, {
    email,
    password,
    name,
  });
  if (data?.success) {
    window.location.href = "/login";
  }
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get(`${process.env.NEXT_PUBLIC_ME_ENDPOINT}`);
  return data.user;
};

export const logout = () => {
  removeToken();
};
export default api;

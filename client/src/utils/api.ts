import axios from "axios";
import { BACKEND_URL } from "./config";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || BACKEND_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
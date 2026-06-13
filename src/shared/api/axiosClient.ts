import axios, { type AxiosError, type AxiosInstance } from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ?? error.message ?? "Unexpected error";
    return Promise.reject(new Error(message));
  },
);

export default axiosClient;

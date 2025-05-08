import axios from "axios";
import { reduxStore, RootState } from "../../store/store";
import environment from "@/config/environments";
import { clearUserData } from "@/store/userSlice";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: environment.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state: RootState = reduxStore.getState();
    const token = state.user.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (error.response?.data?.message === "Unauthorized") {
        reduxStore.dispatch(clearUserData());
        localStorage.removeItem("user");

        toast.error("Sesi kamu habis. Silahkan login kembali.");
        window.location.href = "/login";
      } else {
        toast.error(error.response?.data?.message || "Terjadi kesalahan!");
      }
    }
  }
);

export default axiosInstance;

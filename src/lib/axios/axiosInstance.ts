import axios from "axios";
import { reduxStore, RootState } from "../../store/store";
import environment from "@/config/environments";
import { clearUserData } from "@/store/userSlice";
import { toast } from "sonner";

const axiosInstance = axios.create({
    baseURL: environment.API_URL,
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
        const status = error.response?.status;
        const responseData = error.response?.data;
        const genericMessage = "Terjadi kesalahan pada server.";

        if (status === 401) {
            const message = responseData?.message || "Terjadi kesalahan autentikasi!";
            if (message === "Unauthorized" || responseData?.errors?.message === "Unauthorized") {
                reduxStore.dispatch(clearUserData());
                localStorage.removeItem("user");
                toast.error("Sesi kamu habis. Silakan login kembali.");
                window.location.href = "/login";
            } else {
                toast.error(message);
            }
        } else if (status === 422) {
            // Tangani error validasi 422
            const mainMessage = responseData?.message || "Data yang diberikan tidak valid.";
            if (responseData && responseData.errors) {
                let errorMessages = "";
                for (const key in responseData.errors) {
                    if (Object.prototype.hasOwnProperty.call(responseData.errors, key)) {
                        errorMessages += `- ${responseData.errors[key].join ? responseData.errors[key].join(', ') : responseData.errors[key]}\n`;
                    }
                }
                toast.error(`${mainMessage}\n${errorMessages}`);
            } else {
                toast.error(mainMessage);
            }
        } else {
            // Untuk error lain (misalnya 500, 403, 404, dll.)
            const message = responseData?.message || genericMessage;
            toast.error(message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
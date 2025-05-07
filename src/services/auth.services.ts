import axiosInstance from "@/lib/axios/axiosInstance";
import { ILogin, ILogout } from "@/types/auth";
import endpoint from "./endpoint.constant";

const authServices = {
  login: (payload: ILogin) =>
    axiosInstance.post(`${endpoint.AUTH}/login`, payload),
  logout: (payload: ILogout) =>
    axiosInstance.post(`${endpoint.AUTH}/logout`, payload),
};

export default authServices;

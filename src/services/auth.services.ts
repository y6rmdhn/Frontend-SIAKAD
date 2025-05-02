import axiosInstance from "@/lib/axios/axiosInstance";
import { ILogin } from "@/types/auth";
import endpoint from "./endpoint.constant";

const authServices = {
  login: (payload: ILogin) =>
    axiosInstance.post(`${endpoint.AUTH}/login`, payload),
};

export default authServices;

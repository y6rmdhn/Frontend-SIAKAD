import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import { IUser } from "@/types/user";

const userServices = {
  login: (payload: IUser) => axiosInstance.post(`${endpoint.USER}/` + payload),
};

export default userServices;

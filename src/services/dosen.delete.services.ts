import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const deleteDataDosenServices = {
    deteleDataOrangtua: (id: number) =>
        axiosInstance.delete(`${endpoint.DOSEN}/orangtua/${id}`),
    deteleDataAnak: (id: number) =>
        axiosInstance.delete(`${endpoint.DOSEN}/anak/${id}`),
};

export default deleteDataDosenServices;

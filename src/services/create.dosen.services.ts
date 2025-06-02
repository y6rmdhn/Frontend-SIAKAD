import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const postDosenServices = {
    addDataAnak: (payload: FormData) =>
        axiosInstance.post(`${endpoint.DOSEN}/anak`, payload),
};

export default postDosenServices;

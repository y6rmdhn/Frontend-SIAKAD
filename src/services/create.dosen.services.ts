import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import {IOrangtuaPost} from "@/types/create.dosen.ts";

const postDosenServices = {
    addDataAnak: (payload: FormData) =>
        axiosInstance.post(`${endpoint.DOSEN}/anak`, payload),
    addDataPasangan: (payload: FormData) =>
        axiosInstance.post(`${endpoint.DOSEN}/pasangan`, payload),
    addDataOrangtua: (payload: IOrangtuaPost) =>
        axiosInstance.post(`${endpoint.DOSEN}/orangtua`, payload),
};

export default postDosenServices;

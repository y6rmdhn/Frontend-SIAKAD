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
    addDataPangkat: (payload: FormData) =>
        axiosInstance.post(`${endpoint.DOSEN}/pangkat`, payload),
    addDataJabatanAkademik: (payload: FormData) =>
        axiosInstance.post(`${endpoint.DOSEN}/jabatanakademik`, payload),
    addDataJabatanfungsional: (payload: FormData) =>
        axiosInstance.post(`${endpoint.DOSEN}/jabatanfungsional`, payload),
    addDataJabatanstruktural: (payload: FormData) =>
        axiosInstance.post(`${endpoint.DOSEN}/jabatanstruktural`, payload),
    addDataHubungankerja: (payload: FormData) =>
        axiosInstance.post(`${endpoint.DOSEN}/hubungankerja`, payload),
    addDataDiklat: (payload: FormData) =>
        axiosInstance.post(`${endpoint.DOSEN}/data-diklat`, payload),
};

export default postDosenServices;

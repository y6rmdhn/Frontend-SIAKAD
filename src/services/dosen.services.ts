import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const dosenServices = {
    //   keluarga
    getDataAnak: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/anak`, {
            params: {
                page: page,
            },
        }),
    getDataAnakDetail: (id) =>
        axiosInstance.get(`${endpoint.DOSEN}/anak/` + id),

    getDataOrangtua: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/orangtua`, {
            params: {
                page: page,
            },
        }),
    getDataOrangtuaDetail: (id) =>
        axiosInstance.get(`${endpoint.DOSEN}/orangtua/` + id),

    getDataPasangan: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/pasangan`, {
            params: {
                page: page,
            },
        }),
    getDataPasanganDetail: (id) =>
        axiosInstance.get(`${endpoint.DOSEN}/pasangan/` + id),

    // kepegawaian
    getPangkat: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/pangkat`, {
            params: {
                page: page,
            },
        }),
    getJabatanAkademik: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/jabatanakademik`, {
            params: {
                page: page,
            },
        }),
    getJabatanFungsional: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/jabatanfungsional`, {
            params: {
                page: page,
            },
        }),
    getJabatanStruktural: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/jabatanstruktural`, {
            params: {
                page: page,
            },
        }),
    getHubunganKerja: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/hubungankerja`, {
            params: {
                page: page,
            },
        }),

//     Kompetensi
};

export default dosenServices;

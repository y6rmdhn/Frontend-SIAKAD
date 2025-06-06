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
    getDataAnakWithoutParam: () =>
        axiosInstance.get(`${endpoint.DOSEN}/anak`),

    getDataAnakDetail: (id) =>
        axiosInstance.get(`${endpoint.DOSEN}/anak/` + id),

    getDataOrangtua: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/orangtua`, {
            params: {
                page: page,
            },
        }),
    getDataOrangtuaWithoutParam: () =>
        axiosInstance.get(`${endpoint.DOSEN}/orangtua`),

    getDataOrangtuaDetail: (id) =>
        axiosInstance.get(`${endpoint.DOSEN}/orangtua/` + id),

    getDataPasangan: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/pasangan`, {
            params: {
                page: page,
            },
        }),
    getDataPasanganWithoutParam: () =>
        axiosInstance.get(`${endpoint.DOSEN}/pasangan`),
    getDataPasanganDetail: (id) =>
        axiosInstance.get(`${endpoint.DOSEN}/pasangan/` + id),

    // kepegawaian
    getPangkat: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/pangkat`, {
            params: {
                page: page,
            },
        }),
    getDataPangkatWithoutParam: () =>
        axiosInstance.get(`${endpoint.DOSEN}/pangkat`),
    getDataPangkatDetail: (id) =>
        axiosInstance.get(`${endpoint.DOSEN}/pangkat/` + id),

    getJabatanAkademik: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/jabatanakademik`, {
            params: {
                page: page,
            },
        }),

    getDataJabatanakademikWithoutParam: () =>
        axiosInstance.get(`${endpoint.DOSEN}/jabatanakademik`),

    getJabatanFungsional: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/jabatanfungsional`, {
            params: {
                page: page,
            },
        }),
    getDataJabatanakfungsionalWithoutParam: () =>
        axiosInstance.get(`${endpoint.DOSEN}/jabatanfungsional`),

    getJabatanStruktural: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/jabatanstruktural`, {
            params: {
                page: page,
            },
        }),
    getDataJabatanakstrukturalWithoutParam: () =>
        axiosInstance.get(`${endpoint.DOSEN}/jabatanstruktural`),

    getHubunganKerja: (page) =>
        axiosInstance.get(`${endpoint.DOSEN}/hubungankerja`, {
            params: {
                page: page,
            },
        }),
    getDataHubunganKerjaWithoutParam: () =>
        axiosInstance.get(`${endpoint.DOSEN}/hubungankerja`),

};

export default dosenServices;

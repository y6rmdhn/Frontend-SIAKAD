import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const adminServices = {
    getStatusAktif: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/status-aktif`, {
            params: {
                page: page,
            },
        }),
    getUnitKerja: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/unit-kerja`, {
            params: {
                page: page,
            },
        }),
    getHubunganKerja: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/hubungan-kerja`, {
            params: {
                page: page,
            },
        }),
    getJabatanAkademik: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/jabatan-akademik`, {
            params: {
                page: page,
            },
        }),
    getJenisCuti: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/daftar-cuti`, {
            params: {
                page: page,
            },
        }),
    getJenisSk: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/jenis-sk`, {
            params: {
                page: page,
            },
        }),
    getJenisTes: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/jenis-test`, {
            params: {
                page: page,
            },
        }),
    getOutputPenelitian: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/output-penelitian`, {
            params: {
                page: page,
            },
        }),
    getJenisHari: () => axiosInstance.get(`${endpoint.ADMIN}/jenis-hari`),
    getBerita: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/berita`, {
            params: {
                page: page,
            },
        }),

    getDasboardAdmin: () =>
        axiosInstance.get(`${endpoint.ADMIN}/dashboard?unit_kerja_id=041001`),

    getPegawaiAdminPage: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/pegawai`, {
            params: {
                page: page,
            },
        }),
    getJabatanStrukturalReferensi: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/jabatan-struktural`, {
            params: {
                page: page,
            },
        }),
    getMasterPangkatReferensi: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/master-pangkat`, {
            params: {
                page: page,
            },
        }),
    getEselonReferensi: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/eselon`, {
            params: {
                page: page,
            },
        }),
    getJamKerjaReferensi: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/jam-kerja`, {
            params: {
                page: page,
            },
        }),
    getJenisSertifikasiReferensi: (page) =>
        axiosInstance.get(`${endpoint.ADMIN}/master-jenis-sertifikasi`, {
            params: {
                page: page,
            },
        }),

    getPegawaiDetailAdminPage: (idPegawai) =>
        axiosInstance.get(`${endpoint.ADMIN}/pegawai/` + idPegawai),

    getSuku: (idSuku: number) =>
        axiosInstance.get(`${endpoint.ADMIN}/suku/` + idSuku),
};

export default adminServices;

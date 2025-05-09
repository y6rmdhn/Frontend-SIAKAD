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

  // post
  postJenisTes: (payload) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-tes`, payload),
};

export default adminServices;

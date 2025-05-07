import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const adminServices = {
  getStatusAktif: () => axiosInstance.get(`${endpoint.ADMIN}/status-aktif`),
  getUnitKerja: () => axiosInstance.get(`${endpoint.ADMIN}/unit-kerja`),
  getHubunganKerja: () => axiosInstance.get(`${endpoint.ADMIN}/hubungan-kerja`),
  getJabatanAkademik: () =>
    axiosInstance.get(`${endpoint.ADMIN}/jabatan-akademik`),
  getJenisCuti: () => axiosInstance.get(`${endpoint.ADMIN}/daftar-cuti`),
  getJenisSk: () => axiosInstance.get(`${endpoint.ADMIN}/jenis-sk`),
  getJenisTes: () => axiosInstance.get(`${endpoint.ADMIN}/jenis-test`),
  getOutputPenelitian: () =>
    axiosInstance.get(`${endpoint.ADMIN}/output-penelitian`),
  getJenisHari: () => axiosInstance.get(`${endpoint.ADMIN}/jenis-hari`),
  getBerita: () => axiosInstance.get(`${endpoint.ADMIN}/berita`),
};

export default adminServices;

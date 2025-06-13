import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const deleteReferensiServices = {
  deteleJenisSertifikasi: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/master-jenis-sertifikasi/${id}`),
  deteleJenistest: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-test/${id}`),
  deteleOutputPenelitian: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/output-penelitian/${id}`),
  deteleJamKerja: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jam-kerja/${id}`),
  deteleJenisCuti: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/daftar-cuti/${id}`),
  deteleEselon: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/eselon/${id}`),
  deteleJenisSk: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-sk/${id}`),
  deteleMasterPangkat: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/master-pangkat/${id}`),
  deteleStatusAktif: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/status-aktif/${id}`),
  deteleJenisLuaran: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-luaran/${id}`),
  deteleJenisPengabdian: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-pkm/${id}`),
  deteleJenisPublikasi: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-publikasi/${id}`),
  deteleJenisPelanggaran: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-pelanggaran/${id}`),
  deteleJenisPenghargaan: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-penghargaan/${id}`),
};

export default deleteReferensiServices;

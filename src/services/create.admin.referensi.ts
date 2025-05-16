import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import {
  IJabatanAkademikPost, IJamKerja,
  IJenisCutiPost, IJenisSertifikasi,
  IJenisSk,
  IJenisTesPost,
  IOutputPenelitianPost, IStatusEselon,
  IStatusKeaktifan, IStatusPangkat,
} from "@/types/create.referensi";

const potsReferensiServices = {
  jenisTes: (payload: IJenisTesPost) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-test`, payload),
  outputPenelitian: (payload: IOutputPenelitianPost) =>
    axiosInstance.post(`${endpoint.ADMIN}/output-penelitian`, payload),
  jeniCuti: (payload: IJenisCutiPost) =>
    axiosInstance.post(`${endpoint.ADMIN}/daftar-cuti`, payload),
  jabatanAkademik: (payload: IJabatanAkademikPost) =>
    axiosInstance.post(`${endpoint.ADMIN}/jabatan-akademik`, payload),
  jenisSk: (payload: IJenisSk) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-sk`, payload),
  statusKeaktifan: (payload: IStatusKeaktifan) =>
    axiosInstance.post(`${endpoint.ADMIN}/status-aktif`, payload),
  pangkat: (payload: IStatusPangkat) =>
      axiosInstance.post(`${endpoint.ADMIN}/master-pangkat`, payload),
  eselon: (payload: IStatusEselon) =>
      axiosInstance.post(`${endpoint.ADMIN}/eselon`, payload),
  jamKerja: (payload: IJamKerja) =>
      axiosInstance.post(`${endpoint.ADMIN}/jam-kerja`, payload),
  jenisSertifikasi: (payload: IJenisSertifikasi) =>
      axiosInstance.post(`${endpoint.ADMIN}/master-jenis-sertifikasi`, payload),
};

export default potsReferensiServices;

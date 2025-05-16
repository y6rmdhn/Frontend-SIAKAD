import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import {
  IJamKerja,
  IJenisCutiPost, IJenisSertifikasi, IJenisSk,
  IJenisTesPost,
  IOutputPenelitianPost, IStatusEselon, IStatusKeaktifan, IStatusPangkat,
} from "@/types/create.referensi";

const putReferensiServices = {
  jenisTes: (id: number, payload: IJenisTesPost) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-test/${id}`, payload),
  outputPenelitian: (id: number, payload: IOutputPenelitianPost) =>
    axiosInstance.put(`${endpoint.ADMIN}/output-penelitian/${id}`, payload),
  jenisCuti: (id: number, payload: IJenisCutiPost) =>
    axiosInstance.put(`${endpoint.ADMIN}/daftar-cuti/${id}`, payload),
  jenisSk: (id: number, payload: IJenisSk) =>
      axiosInstance.put(`${endpoint.ADMIN}/jenis-sk/${id}`, payload),
  statusAktif: (id: number, payload: IStatusKeaktifan) =>
      axiosInstance.put(`${endpoint.ADMIN}/status-aktif/${id}`, payload),
  pangkat: (id: number, payload: IStatusPangkat) =>
      axiosInstance.put(`${endpoint.ADMIN}/master-pangkat/${id}`, payload),
  eselon: (id: number, payload: IStatusEselon) =>
      axiosInstance.put(`${endpoint.ADMIN}/eselon/${id}`, payload),
  jamKerja: (id: number, payload: IJamKerja) =>
      axiosInstance.put(`${endpoint.ADMIN}/jam-kerja/${id}`, payload),
  jenisSertifikasi: (id: number, payload: IJenisSertifikasi) =>
      axiosInstance.put(`${endpoint.ADMIN}/master-jenis-sertifikasi/${id}`, payload),
};

export default putReferensiServices;

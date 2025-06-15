import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import {
  IAgama,
  IGolonganDarah,
  IHubunganKerja,
  IJabatanAkademik,
  IJamKerja,
  IJenisCutiPost,
  IJenisHari,
  IJenisLuaran,
  IJenisPelanggaran,
  IJenisPenghargaan,
  IJenisPublikasi,
  IJenisSk,
  IJenisTesPost,
  IOutputPenelitianPost,
  IPengabdian,
  IPenghargaan,
  IStatusEselon,
  IStatusKeaktifan,
  IStatusPangkat,
  IStatusPernikahan,
  ISuku,
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
  jenisSertifikasi: (id: number, payload: IJenisLuaran) =>
    axiosInstance.put(
      `${endpoint.ADMIN}/master-jenis-sertifikasi/${id}`,
      payload
    ),
  jenisLuaran: (id: number, payload: IJenisLuaran) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-luaran/${id}`, payload),
  jenisPengabdian: (id: number, payload: IPengabdian) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-pkm/${id}`, payload),
  jenisPublikasi: (id: number, payload: IJenisPublikasi) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-publikasi/${id}`, payload),
  jenisPelanggaran: (id: number, payload: IJenisPelanggaran) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-pelanggaran/${id}`, payload),
  penghargaan: (id: number, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/datapenghargaan/${id}`, payload),
  pelanggaran: (id: number, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/datapelanggaran/${id}`, payload),
  jenisPenghargaan: (id: number, payload: IJenisPenghargaan) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-penghargaan/${id}`, payload),
  jenisHari: (id: number, payload: IJenisHari) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-hari/${id}`, payload),
  hubunganKerja: (id: number, payload: IHubunganKerja) =>
    axiosInstance.put(`${endpoint.ADMIN}/hubungan-kerja/${id}`, payload),
  jabatanAkademik: (id: number, payload: IJabatanAkademik) =>
    axiosInstance.put(`${endpoint.ADMIN}/jabatan-akademik/${id}`, payload),
  agama: (id: number, payload: IAgama) =>
    axiosInstance.put(`${endpoint.ADMIN}/agama/${id}`, payload),
  statusPernikahan: (id: number, payload: IStatusPernikahan) =>
    axiosInstance.put(`${endpoint.ADMIN}/status-pernikahan/${id}`, payload),
  sukuAll: (id: number, payload: ISuku) =>
    axiosInstance.put(`${endpoint.ADMIN}/suku/${id}`, payload),
  golonganDarah: (id: number, payload: IGolonganDarah) =>
    axiosInstance.put(`${endpoint.ADMIN}/golongan-darah/${id}`, payload),
};

export default putReferensiServices;

import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import {
  IAgama,
  IGolonganDarah,
  IHubunganKerja,
  IJamKerja,
  IJenisCutiPost,
  IJenisHari,
  IJenisKehadiran,
  IJenisLuaran,
  IJenisPelanggaran,
  IJenisPenghargaan,
  IJenisPublikasi,
  IJenisSertifikasi,
  IJenisSk,
  IJenisTesPost,
  IOutputPenelitianPost,
  IPengabdian,
  IStatusEselon,
  IStatusKeaktifan,
  IStatusPangkat,
  IStatusPernikahan,
  ISuku,
} from "@/types/create.referensi";
import { SettingKehadiranValues } from "@/components/view/admin/Operasional/Kehadiran/SettingKehadiran/SettingKehadiran";
import { InputPresensiFormValue } from "@/components/view/admin/Operasional/Kehadiran/InpuKehadiran/InputKehadiran";
import { JenjangPendidikanSchema } from "@/components/view/admin/Referensi/Pelengkap/JenjangPendidikan/JenjangPendidikan";
import { JenisKenaikanPangkatSchema } from "@/components/view/admin/Referensi/Kepegawaian/JenisKenaikanPangkat/JenisKenaikanPangkat";
import { BankSchema } from "@/components/view/admin/Referensi/Pelengkap/Bank/Bank";
import { jenisIzinFormvalue } from "@/components/view/admin/Referensi/Kehadiran/JenisIzin/JenisIzin";
import { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai";

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
  createSettingKehadiran: (payload: SettingKehadiranValues) =>
    axiosInstance.post(`${endpoint.ADMIN}/setting-kehadiran`, payload),
  updateSettingKehadiran: (payload: SettingKehadiranValues) =>
    axiosInstance.put(`${endpoint.ADMIN}/setting-kehadiran`, payload),
  jamKerja: (id: number, payload: IJamKerja) =>
    axiosInstance.put(`${endpoint.ADMIN}/jam-kerja/${id}`, payload),
  jenisSertifikasi: (id: number, payload: IJenisSertifikasi) =>
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
  jabatanAkademik: (
    id: number,
    payload: {
      id?: number | undefined;
      jabatan_akademik: string;
      kode: string;
      role_id: string;
    }
  ) => axiosInstance.put(`${endpoint.ADMIN}/jabatan-akademik/${id}`, payload),
  agama: (id: number, payload: IAgama) =>
    axiosInstance.put(`${endpoint.ADMIN}/agama/${id}`, payload),
  statusPernikahan: (id: number, payload: IStatusPernikahan) =>
    axiosInstance.put(`${endpoint.ADMIN}/status-pernikahan/${id}`, payload),
  sukuAll: (id: number, payload: ISuku) =>
    axiosInstance.put(`${endpoint.ADMIN}/suku/${id}`, payload),
  golonganDarah: (id: number, payload: IGolonganDarah) =>
    axiosInstance.put(`${endpoint.ADMIN}/golongan-darah/${id}`, payload),
  jenisKehadiran: (id: number, payload: IJenisKehadiran) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-kehadiran/${id}`, payload),
  inputPresensi: (id: number, payload: InputPresensiFormValue) =>
    axiosInstance.put(`${endpoint.ADMIN}/input-presensi/${id}`, payload),
  jenjangPendidikan: (id: number, payload: JenjangPendidikanSchema) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenjang-pendidikan/${id}`, payload),
  jenisKenaikanPangkat: (id: number, payload: JenisKenaikanPangkatSchema) =>
    axiosInstance.put(
      `${endpoint.ADMIN}/jenis-kenaikan-pangkat/${id}`,
      payload
    ),
  bank: (id: number, payload: BankSchema) =>
    axiosInstance.put(`${endpoint.ADMIN}/bank/${id}`, payload),
  jenisIzin: (id: number, payload: jenisIzinFormvalue) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-izin/${id}`, payload),
  pegawai: (id: number, payload: DataPegawaiSchema) =>
    axiosInstance.put(`${endpoint.ADMIN}/pegawai/${id}`, payload),
  jabatanStruktural: (id: number, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/jabatan-struktural/${id}`, payload),
  unitKerja: (id: number, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/unit-kerja/${id}`, payload),
  berita: (id: number, payload: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/berita/${id}`, payload),
  jabatanFungsional: (id: number, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/jabatan-fungsional/${id}`, payload),
  rumpunBidangIlmu: (id: number, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/rumpun-bidang-ilmu/${id}`, payload),
};

export default putReferensiServices;

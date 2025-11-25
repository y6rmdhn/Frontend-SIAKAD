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
  jenisTes: (id: string, payload: IJenisTesPost) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-test/${id}`, payload),
  outputPenelitian: (id: string, payload: IOutputPenelitianPost) =>
    axiosInstance.put(`${endpoint.ADMIN}/output-penelitian/${id}`, payload),
  jenisCuti: (id: string, payload: IJenisCutiPost) =>
    axiosInstance.put(`${endpoint.ADMIN}/daftar-cuti/${id}`, payload),
  jenisSk: (id: string, payload: IJenisSk) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-sk/${id}`, payload),
  statusAktif: (id: string, payload: IStatusKeaktifan) =>
    axiosInstance.put(`${endpoint.ADMIN}/status-aktif/${id}`, payload),
  pangkat: (id: string, payload: IStatusPangkat) =>
    axiosInstance.put(`${endpoint.ADMIN}/master-pangkat/${id}`, payload),
  eselon: (id: string, payload: IStatusEselon) =>
    axiosInstance.put(`${endpoint.ADMIN}/eselon/${id}`, payload),
  putSettingKehadiran: (payload: SettingKehadiranValues, id: string) =>
    axiosInstance.post(`${endpoint.ADMIN}/setting-kehadiran/${id}`, payload),
  createSettingKehadiran: (payload: SettingKehadiranValues) =>
    axiosInstance.post(`${endpoint.ADMIN}/setting-kehadiran`, payload),
  updateSettingKehadiran: (payload: SettingKehadiranValues) =>
    axiosInstance.put(`${endpoint.ADMIN}/setting-kehadiran`, payload),
  jamKerja: (id: string, payload: IJamKerja) =>
    axiosInstance.put(`${endpoint.ADMIN}/jam-kerja/${id}`, payload),
  jenisSertifikasi: (id: string, payload: IJenisSertifikasi) =>
    axiosInstance.put(
      `${endpoint.ADMIN}/master-jenis-sertifikasi/${id}`,
      payload
    ),
  jenisLuaran: (id: string, payload: IJenisLuaran) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-luaran/${id}`, payload),
  jenisPengabdian: (id: string, payload: IPengabdian) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-pkm/${id}`, payload),
  jenisPublikasi: (id: string, payload: IJenisPublikasi) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-publikasi/${id}`, payload),
  jenisPelanggaran: (id: string, payload: IJenisPelanggaran) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-pelanggaran/${id}`, payload),
  penghargaan: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/datapenghargaan/${id}`, payload),
  pelanggaran: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/datapelanggaran/${id}`, payload),
  jenisPenghargaan: (id: string, payload: IJenisPenghargaan) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-penghargaan/${id}`, payload),
  jenisHari: (id: string, payload: IJenisHari) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-hari/${id}`, payload),
  hubunganKerja: (id: string, payload: IHubunganKerja) =>
    axiosInstance.put(`${endpoint.ADMIN}/hubungan-kerja/${id}`, payload),
  jabatanAkademik: (
    id: string,
    payload: {
      id?: string | undefined;
      jabatan_akademik: string;
      kode: string;
      role_id: string;
    }
  ) => axiosInstance.put(`${endpoint.ADMIN}/jabatan-akademik/${id}`, payload),
  agama: (id: string, payload: IAgama) =>
    axiosInstance.put(`${endpoint.ADMIN}/agama/${id}`, payload),
  statusPernikahan: (id: string, payload: IStatusPernikahan) =>
    axiosInstance.put(`${endpoint.ADMIN}/status-pernikahan/${id}`, payload),
  sukuAll: (id: string, payload: ISuku) =>
    axiosInstance.put(`${endpoint.ADMIN}/suku/${id}`, payload),
  golonganDarah: (id: string, payload: IGolonganDarah) =>
    axiosInstance.put(`${endpoint.ADMIN}/golongan-darah/${id}`, payload),
  jenisKehadiran: (id: string, payload: IJenisKehadiran) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-kehadiran/${id}`, payload),
  inputPresensi: (id: string, payload: InputPresensiFormValue) =>
    axiosInstance.put(`${endpoint.ADMIN}/input-presensi/${id}`, payload),
  jenjangPendidikan: (id: string, payload: JenjangPendidikanSchema) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenjang-pendidikan/${id}`, payload),
  jenisKenaikanPangkat: (id: string, payload: JenisKenaikanPangkatSchema) =>
    axiosInstance.put(
      `${endpoint.ADMIN}/jenis-kenaikan-pangkat/${id}`,
      payload
    ),
  bank: (id: string, payload: BankSchema) =>
    axiosInstance.put(`${endpoint.ADMIN}/bank/${id}`, payload),
  jenisIzin: (id: string, payload: jenisIzinFormvalue) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-izin/${id}`, payload),
  pegawai: (id: string, payload: DataPegawaiSchema) =>
    axiosInstance.put(`${endpoint.ADMIN}/pegawai/${id}`, payload),
  jabatanStruktural: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/jabatan-struktural/${id}`, payload),
  unitKerja: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/unit-kerja/${id}`, payload),
  berita: (id: string, payload: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/berita/${id}`, payload),
  jabatanFungsional: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/jabatan-fungsional/${id}`, payload),
  rumpunBidangIlmu: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/rumpun-bidang-ilmu/${id}`, payload),
  putGelarAkademik: (id: string, data: any) => {
    return axiosInstance.put(`${endpoint.ADMIN}/gelar-akademik/${id}`, data);
  },
  potongGaji: (id: string, data: any) => {
    return axiosInstance.put(
      `${endpoint.ADMIN}/master-potongan-wajib/${id}`,
      data
    );
  },
};

export default putReferensiServices;

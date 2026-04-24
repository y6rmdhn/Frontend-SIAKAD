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
  // ── MASTER DATA (new backend: /master/*) ──────────────────
  wilayahNegara: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.MASTER}/wilayah-negara/${id}`, payload),
  provinsi: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.MASTER}/wilayah-provinsi/${id}`, payload),
  kota: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.MASTER}/wilayah-kota/${id}`, payload),
  kecamatan: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.MASTER}/wilayah-kecamatan/${id}`, payload),
  jenisTes: (id: string, payload: IJenisTesPost) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-test/${id}`, payload),
  outputPenelitian: (id: string, payload: IOutputPenelitianPost) =>
    axiosInstance.put(`${endpoint.MASTER}/output-penelitian/${id}`, payload),
  jenisCuti: (id: string, payload: IJenisCutiPost) =>
    axiosInstance.put(`${endpoint.MASTER}/cuti/${id}`, payload),
  jenisSk: (id: string, payload: IJenisSk) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-sk/${id}`, payload),
  statusAktif: (id: string, payload: IStatusKeaktifan) =>
    axiosInstance.put(`${endpoint.MASTER}/status-aktif/${id}`, payload),
  pangkat: (id: string, payload: IStatusPangkat) =>
    axiosInstance.put(`${endpoint.MASTER}/pangkat/${id}`, payload),
  jenisSertifikasi: (id: string, payload: IJenisSertifikasi) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-sertifikasi/${id}`, payload),
  jenisLuaran: (id: string, payload: IJenisLuaran) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-luaran/${id}`, payload),
  jenisPengabdian: (id: string, payload: IPengabdian) =>
    axiosInstance.put(`${endpoint.ADMIN}/jenis-pkm/${id}`, payload), // belum ada di master
  jenisPublikasi: (id: string, payload: IJenisPublikasi) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-publikasi/${id}`, payload),
  jenisPelanggaran: (id: string, payload: IJenisPelanggaran) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-pelanggaran/${id}`, payload),
  jenisPenghargaan: (id: string, payload: IJenisPenghargaan) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-penghargaan/${id}`, payload),
  jenisHari: (id: string, payload: IJenisHari) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-hari/${id}`, payload),
  hubunganKerja: (id: string, payload: IHubunganKerja) =>
    axiosInstance.put(`${endpoint.MASTER}/hubungan-kerja/${id}`, payload),
  agama: (id: string, payload: IAgama) =>
    axiosInstance.put(`${endpoint.MASTER}/agama/${id}`, payload),
  statusPernikahan: (id: string, payload: IStatusPernikahan) =>
    axiosInstance.put(`${endpoint.MASTER}/status-pernikahan/${id}`, payload),
  sukuAll: (id: string, payload: ISuku) =>
    axiosInstance.put(`${endpoint.MASTER}/suku/${id}`, payload),
  golonganDarah: (id: string, payload: IGolonganDarah) =>
    axiosInstance.put(`${endpoint.MASTER}/golongan-darah/${id}`, payload),
  jenisKehadiran: (id: string, payload: IJenisKehadiran) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-kehadiran/${id}`, payload),
  jenjangPendidikan: (id: string, payload: JenjangPendidikanSchema) =>
    axiosInstance.put(`${endpoint.MASTER}/jenjang-pendidikan/${id}`, payload),
  jenisKenaikanPangkat: (id: string, payload: JenisKenaikanPangkatSchema) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-kenaikan-pangkat/${id}`, payload),
  bank: (id: string, payload: BankSchema) =>
    axiosInstance.put(`${endpoint.MASTER}/bank/${id}`, payload),
  jenisIzin: (id: string, payload: jenisIzinFormvalue) =>
    axiosInstance.put(`${endpoint.MASTER}/jenis-izin/${id}`, payload),
  jabatanStruktural: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.MASTER}/jabatan-struktural/${id}`, payload),
  unitKerja: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.MASTER}/unit-kerja/${id}`, payload),
  jabatanFungsional: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.MASTER}/jabatan-fungsional/${id}`, payload),
  rumpunBidangIlmu: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.MASTER}/rumpun-bidang-ilmu/${id}`, payload),
  putGelarAkademik: (id: string, data: any) =>
    axiosInstance.put(`${endpoint.MASTER}/gelar-pendidikan/${id}`, data),

  // ── TETAP DI ADMIN (belum ada di master data baru) ────────
  jabatanAkademik: (
    id: string,
    payload: {
      id?: string | undefined;
      jabatan_akademik: string;
      kode: string;
      role_id: string;
    }
  ) => axiosInstance.put(`${endpoint.ADMIN}/jabatan-akademik/${id}`, payload),
  eselon: (id: string, payload: IStatusEselon) =>
    axiosInstance.put(`${endpoint.ADMIN}/eselon/${id}`, payload),
  jamKerja: (id: string, payload: IJamKerja) =>
    axiosInstance.put(`${endpoint.ADMIN}/jam-kerja/${id}`, payload),

  // ── NON-MASTER (operasional) ──────────────────────────────
  putSettingKehadiran: (payload: SettingKehadiranValues, id: string) =>
    axiosInstance.put(`${endpoint.ABSENSI}/setting-presensi/${id}`, payload),
  createSettingKehadiran: (payload: SettingKehadiranValues) =>
    axiosInstance.post(`${endpoint.ABSENSI}/setting-presensi`, payload),
  updateSettingKehadiran: (payload: SettingKehadiranValues) =>
    axiosInstance.put(`${endpoint.ABSENSI}/setting-presensi`, payload),
  penghargaan: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/datapenghargaan/${id}`, payload),
  pelanggaran: (id: string, payload: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/datapelanggaran/${id}`, payload),
  inputPresensi: (id: string, payload: InputPresensiFormValue) =>
    axiosInstance.put(`${endpoint.ADMIN}/input-presensi/${id}`, payload),
  pegawai: (id: string, payload: DataPegawaiSchema) =>
    axiosInstance.put(`${endpoint.ADMIN}/pegawai/${id}`, payload),
  berita: (id: string, payload: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/berita/${id}`, payload),
  potongGaji: (id: string, data: any) =>
    axiosInstance.put(`${endpoint.ADMIN}/master-potongan-wajib/${id}`, data),
};

export default putReferensiServices;

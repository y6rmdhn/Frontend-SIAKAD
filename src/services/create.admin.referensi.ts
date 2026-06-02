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
  ISuku,
  UnitKerja,
} from "@/types/create.referensi";
import { InputPresensiFormValue } from "@/components/view/admin/Operasional/Kehadiran/InpuKehadiran/InputKehadiran";
import { JenjangPendidikanSchema } from "@/components/view/admin/Referensi/Pelengkap/JenjangPendidikan/JenjangPendidikan";
import { JenisKenaikanPangkatSchema } from "@/components/view/admin/Referensi/Kepegawaian/JenisKenaikanPangkat/JenisKenaikanPangkat";
import { BankSchema } from "@/components/view/admin/Referensi/Pelengkap/Bank/Bank";
import { jenisIzinFormvalue } from "@/components/view/admin/Referensi/Kehadiran/JenisIzin/JenisIzin";

const potsReferensiServices = {
  // ── MASTER DATA (new backend: /master/*) ──────────────────
  wilayahNegara: (payload: any) =>
    axiosInstance.post(`${endpoint.MASTER}/wilayah-negara`, payload),
  provinsi: (payload: any) =>
    axiosInstance.post(`${endpoint.MASTER}/wilayah-provinsi`, payload),
  kota: (payload: any) =>
    axiosInstance.post(`${endpoint.MASTER}/wilayah-kota`, payload),
  kecamatan: (payload: any) =>
    axiosInstance.post(`${endpoint.MASTER}/wilayah-kecamatan`, payload),
  jenisTes: (payload: IJenisTesPost) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-test`, payload),
  outputPenelitian: (payload: IOutputPenelitianPost) =>
    axiosInstance.post(`${endpoint.MASTER}/output-penelitian`, payload),
  jeniCuti: (payload: IJenisCutiPost) =>
    axiosInstance.post(`${endpoint.MASTER}/cuti`, payload),
  jenisSk: (payload: IJenisSk) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-sk`, payload),
  statusKeaktifan: (payload: IStatusKeaktifan) =>
    axiosInstance.post(`${endpoint.MASTER}/status-aktif`, payload),
  pangkat: (payload: IStatusPangkat) =>
    axiosInstance.post(`${endpoint.MASTER}/pangkat`, payload),
  jenisSertifikasi: (payload: IJenisSertifikasi) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-sertifikasi`, payload),
  jenisLuaran: (payload: IJenisLuaran) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-luaran`, payload),
  jenisPublikasi: (payload: IJenisPublikasi) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-publikasi`, payload),
  jenisPelanggaran: (payload: IJenisPelanggaran) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-pelanggaran`, payload),
  jenisPenghargaan: (payload: IJenisPenghargaan) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-penghargaan`, payload),
  unitKerja: (payload: UnitKerja) =>
    axiosInstance.post(`${endpoint.MASTER}/unit-kerja`, payload),
  jenisHari: (payload: IJenisHari) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-hari`, payload),
  hubunganKerja: (payload: IHubunganKerja) =>
    axiosInstance.post(`${endpoint.MASTER}/hubungan-kerja`, payload),
  agama: (payload: IAgama) =>
    axiosInstance.post(`${endpoint.MASTER}/agama`, payload),
  suku: (payload: ISuku) =>
    axiosInstance.post(`${endpoint.MASTER}/suku`, payload),
  golonganDarah: (payload: IGolonganDarah) =>
    axiosInstance.post(`${endpoint.MASTER}/golongan-darah`, payload),
  jenisKehadiran: (payload: IJenisKehadiran) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-kehadiran`, payload),
  jenjangPendidikan: (payload: JenjangPendidikanSchema) =>
    axiosInstance.post(`${endpoint.MASTER}/jenjang-pendidikan`, payload),
  jenisKenaikanPangkat: (payload: JenisKenaikanPangkatSchema) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-kenaikan-pangkat`, payload),
  bank: (payload: BankSchema) =>
    axiosInstance.post(`${endpoint.MASTER}/bank`, payload),
  jenisIzin: (payload: jenisIzinFormvalue) =>
    axiosInstance.post(`${endpoint.MASTER}/jenis-izin`, payload),
  jabatanStruktural: (payload: any) =>
    axiosInstance.post(`${endpoint.MASTER}/jabatan-struktural`, payload),
  jabatanFungsional: (payload: any) =>
    axiosInstance.post(`${endpoint.MASTER}/jabatan-fungsional`, payload),
  rumpunBidangIlmu: (payload: any) =>
    axiosInstance.post(`${endpoint.MASTER}/rumpun-bidang-ilmu`, payload),
  postGelarAkademik: (data: any) =>
    axiosInstance.post(`${endpoint.MASTER}/gelar-pendidikan`, data),

  // ── TETAP DI ADMIN (tidak ada di master data baru) ────────
  jabatanAkademik: (payload: IJabatanAkademik) =>
    axiosInstance.post(`${endpoint.ADMIN}/jabatan-akademik`, payload),
  eselon: (payload: IStatusEselon) =>
    axiosInstance.post(`${endpoint.ADMIN}/eselon`, payload),
  jamKerja: (payload: IJamKerja) =>
    axiosInstance.post(`${endpoint.ADMIN}/jam-kerja`, payload),
  // Pengabdian/pkm belum ada di master
  jenisPengabdian: (payload: IPengabdian) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-pkm`, payload),

  // ── NON-MASTER (operasional, tetap pakai ADMIN) ───────────
  penghargaan: (payload: FormData) =>
    axiosInstance.post(`${endpoint.ADMIN}/datapenghargaan`, payload),
  pelanggaran: (payload: FormData) =>
    axiosInstance.post(`${endpoint.ADMIN}/datapelanggaran`, payload),
  beritaOperasional: (payload: FormData) =>
    axiosInstance.post(`${endpoint.ADMIN}/berita`, payload),
  inputPresensi: (payload: InputPresensiFormValue) =>
    axiosInstance.post(`${endpoint.ADMIN}/input-presensi`, payload),
  updateProfileAdmin: (payload: FormData) =>
    axiosInstance.post(`${endpoint.ADMIN}/profiles/update`, payload),
  changePasswordAdmin: (payload: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/profiles/change-password`, payload),
  generatePayroll: (payload: any) =>
    axiosInstance.post(`${endpoint.GAJI}/gaji/generate`, payload),
  komponenGaji: (data: any) =>
    axiosInstance.post(`${endpoint.MASTER}/komponen-gaji`, data),
  potongGaji: (data: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/master-potongan-wajib`, data),
  payrollGenerate: (data: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/payroll/generate`, data),
  printSlipGaji: (slipIds: any, format: any) => {
    const requestBody = { slip_ids: slipIds };
    const config = { params: { format: format }, responseType: "blob" };
    // @ts-ignore
    return axiosInstance.post(`${endpoint.ADMIN}/payroll/print-selected`, requestBody, config);
  },
};

export default potsReferensiServices;

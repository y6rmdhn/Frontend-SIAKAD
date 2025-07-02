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
  jenisTes: (payload: IJenisTesPost) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-test`, payload),
  outputPenelitian: (payload: IOutputPenelitianPost) =>
    axiosInstance.post(`${endpoint.ADMIN}/output-penelitian`, payload),
  jeniCuti: (payload: IJenisCutiPost) =>
    axiosInstance.post(`${endpoint.ADMIN}/daftar-cuti`, payload),
  jabatanAkademik: (payload: IJabatanAkademik) =>
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
  jenisLuaran: (payload: IJenisLuaran) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-luaran`, payload),
  jenisPengabdian: (payload: IPengabdian) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-pkm`, payload),
  jenisPublikasi: (payload: IJenisPublikasi) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-publikasi`, payload),
  jenisPelanggaran: (payload: IJenisPelanggaran) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-pelanggaran`, payload),
  penghargaan: (payload: FormData) =>
    axiosInstance.post(`${endpoint.ADMIN}/datapenghargaan`, payload),
  pelanggaran: (payload: FormData) =>
    axiosInstance.post(`${endpoint.ADMIN}/datapelanggaran`, payload),
  jenisPenghargaan: (payload: IJenisPenghargaan) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-penghargaan`, payload),
  unitKerja: (payload: UnitKerja) =>
    axiosInstance.post(`${endpoint.ADMIN}/unit-kerja`, payload),
  jenisHari: (payload: IJenisHari) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-hari`, payload),
  hubunganKerja: (payload: IHubunganKerja) =>
    axiosInstance.post(`${endpoint.ADMIN}/hubungan-kerja`, payload),
  agama: (payload: IAgama) =>
    axiosInstance.post(`${endpoint.ADMIN}/agama`, payload),
  suku: (payload: ISuku) =>
    axiosInstance.post(`${endpoint.ADMIN}/suku`, payload),
  golonganDarah: (payload: IGolonganDarah) =>
    axiosInstance.post(`${endpoint.ADMIN}/golongan-darah`, payload),
  beritaOperasional: (payload: FormData) =>
    axiosInstance.post(`${endpoint.ADMIN}/berita`, payload),
  jenisKehadiran: (payload: IJenisKehadiran) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-kehadiran`, payload),
  inputPresensi: (payload: InputPresensiFormValue) =>
    axiosInstance.post(`${endpoint.ADMIN}/input-presensi`, payload),
  jenjangPendidikan: (payload: JenjangPendidikanSchema) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenjang-pendidikan`, payload),
  jenisKenaikanPangkat: (payload: JenisKenaikanPangkatSchema) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-kenaikan-pangkat`, payload),
  bank: (payload: BankSchema) =>
    axiosInstance.post(`${endpoint.ADMIN}/bank`, payload),
  jenisIzin: (payload: jenisIzinFormvalue) =>
    axiosInstance.post(`${endpoint.ADMIN}/jenis-izin`, payload),
  jabatanStruktural: (payload: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/jabatan-struktural`, payload),
  jabatanFungsional: (payload: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/jabatan-fungsional`, payload),
  rumpunBidangIlmu: (payload: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/rumpun-bidang-ilmu`, payload),
  updateProfileAdmin: (payload: FormData) =>
    axiosInstance.post(`${endpoint.ADMIN}/profiles/update`, payload),
  changePasswordAdmin: (payload: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/profiles/change-password`, payload),
  generatePayroll: (payload: any) =>
    axiosInstance.post(`${endpoint.ADMIN}/payroll/generate`, payload),
};

export default potsReferensiServices;

import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import { IOrangtuaPost } from "@/types/create.dosen.ts";
import { EvaluasiKerjaFormValues } from "@/components/view/Operasional/EvaluasiKerja/DetailEvaluasiKerja/DetailEvaluasiKerja";
import { EvaluasiKerjaPegawaiFormValues } from "@/components/view/Operasional/EvaluasiKerja/DetailEvaluasiKerjaPegawai/DetailEvaluasiKerjaPegawai";

const postDosenServices = {
  addDataAnak: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/anak`, payload),
  addDataPasangan: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/pasangan`, payload),
  addDataOrangtua: (payload: IOrangtuaPost) =>
    axiosInstance.post(`${endpoint.DOSEN}/orangtua`, payload),
  addDataKeluarga: (payload: FormData) =>
    axiosInstance.post(`${endpoint.VALIDASI}/data-keluarga`, payload),
  addDataPangkat: (payload: FormData) =>
    axiosInstance.post(`${endpoint.VALIDASI}/data-pangkat`, payload),
  addDataJabatanAkademik: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/jabatanakademik`, payload),
  addDataJabatanfungsional: (payload: FormData) =>
    axiosInstance.post(`${endpoint.VALIDASI}/data-jabatan-fungsional`, payload),
  addDataJabatanstruktural: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/jabatanstruktural`, payload),
  addDataHubungankerja: (payload: FormData) =>
    axiosInstance.post(`${endpoint.VALIDASI}/data-hubungan-kerja`, payload),
  addDataDiklat: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/data-diklat`, payload),
  addDataKemampuanbahasa: (params?: FormData) =>
    axiosInstance.post(`${endpoint.VALIDASI}/data-kemampuan-bahasa`, params),
  addDataOrganisasi: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/dataorganisasi`, payload),
  addDataAbsensiMasuk: (payload: FormData) =>
    axiosInstance.post(`${endpoint.ABSENSI}/presensi/masuk`, payload),
  addDataAbsensiKeluar: (payload: FormData) =>
    axiosInstance.patch(`${endpoint.ABSENSI}/presensi/keluar`, payload),
  addDataAdminPegawai: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/admin/pegawai`, payload),
  addDataPengajuanIzin: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/pengajuan-izin-dosen`, payload),
  addDataPengajuanCuti: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/pengajuan-cuti-dosen`, payload),
  addDataPendidikanFormal: (payload: FormData) =>
    axiosInstance.post(`${endpoint.VALIDASI}/data-pendidikan-formal`, payload),
  addDataRiwayatPekerjaan: (params?: FormData) =>
    axiosInstance.post(
      `${endpoint.VALIDASI}/data-riwayat-pekerjaan`,
      params
    ),
  addDataSertifikasi: (payload: any) =>
    axiosInstance.post(`${endpoint.VALIDASI}/data-sertifikasi`, payload),
  addDataTes: (payload: FormData) =>
    axiosInstance.post(`${endpoint.VALIDASI}/data-test`, payload),
  addDataPenghargaan: (params?: FormData) =>
    axiosInstance.post(`${endpoint.VALIDASI}/data-penghargaan`, params),
  updateProfileUser: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/profiles/update`, payload),
  changePasswordUser: (payload: any) =>
    axiosInstance.post(`${endpoint.DOSEN}/profiles/change-password`, payload),
  postEvaluasiKinerja: (
    data: EvaluasiKerjaFormValues | EvaluasiKerjaPegawaiFormValues
  ) => {
    return axiosInstance.post(`${endpoint.DOSEN}/evaluasi-kinerja`, data);
  },
};

export default postDosenServices;

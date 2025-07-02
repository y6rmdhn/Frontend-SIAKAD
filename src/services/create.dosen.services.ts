import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import { IOrangtuaPost } from "@/types/create.dosen.ts";

const postDosenServices = {
  addDataAnak: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/anak`, payload),
  addDataPasangan: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/pasangan`, payload),
  addDataOrangtua: (payload: IOrangtuaPost) =>
    axiosInstance.post(`${endpoint.DOSEN}/orangtua`, payload),
  addDataPangkat: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/pangkat`, payload),
  addDataJabatanAkademik: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/jabatanakademik`, payload),
  addDataJabatanfungsional: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/jabatanfungsional`, payload),
  addDataJabatanstruktural: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/jabatanstruktural`, payload),
  addDataHubungankerja: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/hubungankerja`, payload),
  addDataDiklat: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/data-diklat`, payload),
  addDataKemampuanbahasa: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/datakemampuanbahasa`, payload),
  addDataOrganisasi: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/dataorganisasi`, payload),
  addDataAbsensiMasuk: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/absensi/masuk`, payload),
  addDataAbsensiKeluar: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/absensi/keluar`, payload),
  addDataAdminPegawai: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/admin/pegawai`, payload),
  addDataPengajuanIzin: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/pengajuan-izin-dosen`, payload),
  addDataPengajuanCuti: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/pengajuan-cuti-dosen`, payload),
  addDataPendidikanFormal: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/pendidikanformaldosen`, payload),
  addDataRiwayatPekerjaan: (payload: FormData) =>
    axiosInstance.post(
      `${endpoint.DOSEN}/data-riwayat-pekerjaan-dosen`,
      payload
    ),
  addDataSertifikasi: (payload: any) =>
    axiosInstance.post(`${endpoint.DOSEN}/datasertifikasidosen`, payload),
  addDataTes: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/datariwayattes`, payload),
  addDataPenghargaan: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/penghargaandosen`, payload),
  updateProfileUser: (payload: FormData) =>
    axiosInstance.post(`${endpoint.DOSEN}/profiles/update`, payload),
  changePasswordUser: (payload: any) =>
    axiosInstance.post(`${endpoint.DOSEN}/profiles/change-password`, payload),
};

export default postDosenServices;

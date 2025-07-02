import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const deleteReferensiServices = {
  deteleJenisSertifikasi: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/master-jenis-sertifikasi/${id}`),
  deteleJenistest: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-test/${id}`),
  deteleOutputPenelitian: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/output-penelitian/${id}`),
  deteleJamKerja: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jam-kerja/${id}`),
  deteleJenisCuti: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/daftar-cuti/${id}`),
  deteleEselon: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/eselon/${id}`),
  deteleJenisSk: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-sk/${id}`),
  deteleMasterPangkat: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/master-pangkat/${id}`),
  deteleStatusAktif: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/status-aktif/${id}`),
  deteleJenisLuaran: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-luaran/${id}`),
  deteleJenisPengabdian: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-pkm/${id}`),
  deteleJenisPublikasi: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-publikasi/${id}`),
  deteleJenisPelanggaran: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-pelanggaran/${id}`),
  deteleJenisPenghargaan: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-penghargaan/${id}`),
  deteleUnitKerja: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/unit-kerja/${id}`),
  deteleJenisHari: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-hari/${id}`),
  deteleHubunganKerja: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/hubungan-kerja/${id}`),
  deteleJabatanAkademik: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jabatan-akademik/${id}`),
  deteleDataAgama: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/agama/${id}`),
  deteleDataSuku: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/suku/${id}`),
  deteleDataGolonganDarah: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/golongan-darah/${id}`),
  deteleDataBerita: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/berita/${id}`),
  deteleDataJenisKehadiran: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-kehadiran/${id}`),
  deteleDataInputPresensi: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/input-presensi/${id}`),
  deteleDataPenghargaan: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/datapenghargaan/${id}`),
  deteleDataPelanggaran: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/datapelanggaran/${id}`),
  jenjangPendidikan: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenjang-pendidikan/${id}`),
  deleteJenisKenaikanPangkat: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-kenaikan-pangkat/${id}`),
  deleteBank: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/bank/${id}`),
  deleteJenisIzin: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-izin/${id}`),
  deletePegawai: (payload: number[]) =>
    axiosInstance.post(`${endpoint.ADMIN}/pegawai/destroy`, payload),
  deleteJabatanStruktural: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jabatan-struktural/${id}`),
  deleteJabatanFungsional: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jabatan-fungsional/${id}`),
  deleteRumpunBidangIlmu: (id: number) =>
    axiosInstance.delete(`${endpoint.ADMIN}/rumpun-bidang-ilmu/${id}`),
};

export default deleteReferensiServices;

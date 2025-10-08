import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const deleteReferensiServices = {
  deteleJenisSertifikasi: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/master-jenis-sertifikasi/${id}`),
  deteleJenistest: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-test/${id}`),
  deteleOutputPenelitian: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/output-penelitian/${id}`),
  deteleJamKerja: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jam-kerja/${id}`),
  deteleJenisCuti: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/daftar-cuti/${id}`),
  deteleEselon: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/eselon/${id}`),
  deteleJenisSk: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-sk/${id}`),
  deteleMasterPangkat: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/master-pangkat/${id}`),
  deteleStatusAktif: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/status-aktif/${id}`),
  deteleJenisLuaran: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-luaran/${id}`),
  deteleJenisPengabdian: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-pkm/${id}`),
  deteleJenisPublikasi: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-publikasi/${id}`),
  deteleJenisPelanggaran: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-pelanggaran/${id}`),
  deteleJenisPenghargaan: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-penghargaan/${id}`),
  deteleUnitKerja: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/unit-kerja/${id}`),
  deteleJenisHari: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-hari/${id}`),
  deteleHubunganKerja: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/hubungan-kerja/${id}`),
  deteleJabatanAkademik: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jabatan-akademik/${id}`),
  deteleDataAgama: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/agama/${id}`),
  deteleDataSuku: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/suku/${id}`),
  deteleDataGolonganDarah: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/golongan-darah/${id}`),
  deteleDataBerita: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/berita/${id}`),
  deteleDataJenisKehadiran: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-kehadiran/${id}`),
  deteleDataInputPresensi: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/input-presensi/${id}`),
  deteleDataPenghargaan: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/datapenghargaan/${id}`),
  deteleDataPelanggaran: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/datapelanggaran/${id}`),
  jenjangPendidikan: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenjang-pendidikan/${id}`),
  deleteJenisKenaikanPangkat: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-kenaikan-pangkat/${id}`),
  deleteBank: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/bank/${id}`),
  deleteJenisIzin: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-izin/${id}`),
  deletePegawai: (payload: string[]) =>
    axiosInstance.post(`${endpoint.ADMIN}/pegawai/destroy`, {
      pegawai_ids: payload,
    }),
  deleteJabatanStruktural: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jabatan-struktural/${id}`),
  deleteJabatanFungsional: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jabatan-fungsional/${id}`),
  deleteRumpunBidangIlmu: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/rumpun-bidang-ilmu/${id}`),
  deleteGelarAkademik: (id: string) => {
    return axiosInstance.delete(`${endpoint.ADMIN}/gelar-akademik/${id}`);
  },
};

export default deleteReferensiServices;

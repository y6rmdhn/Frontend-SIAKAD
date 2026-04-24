import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const deleteReferensiServices = {
  // ── MASTER DATA (new backend: /master/*) ──────────────────
  deleteWilayahNegara: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/wilayah-negara/${id}`),
  deleteProvinsi: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/wilayah-provinsi/${id}`),
  deleteKota: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/wilayah-kota/${id}`),
  deleteKecamatan: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/wilayah-kecamatan/${id}`),
  deteleJenisSertifikasi: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-sertifikasi/${id}`),
  deteleJenistest: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-test/${id}`),
  deteleOutputPenelitian: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/output-penelitian/${id}`),
  deteleJenisCuti: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/cuti/${id}`),
  deteleJenisSk: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-sk/${id}`),
  deteleMasterPangkat: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/pangkat/${id}`),
  deteleStatusAktif: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/status-aktif/${id}`),
  deteleJenisLuaran: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-luaran/${id}`),
  deteleJenisPublikasi: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-publikasi/${id}`),
  deteleJenisPelanggaran: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-pelanggaran/${id}`),
  deteleJenisPenghargaan: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-penghargaan/${id}`),
  deteleUnitKerja: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/unit-kerja/${id}`),
  deteleJenisHari: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-hari/${id}`),
  deteleHubunganKerja: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/hubungan-kerja/${id}`),
  deteleDataAgama: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/agama/${id}`),
  deteleDataSuku: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/suku/${id}`),
  deteleDataGolonganDarah: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/golongan-darah/${id}`),
  deteleDataJenisKehadiran: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-kehadiran/${id}`),
  jenjangPendidikan: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenjang-pendidikan/${id}`),
  deleteJenisKenaikanPangkat: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-kenaikan-pangkat/${id}`),
  deleteBank: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/bank/${id}`),
  deleteJenisIzin: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jenis-izin/${id}`),
  deleteJabatanStruktural: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jabatan-struktural/${id}`),
  deleteJabatanFungsional: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/jabatan-fungsional/${id}`),
  deleteRumpunBidangIlmu: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/rumpun-bidang-ilmu/${id}`),
  deleteGelarAkademik: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/gelar-pendidikan/${id}`),

  // ── TETAP DI ADMIN (tidak ada di master data baru) ────────
  deteleEselon: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/eselon/${id}`),
  deteleJamKerja: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jam-kerja/${id}`),
  deteleJabatanAkademik: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jabatan-akademik/${id}`),
  deteleJenisPengabdian: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/jenis-pkm/${id}`),

  // ── NON-MASTER (operasional) ──────────────────────────────
  deteleDataBerita: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/berita/${id}`),
  deteleDataInputPresensi: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/input-presensi/${id}`),
  deteleDataPenghargaan: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/datapenghargaan/${id}`),
  deteleDataPelanggaran: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/datapelanggaran/${id}`),
  deletePegawai: (payload: string[]) =>
    axiosInstance.post(`${endpoint.PEGAWAI}/bulk-delete`, {
      ids: payload,
    }),
};

export default deleteReferensiServices;

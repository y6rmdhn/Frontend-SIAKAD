import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

interface IPayloadWithArray {
  ids: string[];
  keterangan?: string;
}

interface IPayloadWithArrayKeteranganAdmin {
  ids: string[];
  keterangan_admin?: string;
}

const patchDataServices = {
  aprovePengajuanIzin: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/validasi-izin/batch/approve`,
      payload
    ),
  tolakPengajuanIzin: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/validasi-izin/batch/reject`,
      payload
    ),
  aprovePengajuanCuti: (payload: IPayloadWithArrayKeteranganAdmin) =>
    axiosInstance.post(
      `${endpoint.ADMIN}/validasi-cuti/batch/approve`,
      payload
    ),
  tolakPengajuanCuti: (payload: IPayloadWithArray) =>
    axiosInstance.post(`${endpoint.ADMIN}/validasi-cuti/batch/reject`, payload),
  tolakDataKeluarga: (payload: IPayloadWithArray) =>
    axiosInstance.post(`${endpoint.VALIDASI}/data-keluarga/bulk-reject`, payload),
  approveDataKeluarga: (payload: IPayloadWithArray) =>
    axiosInstance.post(
      `${endpoint.VALIDASI}/data-keluarga/bulk-approve`,
      payload
    ),
  approveDataPangkat: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-pangkat/bulk-approve`,
      payload
    ),
  rejectDataPangkat: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-pangkat/bulk-reject`,
      payload
    ),
  draftDataPangkat: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datapangkatadm/batch/todraft`,
      payload
    ),
  approveDataJabatanStruktural: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-jabatan-struktural/bulk-approve`,
      payload
    ),
  rejectDataJabatanStruktural: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-jabatan-struktural/bulk-reject`,
      payload
    ),
  draftDataJabatanStruktural: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-jabatan-struktural/bulk-todraft`,
      payload
    ),
  approveDataJabatanFungsional: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-jabatan-fungsional/bulk-approve`,
      payload
    ),
  rejectDataJabatanFungsional: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-jabatan-fungsional/bulk-reject`,
      payload
    ),
  draftDataJabatanAkademik: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datajabatanakademikadm/batch/todraft`,
      payload
    ),
  approveDataRiwayatTes: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-test/bulk-approve`,
      payload
    ),
  rejectDataRiwayatTes: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-test/bulk-reject`,
      payload
    ),
  draftDataRiwayatTes: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datariwayattesadm/batch/todraft`,
      payload
    ),
  approveDataRiwayatSertifikasi: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-sertifikasi/bulk-approve`,
      payload
    ),
  rejectDataRiwayatSertifikasi: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-sertifikasi/bulk-reject`,
      payload
    ),
  draftDataRiwayatSertifikasi: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datasertifikasiadm/batch/todraft`,
      payload
    ),
  approveDataRiwayatKemampuanBahasa: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-kemampuan-bahasa/bulk-approve`,
      payload
    ),
  rejectDataRiwayatKemampuanBahasa: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-kemampuan-bahasa/bulk-reject`,
      payload
    ),
  approveDataRiwayatOrganisasi: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/dataorganisasi/batch/approve`,
      payload
    ),
  rejectDataRiwayatOrganisasi: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/dataorganisasi/batch/reject`,
      payload
    ),
  approveDataRiwayatHubunganKerja: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-hubungan-kerja/bulk-approve`,
      payload
    ),
  rejectDataRiwayatHubunganKerja: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.VALIDASI}/data-hubungan-kerja/bulk-reject`,
      payload
    ),
  approveDataRiwayatJabatanAkademik: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datajabatanakademikadm/batch/approve`,
      payload
    ),
  rejectDataRiwayatJabatanAkademik: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datajabatanakademikadm/batch/reject`,
      payload
    ),
  approveDataPenghargaan: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/validasi-penghargaan/batch/approve`,
      payload
    ),
  rejectDataPenghargaan: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/validasi-penghargaan/batch/reject`,
      payload
    ),
  approveDataPendidikanFormal: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datapendidikanformaladm/batch/approve`,
      payload
    ),
  rejectDataPendidikanFormal: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datapendidikanformaladm/batch/reject`,
      payload
    ),
  approveDataDiklat: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/pegawai/riwayat-diklat/batch/approve`,
      payload
    ),
  rejectDataDiklat: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/pegawai/riwayat-diklat/batch/reject`,
      payload
    ),
  approveDataRiwayatPekerjaan: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datariwayatpekerjaanadm/batch/approve`,
      payload
    ),
  rejectDataRiwayatPekerjaan: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datariwayatpekerjaanadm/batch/reject`,
      payload
    ),
  // ─── Penelitian ───────────────────────────────────────────────────────────────
  approveDataPenelitian: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-penelitian/bulk-approve`, payload),
  rejectDataPenelitian: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-penelitian/bulk-reject`, payload),

  // ─── Publikasi ────────────────────────────────────────────────────────────────
  approveDataPublikasi: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-publikasi/bulk-approve`, payload),
  rejectDataPublikasi: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-publikasi/bulk-reject`, payload),

  // ─── Paten ───────────────────────────────────────────────────────────────────
  approveDataPaten: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-paten/bulk-approve`, payload),
  rejectDataPaten: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-paten/bulk-reject`, payload),

  // ─── Pengabdian ───────────────────────────────────────────────────────────────
  approveDataPengabdian: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-pengabdian/bulk-approve`, payload),
  rejectDataPengabdian: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-pengabdian/bulk-reject`, payload),

  // ─── BahanAjar ────────────────────────────────────────────────────────────────
  approveDataBahanAjar: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-bahan-ajar/bulk-approve`, payload),
  rejectDataBahanAjar: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-bahan-ajar/bulk-reject`, payload),

  // ─── PenunjangLain ────────────────────────────────────────────────────────────
  approveDataPenunjangLain: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-penunjang-lainnya/bulk-approve`, payload),
  rejectDataPenunjangLain: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-penunjang-lainnya/bulk-reject`, payload),

  // ─── Homebase ─────────────────────────────────────────────────────────────────
  approveDataHomebase: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-homebase/bulk-approve`, payload),
  rejectDataHomebase: (payload: IPayloadWithArray) =>
    axiosInstance.put(`${endpoint.VALIDASI}/data-homebase/bulk-reject`, payload),
};

export default patchDataServices;

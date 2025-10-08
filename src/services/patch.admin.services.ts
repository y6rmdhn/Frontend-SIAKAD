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
    axiosInstance.post(`${endpoint.ADMIN}/data-keluarga/batch-reject`, payload),
  approveDataKeluarga: (payload: IPayloadWithArray) =>
    axiosInstance.post(
      `${endpoint.ADMIN}/data-keluarga/batch-approve`,
      payload
    ),
  approveDataPangkat: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datapangkatadm/batch/approve`,
      payload
    ),
  rejectDataPangkat: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datapangkatadm/batch/reject`,
      payload
    ),
  draftDataPangkat: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datapangkatadm/batch/todraft`,
      payload
    ),
  approveDataJabatanStruktural: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datajabatanstrukturaladm/batch/approve`,
      payload
    ),
  rejectDataJabatanStruktural: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datajabatanstrukturaladm/batch/reject`,
      payload
    ),
  draftDataJabatanStruktural: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datajabatanstrukturaladm/batch/todraft`,
      payload
    ),
  approveDataJabatanFungsional: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datajabatanfungsionaladm/batch/approve`,
      payload
    ),
  rejectDataJabatanFungsional: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datajabatanfungsionaladm/batch/reject`,
      payload
    ),
  draftDataJabatanAkademik: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datajabatanakademikadm/batch/todraft`,
      payload
    ),
  approveDataRiwayatTes: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datariwayattesadm/batch/approve`,
      payload
    ),
  rejectDataRiwayatTes: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datariwayattesadm/batch/reject`,
      payload
    ),
  draftDataRiwayatTes: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datariwayattesadm/batch/todraft`,
      payload
    ),
  approveDataRiwayatSertifikasi: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datasertifikasiadm/batch/approve`,
      payload
    ),
  rejectDataRiwayatSertifikasi: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datasertifikasiadm/batch/reject`,
      payload
    ),
  draftDataRiwayatSertifikasi: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datasertifikasiadm/batch/todraft`,
      payload
    ),
  approveDataRiwayatKemampuanBahasa: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datakemampuanbahasa/batch/approve`,
      payload
    ),
  rejectDataRiwayatKemampuanBahasa: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datakemampuanbahasa/batch/reject`,
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
      `${endpoint.ADMIN}/datahubungankerjaadm/batch/approve`,
      payload
    ),
  rejectDataRiwayatHubunganKerja: (payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/datahubungankerjaadm/batch/reject`,
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
};

export default patchDataServices;

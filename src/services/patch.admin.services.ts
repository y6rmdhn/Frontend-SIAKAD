import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

interface IPayload {
  id: number;
  keterangan_admin: string;
}

interface IPayloadWithArray {
  ids: number[];
  keterangan?: string;
}

interface IPayloadWithArrayKeteranganAdmin {
  ids: number[];
  keterangan_admin?: string;
}

const patchDataServices = {
  aprovePengajuanIzin: (id: number, payload: IPayload) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/validasi-izin/${id}/approve`,
      payload
    ),
  aprovePengajuanCuti: (
    id: number,
    payload: IPayloadWithArrayKeteranganAdmin
  ) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/validasi-cuti/${id}/approve`,
      payload
    ),
  tolakPengajuanCuti: (id: number, payload: IPayloadWithArray) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/validasi-cuti/${id}/reject`,
      payload
    ),
  tolakPengajuanIzin: (id: number, payload: IPayload) =>
    axiosInstance.patch(
      `${endpoint.ADMIN}/validasi-izin/${id}/reject`,
      payload
    ),
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
};

export default patchDataServices;

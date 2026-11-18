import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const BASE = `${endpoint.KEUANGAN}/slip`;

export interface PenerimaSlip {
  id: string;
  nama: string;
  nip: string | null;
  nidn: string | null;
  email: string | null;
  role: string | null;
  unit_kerja: string | null;
}

export type StatusKirim = "pending" | "terkirim" | "gagal" | "dilewati";

export interface ItemSlip {
  id: string;
  pegawai_id: string;
  nama: string;
  nip: string | null;
  nidn: string | null;
  email: string | null;
  nama_bank: string | null;
  no_rekening: string | null;
  no_ref: string | null;
  nominal: number;
  keterangan: string;
  email_status: StatusKirim;
  email_error: string | null;
  push_status: StatusKirim;
  push_error: string | null;
}

export interface RingkasanSlip {
  jumlah_item: number;
  jumlah_penerima: number;
  total_nominal: number;
}

export interface HitungKirim {
  email: Record<string, number>;
  push: Record<string, number>;
}

export interface DraftSlip {
  id: string;
  status: string;
  items: ItemSlip[];
  ringkasan: RingkasanSlip;
}

export interface RiwayatSlip {
  id: string;
  judul: string | null;
  status: string;
  dikirim_pada: string | null;
  jumlah_item: number;
  jumlah_penerima: number;
  total_nominal: number;
  jumlah_gagal: number;
}

export interface DetailRiwayatSlip extends DraftSlip {
  judul: string | null;
  dikirim_pada: string | null;
  hasil: HitungKirim;
}

export interface VariabelTemplate {
  key: string;
  label: string;
}

export interface TemplatePesan {
  template: string;
  updated_at: string | null;
  default: string;
  variabel: VariabelTemplate[];
}

const unwrap = <T>(r: { data: { data: T } }) => r.data.data;

const keuanganServices = {
  cariPenerima: (params: { q?: string; page?: number; limit?: number }) =>
    axiosInstance.get(`${BASE}/penerima`, { params }).then(unwrap<PenerimaSlip[]>),
  getDraft: () => axiosInstance.get(`${BASE}/draft`).then(unwrap<DraftSlip>),
  tambahItems: (
    items: {
      pegawai_id: string;
      nominal: string;
      keterangan: string;
      nomor_rekening?: string;
      bank_name?: string;
      no_ref?: string;
    }[]
  ) => axiosInstance.post(`${BASE}/draft/items`, { items }).then(unwrap<DraftSlip>),
  ubahItem: (
    id: string,
    body: { nominal?: string; keterangan?: string; nomor_rekening?: string; bank_name?: string; no_ref?: string }
  ) => axiosInstance.put(`${BASE}/draft/items/${id}`, body).then(unwrap<DraftSlip>),
  hapusItem: (id: string) =>
    axiosInstance.delete(`${BASE}/draft/items/${id}`).then(unwrap<DraftSlip>),
  kosongkanDraft: () => axiosInstance.delete(`${BASE}/draft`).then(unwrap<DraftSlip>),
  kirim: (judul?: string) =>
    axiosInstance.post(`${BASE}/draft/kirim`, { judul }).then(
      unwrap<{ batch_id: string; hasil: HitungKirim; items: ItemSlip[] }>
    ),
  getRiwayat: (params: { page?: number; limit?: number }) =>
    axiosInstance.get(`${BASE}/riwayat`, { params }).then(unwrap<RiwayatSlip[]>),
  getDetailRiwayat: (id: string) =>
    axiosInstance.get(`${BASE}/riwayat/${id}`).then(unwrap<DetailRiwayatSlip>),
  kirimUlang: (id: string) =>
    axiosInstance.post(`${BASE}/riwayat/${id}/kirim-ulang`).then(
      unwrap<{ batch_id: string; diulang: number; hasil: HitungKirim }>
    ),
  getTemplate: () => axiosInstance.get(`${BASE}/template`).then(unwrap<TemplatePesan>),
  simpanTemplate: (template: string) =>
    axiosInstance.put(`${BASE}/template`, { template }).then(unwrap<TemplatePesan>),
};

export default keuanganServices;

export interface JabatanFungsionalParams {
  page?: number | string;
  search?: string;
  unit_kerja?: string;
  status_pengajuan?: string;
  jabatan_fungsional?: string;
}

export interface KeluargaValidasiParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  hubungan?: string;
  jabatan_fungsional?: string;
  status?: string;
}

export interface HubunganKerjaParams {
  page?: string;
  search?: string;
  unit_kerja_id?: string;
  jabatan_fungsional_id?: string;
  status_pengajuan?: string;
}

export interface JabatanAkademikParams {
  page?: string;
  search?: string;
  unit_kerja_id?: string;
  jabatan_akademik_id?: string;
  status_pengajuan?: string;
}

export interface JabatanStrukturalParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  jabatan_struktural?: string;
  status_pengajuan?: string;
}

export interface PangkatParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  pangkat?: string;
  status_pengajuan?: string;
}

export interface SertifikasiParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  jenis_sertifikasi?: string;
  status_pengajuan?: string;
}

export interface TesKompetensiParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  jenis_tes?: string;
  status_pengajuan?: string;
}

export interface PenghargaanParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  jabatan_fungsional?: string;
  status_pengajuan?: string;
}

export interface KemampuanBahasaParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  bahasa?: string;
  status_pengajuan?: string;
}

export interface OrganisasiParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  jabatan_fungsional?: string;
  status_pengajuan?: string;
}

export interface PendidikanFormalParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  jenjang_pendidikan?: string;
  status_pengajuan?: string;
}

export interface DiklatParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  jenis_diklat?: string;
  status_pengajuan?: string;
}

export interface RiwayatPekerjaanParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  jenis_pekerjaan?: string;
  status_pengajuan?: string;
}

export interface PenghargaanParams {
  page?: string | number;
  unit_kerja_id?: string;
  search?: string;
  jabatan_fungsional_id?: string;
  jenis_penghargaan?: string;
}

export interface UnitKerjaItem {
  id: number;
  nama_unit: string;
}

export interface PaginatedUnitKerjaResponse {
  data: {
    data: UnitKerjaItem[];
    next_page_url: string | null;
  };
}

export interface PelanggaranParams {
  page?: string | number;
  search?: string;
  unit_kerja?: string;
  jabatan_fungsional?: string;
  jenis_pelanggaran?: string;
}

export interface PengajuanCutiParams {
  page: string;
  search?: string;
  unit_kerja?: string;
  jenis_cuti?: string;
  status?: string;
}

export interface PengajuanIzinParams {
  page: string;
  search?: string;
  unit_kerja?: string;
  periode_izin?: string;
  status?: string;
  jenis_izin?: string;
}

export interface MonitoringKegiatanParams {
  page?: string;
  search?: string;
  unit_kerja?: string;
  tanggal?: string;
}

export interface MonitoringPresensiParams {
  page?: string;
  search?: string;
  unit_kerja?: string;
  status_presensi?: string;
}

export interface RekapKehadiranParams {
  page?: string;
  search?: string;
  unit_kerja_id?: string;
  tanggal_awal?: string;
  tanggal_akhir?: string;
}

export interface PegawaiParams {
  page?: string;
  search?: string;
  unit_kerja_id?: string;
  status_pegawai?: string;
  jenis_pegawai?: string;
}

export interface InputKehadiranParams {
  page?: string;
  search?: string;
  tanggal?: string;
  unit_kerja_id?: string;
  jenis_kehadiran_id?: string;
  status_presensi?: string;
}

export interface PegawaiParams {
  page?: string;
  search?: string;
  unit_kerja_id?: string;
  status_aktif_id?: string;
  hubungan_kerja_id?: string;
}

export interface PegawaiParams {
  page?: string;
  search?: string;
  unit_kerja_id?: string;
  status_pegawai?: string;
  jenis_pegawai?: string;
}

export interface InputKehadiranParams {
  page?: string;
  search?: string;
  tanggal?: string;
  unit_kerja_id?: string;
  jenis_kehadiran_id?: string;
  status_presensi?: string;
}

export interface PegawaiParams {
  page?: string;
  search?: string;
  unit_kerja_id?: string;
  status_aktif_id?: string;
  hubungan_kerja_id?: string;
}

export interface BeritaParams {
  page?: any;
  search?: string | null; // Sekarang menerima string | null | undefined
  unit_kerja?: string | null; // Sekarang menerima string | null | undefined
}

export interface CutiParams {
  page?: any;
  search?: string | null;
  jenis_cuti?: string | null;
  jumlah_cuti?: string | null; // Kita akan kirim sebagai string
  status_pengajuan?: string | null;
}

export interface OrangtuaParams {
  page?: any;
  search?: string | null;
  status_pengajuan?: string | null;
  status_orangtua?: string | null;
}

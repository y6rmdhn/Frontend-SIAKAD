interface IJenisTesPost {
  kode: string;
  jenis_tes: string;
  nilai_minimal: number;
  nilai_maksimal: number;
}

interface IOutputPenelitianPost {
  kode: string;
  output_penelitian: string;
}

interface IJenisCutiPost {
  kode: string;
  nama_jenis_cuti: string;
  standar_cuti: number;
  format_nomor_surat: string;
  keterangan: string;
}

interface IJabatanAkademikPost {
  kode: string;
  nama_jenis_cuti: string;
  standar_cuti: number;
  format_nomor_surat: string;
  keterangan: string;
}

interface IJenisSk {
  kode: string;
  jenis_sk: string;
}

interface IStatusKeaktifan {
  kode: string;
  nama_status_aktif: string;
  status_keluar: boolean;
}

interface IStatusPangkat {
  pangkat: string;
  nama_golongan: string;
}

interface IStatusEselon {
  kode: string;
  nama_eselon: string;
  status: boolean;
}

interface IJamKerja {
  jenis_jam_kerja: string;
  jam_normal: boolean;
  jam_datang: string;
  jam_pulang: string;
}

interface IJenisSertifikasi {
  kode: string;
  nama_sertifikasi: string;
  jenis_sertifikasi: string;
}

interface IJenisLuaran {
  kode: string;
  jenis_luaran: string;
}

interface IPengabdian {
  kode: string;
  nama_pkm: string;
}

interface IJenisPublikasi {
  kode: string;
  jenis_publikasi: string;
}

interface IJenisPelanggaran {
  kode: string;
  nama_pelanggaran: string;
}

interface IJabatanAkademik {
  role_id: number;
  kode: string;
  jabatan_akademik: string;
}

interface IMediaPublikasi {
  nama: string;
}

interface IPenghargaan {
  jenis_penghargaan: string;
  nama_penghargaan: string;
  no_sk: string;
  tanggal_sk: string;
  tanggal_penghargaan: string;
  keterangan: string;
}

interface IJenisPenghargaan {
  kode: string;
  nama: string;
}

interface UnitKerja {
  kode_unit: string;
  nama_unit: string;
  jenis_unit_id: number;
  tk_pendidikan_id: number;
  akreditasi_id: number;

  parent_unit_id?: string;
  alamat?: string;
  telepon?: string;
  website?: string;
  alamat_email?: string;
  no_sk_akreditasi?: string;
  tanggal_akreditasi?: string;
  no_sk_pendirian?: string;
  tanggal_sk_pendirian?: string;
  gedung?: string;
}

interface IJenisHari {
  kode: string;
  nama_hari: string;
  jenis_hari: boolean;
}

interface IHubunganKerja {
  kode: string;
  nama_hub_kerja: string;
  status_aktif: boolean;
  pns: boolean;
}

export type {
  IJenisTesPost,
  IOutputPenelitianPost,
  IJenisCutiPost,
  IJabatanAkademikPost,
  IJenisSk,
  IStatusKeaktifan,
  IStatusPangkat,
  IStatusEselon,
  IJamKerja,
  IJenisLuaran,
  IJenisSertifikasi,
  IPengabdian,
  IJenisPublikasi,
  IJenisPelanggaran,
  IJabatanAkademik,
  IMediaPublikasi,
  IPenghargaan,
  IJenisPenghargaan,
  UnitKerja,
  IJenisHari,
  IHubunganKerja,
};

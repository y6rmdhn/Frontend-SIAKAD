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
    jenis_jam_kerja: string,
    jam_normal: boolean,
    jam_datang: string,
    jam_pulang: string,
}

interface IJenisSertifikasi {
    kode: string,
    nama_sertifikasi: string,
    jenis_sertifikasi: string,
}

interface IJenisLuaran {
    kode: string,
    jenis_luaran: string,
}

interface IPengabdian {
    kode: string,
    nama_pkm: string,
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
};

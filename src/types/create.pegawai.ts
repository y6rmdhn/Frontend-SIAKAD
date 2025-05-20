interface IDataPegawai {
    nip: string;
    nama: string;
    gelar_depan?: string;
    gelar_belakang?: string;
    jenis_kelamin?: "lk" | "pr";
    agama: string;
    tempat_lahir?: string;
    tanggal_lahir: string;
    kode_status_pernikahan?: number;
    golongan_darah?: string;

    // kepegawaian
    unit_kerja: string;
    status_aktif: string;
    hubungan_kerja: string;
    email_pegawai?: string;
    email_pribadi?: string;
    golongan?: string;
    jabatan_fungsional?: string;

    // domisili
    np_ktp?: string;
    no_kk?: string;
    warga_negara: string;
    provinsi?: string;
    kota?: string;
    alamat_domisili?: string;
    kecamatan?: string;
    kode_pos?: string;
    suku?: string;
    jarak_rumah_domisili?: string;
    no_telepon_domisili_kontak?: string;
    no_handphone?: string;

    // rekening bank
    nama_bank?: string;
    cabang_bank?: string;
    nama_rekening?: string;
    no_rekening?: string;

    // dokumen
    kapreg?: string;
    file_kapreg?: File;
    npwp?: string;
    file_npwp?: File;
    file_rekening?: File;
    file_kk?: File;
    file_ktp?: File;
    file_sertifikasi_dosen?: File;
    no_bpjs?: string;
    no_bpjs_ketenagakerjaan?: string;
    no_bpjs_pensiun?: string;
    file_bpjs?: File;

    // detail kendaraan
    nomor_polisi?: string;
    jenis_kendaraan?: string;
    merk_kendaraan?: string;
    berat_badan?: number;
    tinggi_badan?: number;
}

export type { IDataPegawai };

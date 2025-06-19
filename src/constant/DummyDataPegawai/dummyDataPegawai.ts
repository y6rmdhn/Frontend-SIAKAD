type PegawaiInfo = {
    nip: string;
    nama: string;
    unit_kerja: string;
    status: string;
    jab_akademik: string;
    jab_fungsional: string;
    jab_struktural: string;
    pendidikan: string;
};

export const DummyDataDosen: { pegawai_info: PegawaiInfo } = {
    pegawai_info: {
        nip: "198501012005011002",
        nama: "Dr. Ahmad Syahroni, M.Kom",
        unit_kerja: "Fakultas Teknik Informatika",
        status: "Dosen Tetap",
        jab_akademik: "Lektor Kepala",
        jab_fungsional: "Ketua Program Studi",
        jab_struktural: "Wakil Dekan I",
        pendidikan: "S3 Ilmu Komputer - Universitas Indonesia",
    }
};

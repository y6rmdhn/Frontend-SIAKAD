import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

/**
 * Unified service untuk semua CRUD master data.
 * Base path: /api/master/
 * Pattern: GET all, GET by id, POST, PUT, DELETE
 */
const masterServices = {
    // ─── AGAMA ────────────────────────────────────────────────
    getAgama: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/agama`, { params }),
    getAgamaById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/agama/${id}`),
    createAgama: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/agama`, data),
    updateAgama: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/agama/${id}`, data),
    deleteAgama: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/agama/${id}`),

    // ─── BAHASA ───────────────────────────────────────────────
    getBahasa: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/bahasa`, { params }),
    getBahasaById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/bahasa/${id}`),
    createBahasa: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/bahasa`, data),
    updateBahasa: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/bahasa/${id}`, data),
    deleteBahasa: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/bahasa/${id}`),

    // ─── BANK ─────────────────────────────────────────────────
    getBank: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/bank`, { params }),
    getBankById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/bank/${id}`),
    createBank: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/bank`, data),
    updateBank: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/bank/${id}`, data),
    deleteBank: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/bank/${id}`),

    // ─── JENIS CUTI ───────────────────────────────────────────
    getJenisCuti: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/cuti`, { params }),
    getJenisCutiById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/cuti/${id}`),
    createJenisCuti: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/cuti`, data),
    updateJenisCuti: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/cuti/${id}`, data),
    deleteJenisCuti: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/cuti/${id}`),

    // ─── DAFTAR HARI LIBUR ───────────────────────────────────
    getHariLibur: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/daftar-hari-libur`, { params }),
    getHariLiburById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/daftar-hari-libur/${id}`),
    createHariLibur: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/daftar-hari-libur`, data),
    updateHariLibur: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/daftar-hari-libur/${id}`, data),
    deleteHariLibur: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/daftar-hari-libur/${id}`),

    // ─── GELAR PENDIDIKAN (dulu: gelar-akademik) ─────────────
    getGelarPendidikan: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/gelar-pendidikan`, { params }),
    getGelarPendidikanById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/gelar-pendidikan/${id}`),
    createGelarPendidikan: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/gelar-pendidikan`, data),
    updateGelarPendidikan: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/gelar-pendidikan/${id}`, data),
    deleteGelarPendidikan: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/gelar-pendidikan/${id}`),

    // ─── GOLONGAN DARAH ───────────────────────────────────────
    getGolonganDarah: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/golongan-darah`, { params }),
    getGolonganDarahById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/golongan-darah/${id}`),
    createGolonganDarah: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/golongan-darah`, data),
    updateGolonganDarah: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/golongan-darah/${id}`, data),
    deleteGolonganDarah: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/golongan-darah/${id}`),

    // ─── HUBUNGAN KERJA ───────────────────────────────────────
    getHubunganKerja: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/hubungan-kerja`, { params }),
    getHubunganKerjaById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/hubungan-kerja/${id}`),
    createHubunganKerja: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/hubungan-kerja`, data),
    updateHubunganKerja: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/hubungan-kerja/${id}`, data),
    deleteHubunganKerja: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/hubungan-kerja/${id}`),

    // ─── JABATAN FUNGSIONAL ───────────────────────────────────
    getJabatanFungsional: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jabatan-fungsional`, { params }),
    getJabatanFungsionalById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jabatan-fungsional/${id}`),
    createJabatanFungsional: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jabatan-fungsional`, data),
    updateJabatanFungsional: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jabatan-fungsional/${id}`, data),
    deleteJabatanFungsional: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jabatan-fungsional/${id}`),

    // ─── JABATAN STRUKTURAL ───────────────────────────────────
    getJabatanStruktural: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jabatan-struktural`, { params }),
    getJabatanStrukturalById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jabatan-struktural/${id}`),
    createJabatanStruktural: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jabatan-struktural`, data),
    updateJabatanStruktural: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jabatan-struktural/${id}`, data),
    deleteJabatanStruktural: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jabatan-struktural/${id}`),

    // ─── JENIS HARI ───────────────────────────────────────────
    getJenisHari: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-hari`, { params }),
    getJenisHariById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-hari/${id}`),
    createJenisHari: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-hari`, data),
    updateJenisHari: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-hari/${id}`, data),
    deleteJenisHari: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-hari/${id}`),

    // ─── JENIS IZIN ───────────────────────────────────────────
    getJenisIzin: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-izin`, { params }),
    getJenisIzinById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-izin/${id}`),
    createJenisIzin: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-izin`, data),
    updateJenisIzin: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-izin/${id}`, data),
    deleteJenisIzin: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-izin/${id}`),

    // ─── JENIS JABATAN STRUKTURAL ─────────────────────────────
    getJenisJabatanStruktural: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-jabatan-struktural`, { params }),
    getJenisJabatanStrukturalById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-jabatan-struktural/${id}`),
    createJenisJabatanStruktural: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-jabatan-struktural`, data),
    updateJenisJabatanStruktural: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-jabatan-struktural/${id}`, data),
    deleteJenisJabatanStruktural: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-jabatan-struktural/${id}`),

    // ─── JENIS KEHADIRAN ──────────────────────────────────────
    getJenisKehadiran: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-kehadiran`, { params }),
    getJenisKehadiranById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-kehadiran/${id}`),
    createJenisKehadiran: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-kehadiran`, data),
    updateJenisKehadiran: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-kehadiran/${id}`, data),
    deleteJenisKehadiran: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-kehadiran/${id}`),

    // ─── JENIS KENAIKAN PANGKAT ───────────────────────────────
    getJenisKenaikanPangkat: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-kenaikan-pangkat`, { params }),
    getJenisKenaikanPangkatById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-kenaikan-pangkat/${id}`),
    createJenisKenaikanPangkat: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-kenaikan-pangkat`, data),
    updateJenisKenaikanPangkat: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-kenaikan-pangkat/${id}`, data),
    deleteJenisKenaikanPangkat: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-kenaikan-pangkat/${id}`),

    // ─── JENIS LUARAN ─────────────────────────────────────────
    getJenisLuaran: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-luaran`, { params }),
    getJenisLuaranById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-luaran/${id}`),
    createJenisLuaran: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-luaran`, data),
    updateJenisLuaran: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-luaran/${id}`, data),
    deleteJenisLuaran: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-luaran/${id}`),

    // ─── JENIS PELANGGARAN ────────────────────────────────────
    getJenisPelanggaran: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-pelanggaran`, { params }),
    getJenisPelanggaranById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-pelanggaran/${id}`),
    createJenisPelanggaran: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-pelanggaran`, data),
    updateJenisPelanggaran: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-pelanggaran/${id}`, data),
    deleteJenisPelanggaran: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-pelanggaran/${id}`),

    // ─── JENIS PENGHARGAAN ────────────────────────────────────
    getJenisPenghargaan: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-penghargaan`, { params }),
    getJenisPenghargaanById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-penghargaan/${id}`),
    createJenisPenghargaan: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-penghargaan`, data),
    updateJenisPenghargaan: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-penghargaan/${id}`, data),
    deleteJenisPenghargaan: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-penghargaan/${id}`),

    // ─── JENIS PUBLIKASI ──────────────────────────────────────
    getJenisPublikasi: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-publikasi`, { params }),
    getJenisPublikasiById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-publikasi/${id}`),
    createJenisPublikasi: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-publikasi`, data),
    updateJenisPublikasi: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-publikasi/${id}`, data),
    deleteJenisPublikasi: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-publikasi/${id}`),

    // ─── JENIS SERTIFIKASI (dulu: master-jenis-sertifikasi) ───
    getJenisSertifikasi: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-sertifikasi`, { params }),
    getJenisSertifikasiById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-sertifikasi/${id}`),
    createJenisSertifikasi: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-sertifikasi`, data),
    updateJenisSertifikasi: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-sertifikasi/${id}`, data),
    deleteJenisSertifikasi: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-sertifikasi/${id}`),

    // ─── JENIS SK ─────────────────────────────────────────────
    getJenisSk: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-sk`, { params }),
    getJenisSkById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-sk/${id}`),
    createJenisSk: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-sk`, data),
    updateJenisSk: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-sk/${id}`, data),
    deleteJenisSk: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-sk/${id}`),

    // ─── JENIS TEST ───────────────────────────────────────────
    getJenisTest: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-test`, { params }),
    getJenisTestById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenis-test/${id}`),
    createJenisTest: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenis-test`, data),
    updateJenisTest: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenis-test/${id}`, data),
    deleteJenisTest: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenis-test/${id}`),

    // ─── JENJANG PENDIDIKAN ───────────────────────────────────
    getJenjangPendidikan: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/jenjang-pendidikan`, { params }),
    getJenjangPendidikanById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/jenjang-pendidikan/${id}`),
    createJenjangPendidikan: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/jenjang-pendidikan`, data),
    updateJenjangPendidikan: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/jenjang-pendidikan/${id}`, data),
    deleteJenjangPendidikan: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/jenjang-pendidikan/${id}`),

    // ─── OUTPUT PENELITIAN ────────────────────────────────────
    getOutputPenelitian: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/output-penelitian`, { params }),
    getOutputPenelitianById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/output-penelitian/${id}`),
    createOutputPenelitian: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/output-penelitian`, data),
    updateOutputPenelitian: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/output-penelitian/${id}`, data),
    deleteOutputPenelitian: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/output-penelitian/${id}`),

    // ─── PANGKAT (dulu: master-pangkat) ──────────────────────
    getPangkat: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/pangkat`, { params }),
    getPangkatById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/pangkat/${id}`),
    createPangkat: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/pangkat`, data),
    updatePangkat: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/pangkat/${id}`, data),
    deletePangkat: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/pangkat/${id}`),

    // ─── PEKERJAAN ────────────────────────────────────────────
    getPekerjaan: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/pekerjaan`, { params }),
    getPekerjaanById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/pekerjaan/${id}`),
    createPekerjaan: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/pekerjaan`, data),
    updatePekerjaan: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/pekerjaan/${id}`, data),
    deletePekerjaan: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/pekerjaan/${id}`),

    // ─── ROLE ─────────────────────────────────────────────────
    getRole: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/role`, { params }),
    getRoleById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/role/${id}`),

    // ─── RUMPUN BIDANG ILMU ───────────────────────────────────
    getRumpunBidangIlmu: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/rumpun-bidang-ilmu`, { params }),
    getRumpunBidangIlmuById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/rumpun-bidang-ilmu/${id}`),
    createRumpunBidangIlmu: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/rumpun-bidang-ilmu`, data),
    updateRumpunBidangIlmu: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/rumpun-bidang-ilmu/${id}`, data),
    deleteRumpunBidangIlmu: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/rumpun-bidang-ilmu/${id}`),

    // ─── STATUS AKTIF ─────────────────────────────────────────
    getStatusAktif: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/status-aktif`, { params }),
    getStatusAktifById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/status-aktif/${id}`),
    createStatusAktif: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/status-aktif`, data),
    updateStatusAktif: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/status-aktif/${id}`, data),
    deleteStatusAktif: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/status-aktif/${id}`),

    // ─── STATUS PERNIKAHAN ────────────────────────────────────
    getStatusPernikahan: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/status-pernikahan`, { params }),
    getStatusPernikahanById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/status-pernikahan/${id}`),
    createStatusPernikahan: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/status-pernikahan`, data),
    updateStatusPernikahan: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/status-pernikahan/${id}`, data),
    deleteStatusPernikahan: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/status-pernikahan/${id}`),

    // ─── SUKU ─────────────────────────────────────────────────
    getSuku: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/suku`, { params }),
    getSukuById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/suku/${id}`),
    createSuku: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/suku`, data),
    updateSuku: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/suku/${id}`, data),
    deleteSuku: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/suku/${id}`),

    // ─── UNIT KERJA ───────────────────────────────────────────
    getUnitKerja: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/unit-kerja`, { params }),
    getUnitKerjaById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/unit-kerja/${id}`),
    createUnitKerja: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/unit-kerja`, data),
    updateUnitKerja: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/unit-kerja/${id}`, data),
    deleteUnitKerja: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/unit-kerja/${id}`),

    // ─── UNIVERSITAS ──────────────────────────────────────────
    getUniversitas: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/universitas`, { params }),
    getUniversitasById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/universitas/${id}`),
    createUniversitas: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/universitas`, data),
    updateUniversitas: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/universitas/${id}`, data),
    deleteUniversitas: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/universitas/${id}`),

    // ─── UNIVERSITAS PRODI ────────────────────────────────────
    getUniversitasProdi: (params?: object) =>
        axiosInstance.get(`${endpoint.MASTER}/universitas-prodi`, { params }),
    getUniversitasProdiById: (id: string) =>
        axiosInstance.get(`${endpoint.MASTER}/universitas-prodi/${id}`),
    createUniversitasProdi: (data: object) =>
        axiosInstance.post(`${endpoint.MASTER}/universitas-prodi`, data),
    updateUniversitasProdi: (id: string, data: object) =>
        axiosInstance.put(`${endpoint.MASTER}/universitas-prodi/${id}`, data),
    deleteUniversitasProdi: (id: string) =>
        axiosInstance.delete(`${endpoint.MASTER}/universitas-prodi/${id}`),
};

export default masterServices;

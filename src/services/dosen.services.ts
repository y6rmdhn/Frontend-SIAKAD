import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import {
  AnakParams,
  BeritaParams,
  CutiParams,
  EvaluasiKinerjaParams,
  OrangtuaParams,
  PasanganParams,
} from "@/types";

const dosenServices = {
  //   keluarga
  getDataAnak: (params: AnakParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) {
      cleanParams.search = params.search;
    }
    if (params.status_pengajuan && params.status_pengajuan !== "semua") {
      cleanParams.status_pengajuan = params.status_pengajuan;
    }

    return axiosInstance.get(`${endpoint.DOSEN}/anak`, {
      params: cleanParams,
    });
  },

  // Pastikan Anda juga memiliki service untuk mengambil info pegawai
  getPegawaiInfo: () => {
    // Ganti dengan endpoint yang benar untuk mengambil detail profil pegawai
    return axiosInstance.get(`${endpoint.DOSEN}/profil-pegawai`);
  },
  getDataKeluarga: (params?: {
    page?: number | string;
    search?: string;
    status?: string;
  }) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-keluarga`, {
      params,
    }),
  getDataKeluargaDetail: (id: string | number) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-keluarga/${id}`),
  getDataAnakWithoutParam: () => axiosInstance.get(`${endpoint.DOSEN}/anak`),

  getDataAnakDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/anak/` + id),

  getDataOrangtua: (params: OrangtuaParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) {
      cleanParams.search = params.search;
    }
    if (params.status_pengajuan && params.status_pengajuan !== "semua") {
      cleanParams.status_pengajuan = params.status_pengajuan;
    }
    if (params.status_orangtua && params.status_orangtua !== "semua") {
      // Sesuaikan nama parameter jika backend mengharapkan nama lain
      // contoh: cleanParams.status_orang_tua = params.status_orangtua;
      cleanParams.status_orangtua = params.status_orangtua;
    }

    return axiosInstance.get(`${endpoint.DOSEN}/orangtua`, {
      params: cleanParams,
    });
  },

  getDataOrangtuaWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/orangtua`),

  getDataOrangtuaDetail: (id: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/orangtua/` + id),

  getDataPasangan: (params: PasanganParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) {
      cleanParams.search = params.search;
    }
    if (params.status_pengajuan && params.status_pengajuan !== "semua") {
      cleanParams.status_pengajuan = params.status_pengajuan;
    }

    return axiosInstance.get(`${endpoint.DOSEN}/pasangan`, {
      params: cleanParams,
    });
  },
  getDataPasanganWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/pasangan`),
  getDataPasanganDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/pasangan/` + id),

  // kepegawaian
  getPangkat: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-pangkat`, {
      params,
    }),
  getDataPangkatWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/pangkat`),
  getDataPangkatDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-pangkat/` + id),

  getJabatanAkademik: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanakademik`, {
      params: {
        page: page,
      },
    }),

  getJabatanAkademikDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanakademik/` + id),

  getDataJabatanakademikWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanakademik`),

  getJabatanFungsional: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-jabatan-fungsional`, {
      params,
    }),
  getJabatanFungsionalDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-jabatan-fungsional/` + id),
  getDataJabatanakfungsionalWithoutParam: () =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-jabatan-fungsional`),

  getJabatanStruktural: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-jabatan-struktural`, {
      params,
    }),
  getJabatanStrukturalDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-jabatan-struktural/` + id),
  getDataJabatanakstrukturalWithoutParam: () =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-jabatan-struktural`),

  getHubunganKerja: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-hubungan-kerja`, {
      params,
    }),
  getHubunganKerjaDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-hubungan-kerja/${id}`),
  getDataHubunganKerjaWithoutParam: () =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-hubungan-kerja`),

  //  kualifikasi
  getDiklat: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/data-diklat`, {
      params: {
        page: page,
      },
    }),
  getDiklatDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/data-diklat/` + id),
  getDataDiklatWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/data-diklat`),

  getRiwayatPekerjaan: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-riwayat-pekerjaan`, {
      params,
    }),
  getPenghargaan: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-penghargaan`, {
      params,
    }),

  // Pengenbangan Diri
  getKemampuanBahasa: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-kemampuan-bahasa`, {
      params,
    }),
  getKemampuanBahasaDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-kemampuan-bahasa/` + id),
  getDataKemampuanBahasaWithoutParam: () =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-kemampuan-bahasa`),

  getOrganisasi: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-organisasi`, {
      params,
    }),
  getOrganisasiDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-organisasi/` + id),
  getDataOrganisasiWithoutParam: () =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-organisasi`),

  // riwayat kehadiran
  getDataRiwayatKehadiran: (tahun: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/riwayat-kehadiran`, {
      params: {
        tahun: tahun,
      },
    }),
  getDataDetailRiwayatKehadiran: (tahun: string, bulan: number | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/riwayat-kehadiran/detail`, {
      params: {
        tahun: tahun,
        bulan: bulan,
      },
    }),
  getStatusAbsen: () => axiosInstance.get(`${endpoint.ABSENSI}/presensi/today`),

  getHistoryAbsensi: (params?: {
    tgl_mulai?: string;
    tgl_selesai?: string;
    bulan?: number;
    tahun?: number;
  }) => axiosInstance.get(`${endpoint.ABSENSI}/presensi/me`, { params }),

  getAbsensiDashboard: () =>
    axiosInstance.get(`${endpoint.ABSENSI}/statistik/dashboard`),

  //   kualifikasi
  getDataSertifikasiDosen: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-sertifikasi`, {
      params,
    }),
  getDataTesDosen: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-test`, {
      params,
    }),

  getDetailDataSertifikasiDosen: (id: string | number) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-sertifikasi/` + id),

  getDetailDataTesDosen: (id: string | number) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-test/` + id),

  getDataDataSertifikasiWithoutParam: () =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-sertifikasi`),

  // operasional
  getDataIzin: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    jenis_izin_id?: string;
  }) => {
    return axiosInstance.get(`${endpoint.ABSENSI}/izin`, {
      params,
    });
  },
  getDataIzinWithoutParams: (id: number | string) =>
    axiosInstance.get(`${endpoint.ABSENSI}/izin/` + id),

  getDataCuti: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.ABSENSI}/cuti`, {
      params,
    });
  },

  getDataBeritaUser: (params: BeritaParams) => {
    // 1. Buat objek parameter yang bersih, dengan default page = 1
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    // 2. Tambahkan parameter lain hanya jika ada nilainya (tidak kosong atau undefined)
    if (params.search) {
      cleanParams.search = params.search;
    }

    if (params.unit_kerja && params.unit_kerja !== "semua") {
      cleanParams.unit_kerja = params.unit_kerja;
    }

    // 3. Lakukan panggilan API dengan parameter yang sudah bersih
    return axiosInstance.get(`${endpoint.DOSEN}/berita-pegawai`, {
      params: cleanParams,
    });
  },
  getDataPendidikanFormalUser: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-pendidikan-formal`, {
      params,
    }),
  getDataPelanggaran: (page?: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/riwayatpelanggarandosen`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getDataKegiatanHarian: (
    page?: any,
    search?: string | undefined,
    bulan?: number, // <-- Tambahkan parameter bulan
    tahun?: number, // <-- Tambahkan parameter tahun
  ) =>
    axiosInstance.get(`${endpoint.DOSEN}/kegiatanhariandosen`, {
      params: {
        page: page,
        search: search,
        bulan: bulan, // <-- Kirim sebagai query param
        tahun: tahun, // <-- Kirim sebagai query param
      },
    }),
  getDataMonitoringKegiatan: (page?: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/monitoring-presensi`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getDasboardUser: (
    tgl_mulai?: string | undefined,
    tgl_selesai?: string | undefined,
  ) =>
    axiosInstance.get(`${endpoint.DOSEN}/dosen-dashboard`, {
      params: {
        tgl_mulai: tgl_mulai,
        tgl_selesai: tgl_selesai,
      },
    }),
  getDasboardGrafik: (
    tgl_mulai?: string | undefined,
    tgl_selesai?: string | undefined,
  ) =>
    axiosInstance.get(
      `${endpoint.DOSEN}/dosen-dashboard/evaluasi-kinerja-chart`,
      {
        params: {
          tgl_mulai: tgl_mulai,
          tgl_selesai: tgl_selesai,
        },
      },
    ),

  getBiodataDosen: () => axiosInstance.get(`${endpoint.DOSEN}/biodata`),

  getDataCutiWithoutParams: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/pengajuan-cuti-dosen/` + id),

  // select content
  getJenisSk: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/jenis-sk`, {
      params: {
        page: page,
      },
    }),
  getJenisKenaikanPangkat: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/jenis-kenaikan-pangkat`, {
      params: {
        page: page,
      },
    }),
  getMasterPangkatReferensi: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/master-pangkat`, {
      params: {
        page: page,
      },
    }),
  getJabatanAkademikSelect: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatan-akademik`, {
      params: {
        page: page,
      },
    }),
  getJabatanStrukturalSelect: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatan-struktural`, {
      params: {
        page: page,
      },
    }),
  getHubunganKerjaSelect: (params?: any) =>
    axiosInstance.get(`${endpoint.MASTER}/hubungan-kerja`, {
      params,
    }),
  getStatusAktifSelect: (params?: any) =>
    axiosInstance.get(`${endpoint.MASTER}/status-aktif`, {
      params,
    }),
  getProdiSelect: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/master-prodi-perguruan-tinggi`, {
      params: {
        page: page,
      },
    }),
  getJenjangPendidikanSelect: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/jenjang-pendidikan`, {
      params: {
        page: page,
      },
    }),
  getJenisSertifikasiReferensi: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/master-jenis-sertifikasi`, {
      params: {
        page: page,
      },
    }),
  getRumpunBidangIlmu: (page?: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/rumpun-bidang-ilmu`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getJenisTes: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/jenis-test`, {
      params: {
        page: page,
      },
    }),
  getJenisPenghargaanReferensi: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/jenis-penghargaan`, {
      params: {
        page: page,
      },
    }),
  getPengajuanCutiDosen: (params?: any) =>
    axiosInstance.get(`${endpoint.MASTER}/cuti`, {
      params,
    }),
  getPengajuanIzinDosen: (page?: any) =>
    axiosInstance.get(`${endpoint.MASTER}/jenis-izin`, {
      params: {
        page: page,
        is_dropdown: true,
      },
    }),
  getProfilPegawai: () => axiosInstance.get(`${endpoint.PEGAWAI}/profile`),

  // update profil mandiri
  updateProfilPegawai: (payloadData: any) => {
    const formData = new FormData();
    Object.keys(payloadData).forEach((key) => {
      if (
        payloadData[key] !== null &&
        payloadData[key] !== undefined &&
        payloadData[key] !== ""
      ) {
        const finalKey = key === "no_bpjs" ? "bpjs" : key;
        formData.append(finalKey, payloadData[key]);
      }
    });
    return axiosInstance.put(`${endpoint.PEGAWAI}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getLocation: () => axiosInstance.get(`${endpoint.DOSEN}/setting-kehadiran`),
  getPendidikanFormalDetail: (id: string) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-pendidikan-formal/${id}`),
  getRiwayatPekerjaanDetail: (id: string) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-riwayat-pekerjaan/${id}`),
  getPenghargaanDetail: (id: string) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-penghargaan/${id}`),
  getBeritaDetail: (id: string) =>
    axiosInstance.get(`${endpoint.DOSEN}/berita/${id}`),
  getSlipGaji: (params?: { pegawai_id?: string; periode_tahun?: string }) =>
    axiosInstance.get(`${endpoint.GAJI}/gaji/riwayat`, { params }),
  getEvaluasiKinerja: (params: EvaluasiKinerjaParams) => {
    return axiosInstance.get(`${endpoint.PEGAWAI}/evaluasi-kinerja`, {
      params,
    });
  },
  getPegawaiList: (params?: { search?: string; page?: string | number }) => {
    return axiosInstance.get(`${endpoint.PEGAWAI}/list`, {
      params,
    });
  },
  getEvaluasiTemplates: () => {
    return axiosInstance.get(`${endpoint.PEGAWAI}/evaluasi-template`);
  },
  getEvaluasiKinerjaDetail: (id: string) => {
    return axiosInstance.get(`${endpoint.PEGAWAI}/evaluasi-kinerja/${id}`);
  },
  updateNilaiManual: (evaluasiId: string, itemId: string, nilai: number) => {
    return axiosInstance.put(`${endpoint.PEGAWAI}/evaluasi-kinerja/${evaluasiId}/detail/${itemId}`, {
      nilai,
    });
  },
  deleteEvaluasiKinerja: (id: string) => {
    return axiosInstance.delete(`${endpoint.PEGAWAI}/evaluasi-kinerja/${id}`);
  },
  getAtasan: () => {
    return axiosInstance.get(`${endpoint.PEGAWAI}/atasan`);
  },
};

export default dosenServices;

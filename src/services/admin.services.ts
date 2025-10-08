import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import {
  DiklatParams,
  GelarAkademikParams,
  HubunganKerjaParams,
  InputKehadiranParams,
  JabatanAkademikParams,
  JabatanFungsionalParams,
  JabatanStrukturalParams,
  KemampuanBahasaParams,
  MonitoringKegiatanParams,
  MonitoringPresensiParams,
  OrganisasiParams,
  PangkatParams,
  PelanggaranParams,
  PendidikanFormalParams,
  PengajuanCutiParams,
  PengajuanIzinParams,
  PenghargaanParams,
  RekapKehadiranParams,
  RiwayatPekerjaanParams,
  SertifikasiParams,
  TesKompetensiParams,
  UnitKerjaItem,
} from "@/types";

type HubunganKerjaMonitoringParams = {
  page?: string;
  search?: string;
  unit_kerja?: string; // Diperbaiki: Tanpa _id
  hubungan_kerja?: string; // Diperbaiki: Tanpa _id
  status_masa_kerja?: string;
  level?: string; // Menambahkan parameter 'level' sesuai screenshot
};

const adminServices = {
  getStatusAktif: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/status-aktif`, {
      params: {
        page: page,
      },
    }),
  getHubunganKerjaMonitoring: (params: HubunganKerjaMonitoringParams) => {
    const cleanParams: Record<string, any> = { ...params };

    // Hapus parameter yang kosong, null, atau "semua"
    Object.keys(cleanParams).forEach((key) => {
      const K = key as keyof HubunganKerjaMonitoringParams;
      if (!cleanParams[K] || cleanParams[K] === "semua") {
        delete cleanParams[K];
      }
    });

    return axiosInstance.get(`${endpoint.ADMIN}/monitoring/hubungan-kerja`, {
      params: cleanParams,
    });
  },
  getUnitKerja: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/unit-kerja`, {
      params: {
        page: page,
      },
    }),
  getHubunganKerja: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/hubungan-kerja`, {
      params: {
        page: page,
      },
    }),
  getJabatanAkademik: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jabatan-akademik`, {
      params: {
        page: page,
      },
    }),
  getJenisCuti: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/daftar-cuti`, {
      params: {
        page: page,
      },
    }),
  getJenisSk: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-sk`, {
      params: {
        page: page,
      },
    }),
  getJenisTes: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-test`, {
      params: {
        page: page,
      },
    }),
  getOutputPenelitian: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/output-penelitian`, {
      params: {
        page: page,
      },
    }),
  getJenisHari: () => axiosInstance.get(`${endpoint.ADMIN}/jenis-hari`),
  getSemuaUnitKerja: async (): Promise<UnitKerjaItem[]> => {
    let allUnits: UnitKerjaItem[] = [];
    let url: string | null = `${endpoint.ADMIN}/unit-kerja`;

    try {
      while (url) {
        const response: any = await axiosInstance.get(url);

        const unitsOnPage = response.data.data.data;

        url = response.data.data.next_page_url;

        if (Array.isArray(unitsOnPage)) {
          allUnits = [...allUnits, ...unitsOnPage];
        } else {
          console.warn("Data yang diterima bukan array, loop dihentikan.");
          break;
        }
      }
    } catch (error) {
      console.error("Gagal mengambil data Unit Kerja:", error);
      return [];
    }

    return allUnits;
  },
  getBerita: async (params: {
    page: string;
    search?: string;
    unitKerjaId?: string;
  }) => {
    const queryParams: Record<string, string> = { page: params.page };
    if (params.search) {
      queryParams.search = params.search;
    }
    if (params.unitKerjaId) {
      queryParams.unit_kerja_id = params.unitKerjaId;
    }

    return axiosInstance.get(`${endpoint.ADMIN}/berita`, {
      params: queryParams,
    });
  },
  getJenisKehadiran: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-kehadiran`, {
      params: {
        page: page,
      },
    }),

  getDasboardAdmin: (params: any = {}) => {
    const { unit_kerja_id } = params;

    const final_unit_id = unit_kerja_id || "041001";

    return axiosInstance.get(`${endpoint.ADMIN}/dashboard`, {
      params: {
        unit_kerja_id: final_unit_id,
      },
    });
  },

  getPegawaiAdminPage: (params?: any) => {
    const cleanParams: Record<string, any> = { ...params };

    Object.keys(cleanParams).forEach((key) => {
      const K = key;
      if (!cleanParams[K] || cleanParams[K] === "semua") {
        delete cleanParams[K];
      }
    });

    return axiosInstance.get(`${endpoint.ADMIN}/pegawai`, {
      params: cleanParams,
    });
  },
  getJabatanStrukturalReferensi: (page: any, search: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/jabatan-struktural`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getJabatanFungsional: (page?: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/jabatan-fungsional`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getJabatanFungsionalSpesifik: (id?: string) =>
    axiosInstance.get(`${endpoint.ADMIN}/jabatan-fungsional/${id}`),
  getMasterPangkatReferensi: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/master-pangkat`, {
      params: {
        page: page,
      },
    }),
  getStatusPernikahanReferensi: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/status-pernikahan`, {
      params: {
        page: page,
      },
    }),

  getEselonReferensi: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/eselon`, {
      params: {
        page: page,
      },
    }),
  getJamKerjaReferensi: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jam-kerja`, {
      params: {
        page: page,
      },
    }),
  getJenisSertifikasiReferensi: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/master-jenis-sertifikasi`, {
      params: {
        page: page,
      },
    }),
  getJenisLuaran: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-luaran`, {
      params: {
        page: page,
      },
    }),
  getJenisPengabdian: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-pkm`, {
      params: {
        page: page,
      },
    }),
  getJenisPublikasi: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-publikasi`, {
      params: {
        page: page,
      },
    }),
  getJenisPelanggaran: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-pelanggaran`, {
      params: {
        page: page,
      },
    }),
  getMediaPublikasi: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/media-publikasi`, {
      params: {
        page: page,
      },
    }),
  getSettingKehadiran: () =>
    axiosInstance.get(`${endpoint.ADMIN}/setting-kehadiran`),
  getPenghargaan: (params: PenghargaanParams) => {
    const cleanParams: Record<string, any> = {
      page: params.page || 1,
    };

    if (params.search) {
      cleanParams.search = params.search;
    }
    if (params.unit_kerja_id && params.unit_kerja_id !== "semua") {
      cleanParams.unit_kerja_id = params.unit_kerja_id;
    }
    if (
      params.jabatan_fungsional_id &&
      params.jabatan_fungsional_id !== "semua"
    ) {
      cleanParams.jabatan_fungsional_id = params.jabatan_fungsional_id;
    }
    if (params.jenis_penghargaan && params.jenis_penghargaan !== "semua") {
      cleanParams.jenis_penghargaan = params.jenis_penghargaan;
    }

    return axiosInstance.get(`${endpoint.ADMIN}/datapenghargaan`, {
      params: cleanParams,
    });
  },

  getPelanggaran: (params: PelanggaranParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) {
      cleanParams.search = params.search;
    }
    if (params.unit_kerja && params.unit_kerja !== "semua") {
      cleanParams.unit_kerja_id = params.unit_kerja;
    }
    if (params.jabatan_fungsional && params.jabatan_fungsional !== "semua") {
      cleanParams.jabatan_fungsional_id = params.jabatan_fungsional;
    }
    if (params.jenis_pelanggaran && params.jenis_pelanggaran !== "semua") {
      cleanParams.jenis_pelanggaran_id = params.jenis_pelanggaran;
    }

    return axiosInstance.get(`${endpoint.ADMIN}/datapelanggaran`, {
      params: cleanParams,
    });
  },

  getJenisPenghargaanAktifitas: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-penghargaan`, {
      params: {
        page: page,
      },
    }),

  getStatus: () => axiosInstance.get(`${endpoint.ADMIN}/status-aktif`),

  getParentUnitSelect: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/unit-kerja`, {
      params: {
        page: page,
      },
    }),

  getAgama: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/agama`, {
      params: {
        page: page,
      },
    }),

  getStatusPernikahan: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/status-pernikahan`, {
      params: {
        page: page,
      },
    }),

  getSukuAll: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/suku`, {
      params: {
        page: page,
      },
    }),

  getGolonganDarah: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/golongan-darah`, {
      params: {
        page: page,
      },
    }),

  getMonittoringKehadiran: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/monitoring-presensi`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getInputKehadiran: (params: InputKehadiranParams) => {
    const cleanParams: Record<string, any> = { ...params };

    Object.keys(cleanParams).forEach((key) => {
      const K = key as keyof InputKehadiranParams;
      if (!cleanParams[K] || cleanParams[K] === "semua") {
        delete cleanParams[K];
      }
    });

    return axiosInstance.get(`${endpoint.ADMIN}/input-presensi`, {
      params: cleanParams,
    });
  },
  getPengajuanIzinAdmin: (params: PengajuanIzinParams) => {
    const cleanParams: Record<string, any> = { ...params };

    Object.keys(cleanParams).forEach((key) => {
      if (
        cleanParams[key] === "" ||
        cleanParams[key] === "semua" ||
        cleanParams[key] === null
      ) {
        delete cleanParams[key];
      }
    });

    return axiosInstance.get(`${endpoint.ADMIN}/validasi-izin`, {
      params: cleanParams,
    });
  },
  getPengajuanCutiAdmin: (params: PengajuanCutiParams) => {
    const cleanParams: Record<string, any> = { ...params };

    Object.keys(cleanParams).forEach((key) => {
      if (
        cleanParams[key] === "" ||
        cleanParams[key] === "semua" ||
        cleanParams[key] === null
      ) {
        delete cleanParams[key];
      }
    });

    return axiosInstance.get(`${endpoint.ADMIN}/validasi-cuti`, {
      params: cleanParams,
    });
  },

  getRumpunBidangIlmu: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/rumpun-bidang-ilmu`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getJenjangPendidikan: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenjang-pendidikan`, {
      params: {
        page: page,
      },
    }),
  getJenisKenaikanPangkat: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-kenaikan-pangkat`, {
      params: {
        page: page,
      },
    }),
  getBankPelangkap: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/bank`, {
      params: {
        page: page,
      },
    }),
  getMonitoringValidasiData: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/monitoring/validasi`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getKeluargaValidasiData: (params: {
    page: any;
    search?: string;
    unit_kerja?: string;
    hubungan?: string;
    jabatan_fungsional?: string;
    status?: string;
  }) =>
    axiosInstance.get(`${endpoint.ADMIN}/data-keluarga`, {
      params,
    }),
  getPangkatValidasiData: (params: PangkatParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.pangkat) cleanParams.pangkat = params.pangkat;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/datapangkatadm`, {
      params: cleanParams,
    });
  },
  getJabatanStrukturalValidasiData: (params: JabatanStrukturalParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.jabatan_struktural)
      cleanParams.jabatan_struktural = params.jabatan_struktural;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/datajabatanstrukturaladm`, {
      params: cleanParams,
    });
  },
  getJabatanFungsionalValidasiData: (params: JabatanFungsionalParams) => {
    const queryParams: any = { page: params.page || 1 };

    if (params.search) {
      queryParams.search = params.search;
    }
    if (params.unit_kerja && params.unit_kerja !== "semua") {
      queryParams.unit_kerja = params.unit_kerja;
    }
    if (params.status_pengajuan && params.status_pengajuan !== "semua") {
      queryParams.status_pengajuan = params.status_pengajuan;
    }
    if (params.jabatan_fungsional && params.jabatan_fungsional !== "semua") {
      queryParams.jabatan_fungsional = params.jabatan_fungsional;
    }

    return axiosInstance.get(`${endpoint.ADMIN}/datajabatanfungsionaladm`, {
      params: queryParams,
    });
  },
  getJabatanAkademikValidasiData: (params: JabatanAkademikParams) => {
    const cleanParams: Record<string, any> = { page: params.page || "1" };

    if (params.search) cleanParams.search = params.search;

    if (params.unit_kerja_id) {
      cleanParams.unit_kerja_id = params.unit_kerja_id;
    }
    if (params.jabatan_akademik_id) {
      cleanParams.jabatan_akademik_id = params.jabatan_akademik_id;
    }
    if (params.status_pengajuan) {
      cleanParams.status_pengajuan = params.status_pengajuan;
    }

    return axiosInstance.get(`${endpoint.ADMIN}/datajabatanakademikadm`, {
      params: cleanParams,
    });
  },
  getPendidikanFormalValidasiData: (params: PendidikanFormalParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.jenjang_pendidikan)
      cleanParams.jenjang_pendidikan = params.jenjang_pendidikan;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/datapendidikanformaladm`, {
      params: cleanParams,
    });
  },
  getTesKompetensi: (params: TesKompetensiParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.jenis_tes) cleanParams.jenis_tes = params.jenis_tes;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/datariwayattesadm`, {
      params: cleanParams,
    });
  },
  getPenghargaanValidasiData: (params: PenghargaanParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.jabatan_fungsional)
      cleanParams.jabatan_fungsional = params.jabatan_fungsional;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/validasi-penghargaan`, {
      params: cleanParams,
    });
  },
  getOrganisasiValidasiData: (params: OrganisasiParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.jabatan_fungsional)
      cleanParams.jabatan_fungsional = params.jabatan_fungsional;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/dataorganisasi`, {
      params: cleanParams,
    });
  },
  getHubunganKerjaValidasiData: (params: HubunganKerjaParams) => {
    const cleanParams: Record<string, any> = { page: params.page || "1" };

    if (params.search) cleanParams.search = params.search;

    if (params.unit_kerja_id) {
      cleanParams.unit_kerja_id = params.unit_kerja_id;
    }
    if (params.jabatan_fungsional_id) {
      cleanParams.jabatan_fungsional_id = params.jabatan_fungsional_id;
    }
    if (params.status_pengajuan) {
      cleanParams.status_pengajuan = params.status_pengajuan;
    }

    return axiosInstance.get(`${endpoint.ADMIN}/datahubungankerjaadm`, {
      params: cleanParams,
    });
  },
  getSertifikasiValidasiData: (params: SertifikasiParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.jenis_sertifikasi)
      cleanParams.jenis_sertifikasi = params.jenis_sertifikasi;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/datasertifikasiadm`, {
      params: cleanParams,
    });
  },
  getRiwayatPekerjaanValidasiData: (params: RiwayatPekerjaanParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.jenis_pekerjaan)
      cleanParams.jenis_pekerjaan = params.jenis_pekerjaan;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/datariwayatpekerjaanadm`, {
      params: cleanParams,
    });
  },
  getJenisIzinReferensi: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-izin`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getDataMonitoringKegiatan: (params: MonitoringKegiatanParams) => {
    const cleanParams: Record<string, any> = { ...params };

    Object.keys(cleanParams).forEach((key) => {
      const K = key as keyof MonitoringKegiatanParams;
      if (!cleanParams[K]) {
        delete cleanParams[K];
      }
    });

    return axiosInstance.get(`${endpoint.ADMIN}/monitoring-kegiatan`, {
      params: cleanParams,
    });
  },
  getDataMonitoringPresensi: (params: MonitoringPresensiParams) => {
    const cleanParams: Record<string, any> = { ...params };

    Object.keys(cleanParams).forEach((key) => {
      const K = key as keyof MonitoringPresensiParams;
      if (!cleanParams[K]) {
        delete cleanParams[K];
      }
    });

    return axiosInstance.get(`${endpoint.ADMIN}/monitoring-presensi`, {
      params: cleanParams,
    });
  },
  getRekapKehadiran: (params: RekapKehadiranParams) => {
    // Salin parameter untuk menghindari modifikasi objek asli
    const cleanParams: Record<string, any> = { ...params };

    // Hapus parameter yang kosong atau null agar tidak dikirim ke API
    Object.keys(cleanParams).forEach((key) => {
      const K = key as keyof RekapKehadiranParams;
      if (!cleanParams[K]) {
        delete cleanParams[K];
      }
    });

    return axiosInstance.get(`${endpoint.ADMIN}/rekapitulasi/kehadiran`, {
      params: cleanParams,
    });
  },
  getKemampuanBahasa: (params: KemampuanBahasaParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.bahasa) cleanParams.bahasa = params.bahasa;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/datakemampuanbahasa`, {
      params: cleanParams,
    });
  },
  getDiklatValidasiData: (params: DiklatParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.jenis_diklat) cleanParams.jenis_diklat = params.jenis_diklat;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/pegawai/riwayat-diklat`, {
      params: cleanParams,
    });
  },
  getJenisJabatanStruktural: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-jabatan-struktural`, {
      params: {
        page: page,
      },
    }),
  getJabatanStrukturalById: (id?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jabatan-struktural/${id}`),

  getBeritaSelect: () => axiosInstance.get(`${endpoint.ADMIN}/berita`),

  // for detail
  getPegawaiDetailAdminPage: (idPegawai: string) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/` + idPegawai),

  getBeritaSelectwithParams: (id: number | string) =>
    axiosInstance.get(`${endpoint.ADMIN}/berita/` + id),

  getDetailPenghargaan: (id: number | string) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapenghargaan/` + id),

  getDetailPelanggaran: (id: number | string) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapelanggaran/` + id),

  getDetailUnitKerja: (id: number | string) =>
    axiosInstance.get(`${endpoint.ADMIN}/unit-kerja/` + id),

  getSuku: (idSuku: string) =>
    axiosInstance.get(`${endpoint.ADMIN}/suku/` + idSuku),

  getDaftarRoleID: () => axiosInstance.get(`${endpoint.ADMIN}/role`),

  getSukuParams: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/suku`, {
      params: {
        page: page,
      },
    }),

  // detail pegawai
  getPangkatDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-pangkat`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getJabatanStrukturalDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(
      `${endpoint.ADMIN}/pegawai/${id}/riwayat-jabatan-struktural`,
      {
        params: {
          page: page,
          search: search,
        },
      }
    ),
  getJabatanAkademikDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(
      `${endpoint.ADMIN}/pegawai/${id}/riwayat-jabatan-akademik`,
      {
        params: {
          page: page,
          search: search,
        },
      }
    ),
  getHubunganKerjaDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(
      `${endpoint.ADMIN}/pegawai/${id}/riwayat-hubungan-kerja`,
      {
        params: {
          page: page,
          search: search,
        },
      }
    ),
  getPelanggaranDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-pelanggaran`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getSertifikasiDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-sertifikasi`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getTesDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-tes`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getDiklatDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-diklat`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getPendidikanFormalDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(
      `${endpoint.ADMIN}/pegawai/${id}/riwayat-pendidikan-formal`,
      {
        params: {
          page: page,
          search: search,
        },
      }
    ),
  getRiwayatPekerjaanDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-pekerjaan`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getRiwayatPresensiDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-presensi`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getPenghargaanDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-penghargaan`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getOrganisasiDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-organisasi`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getKemampuanBahasaDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(
      `${endpoint.ADMIN}/pegawai/${id}/riwayat-kemampuan-bahasa`,
      {
        params: {
          page: page,
          search: search,
        },
      }
    ),
  getCutiDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-cuti`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getIzinDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/${id}/riwayat-izin`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getJabatanFungsionalDetailAdmin: (id?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/datajabatanfungsionaladm/${id}`),
  getJabatanStrukturalDetailAdmin: (id?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/datajabatanstrukturaladm/${id}`),
  getPangkatDetailAdmin: (id?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapangkatadm/${id}`),
  getSertifikasiDetailAdmin: (id?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/datasertifikasiadm/${id}`),
  getTesDetailAdmin: (id?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/datariwayattesadm/${id}`),
  getPenghargaanDetailAdmin: (id?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/validasi-penghargaan/${id}`),
  getKemampuanBahasaDetailAdmin: (id?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/datakemampuanbahasa/${id}`),
  getOrganisasiDetailAdmin: (id?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/dataorganisasi/${id}`),
  getProfileAdmin: () => axiosInstance.get(`${endpoint.ADMIN}/profiles`),
  getHubunganKerjaDetail: (id: string) =>
    axiosInstance.get(`${endpoint.ADMIN}/datahubungankerjaadm/${id}`),
  getJabatanAkademikDetail: (id: string) =>
    axiosInstance.get(`${endpoint.ADMIN}/datajabatanakademikadm/${id}`),
  getPendidikanFormalDetail: (id: string) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapendidikanformaladm/${id}`),
  getRiwayatPekerjaanDetail: (id: string) =>
    axiosInstance.get(`${endpoint.ADMIN}/datariwayatpekerjaanadm/${id}`),
  getPermohonanCutiDetail: (id: string) =>
    axiosInstance.get(`${endpoint.ADMIN}/validasi-cuti/${id}`),
  getPermohonanIzinDetail: (id: string) =>
    axiosInstance.get(`${endpoint.ADMIN}/validasi-izin/${id}`),
  getRole: () => axiosInstance.get(`${endpoint.ADMIN}/role`),
  getDiklatDetailAdmin: (id: string) => {
    return axiosInstance.get(`${endpoint.ADMIN}/pegawai/riwayat-diklat/${id}`);
  },
  getGelarAkademik: (params: GelarAkademikParams) => {
    return axiosInstance.get(`${endpoint.ADMIN}/gelar-akademik`, {
      params,
    });
  },
};

export default adminServices;

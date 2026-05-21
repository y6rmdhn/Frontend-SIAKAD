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

import { responseParams } from "@/types/response.params";
type HubunganKerjaMonitoringParams = {
  page?: string;
  search?: string;
  unit_kerja?: string; // Diperbaiki: Tanpa _id
  hubungan_kerja?: string; // Diperbaiki: Tanpa _id
  status_masa_kerja?: string;
  level?: string; // Menambahkan parameter 'level' sesuai screenshot
};

const adminServices = {
  getProfilePegawai: () => axiosInstance.get(`${endpoint.PEGAWAI}/profile`),
  searchPegawai: (params?: {
    search?: string;
    is_dropdown?: boolean;
    page?: number;
  }) => axiosInstance.get(`${endpoint.PEGAWAI}`, { params }),
  getStatusAktif: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
  }) =>
    axiosInstance.get(`${endpoint.ADMIN}/status-aktif`, {
      params,
    }),
  getHubunganKerjaValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-hubungan-kerja/`, {
      params,
    });
  },
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
  getUnitKerja: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
  }) =>
    axiosInstance.get(`${endpoint.MASTER}/unit-kerja`, {
      params,
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
  getJenisSk: (params?: any) =>
    axiosInstance.get(`${endpoint.MASTER}/jenis-sk`, {
      params,
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
  getJabatanStrukturalReferensi: (params?: any) =>
    axiosInstance.get(`${endpoint.MASTER}/jabatan-struktural`, {
      params,
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
  getJenisSertifikasiReferensi: (params?: any) =>
    axiosInstance.get(`${endpoint.MASTER}/jenis-sertifikasi`, {
      params,
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
    axiosInstance.get(`${endpoint.ABSENSI}/setting-presensi`),
  getPenghargaan: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.ADMIN}/data-penghargaan`, {
      params,
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

  getRumpunBidangIlmu: (params?: any) =>
    axiosInstance.get(`${endpoint.MASTER}/rumpun-bidang-ilmu`, {
      params,
    }),
  getJenjangPendidikan: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenjang-pendidikan`, {
      params: {
        page: page,
      },
    }),
  getJenisKenaikanPangkat: (params?: any) =>
    axiosInstance.get(`${endpoint.MASTER}/jenis-kenaikan-pangkat`, {
      params,
    }),
  getBankPelangkap: (page: any) =>
    axiosInstance.get(`${endpoint.MASTER}/bank`, {
      params: {
        page: page,
      },
    }),
  getMasterBahasa: (params?: any) =>
    axiosInstance.get(`${endpoint.MASTER}/bahasa`, {
      params,
    }),
  getMonitoringValidasiData: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/monitoring/validasi`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getKeluargaValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-keluarga`, {
      params,
    }),
  getPangkatValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-pangkat`, {
      params,
    });
  },
  getJabatanStrukturalValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-jabatan-struktural`, {
      params,
    });
  },
  getJabatanFungsionalValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-jabatan-fungsional`, {
      params,
    });
  },
  getJabatanAkademikValidasiData: (params: responseParams) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/datajabatanakademikadm`, {
      params: cleanParams,
    });
  },
  getPendidikanFormalValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-pendidikan-formal`, {
      params,
    });
  },
  getTesKompetensi: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-test`, {
      params,
    });
  },
  getPenghargaanValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-penghargaan`, {
      params,
    });
  },
  getOrganisasiValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-organisasi`, {
      params,
    });
  },
  getSertifikasiValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-sertifikasi`, {
      params,
    });
  },
  getRiwayatPekerjaanValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-riwayat-pekerjaan`, {
      params,
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
  getKemampuanBahasa: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-kemampuan-bahasa`, {
      params,
    });
  },
  getDiklatValidasiData: (params?: {
    is_dropdown?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    unit_kerja_id?: string;
    start_end?: string;
    end_date?: string;
  }) => {
    return axiosInstance.get(`${endpoint.VALIDASI}/data-diklat`, {
      params,
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
  getPotongGaji: () =>
    axiosInstance.get(`${endpoint.ADMIN}/master-potongan-wajib`),

  getSukuParams: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/suku`, {
      params: {
        page: page,
      },
    }),
  getPegawaiPayrollParams: (search?: string) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai`, {
      params: {
        search: search,
      },
    }),

  // detail pegawai
  getPangkatDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined,
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
    search?: string | undefined,
  ) =>
    axiosInstance.get(
      `${endpoint.ADMIN}/pegawai/${id}/riwayat-jabatan-struktural`,
      {
        params: {
          page: page,
          search: search,
        },
      },
    ),
  getJabatanAkademikDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined,
  ) =>
    axiosInstance.get(
      `${endpoint.ADMIN}/pegawai/${id}/riwayat-jabatan-akademik`,
      {
        params: {
          page: page,
          search: search,
        },
      },
    ),
  getHubunganKerjaDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined,
  ) =>
    axiosInstance.get(
      `${endpoint.ADMIN}/pegawai/${id}/riwayat-hubungan-kerja`,
      {
        params: {
          page: page,
          search: search,
        },
      },
    ),
  getPelanggaranDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined,
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
    search?: string | undefined,
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
    search?: string | undefined,
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
    search?: string | undefined,
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
    search?: string | undefined,
  ) =>
    axiosInstance.get(
      `${endpoint.ADMIN}/pegawai/${id}/riwayat-pendidikan-formal`,
      {
        params: {
          page: page,
          search: search,
        },
      },
    ),
  getRiwayatPekerjaanDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined,
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
    search?: string | undefined,
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
    search?: string | undefined,
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
    search?: string | undefined,
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
    search?: string | undefined,
  ) =>
    axiosInstance.get(
      `${endpoint.ADMIN}/pegawai/${id}/riwayat-kemampuan-bahasa`,
      {
        params: {
          page: page,
          search: search,
        },
      },
    ),
  getCutiDetailPegawai: (
    page?: any,
    id?: string | undefined,
    search?: string | undefined,
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
    search?: string | undefined,
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
    axiosInstance.get(`${endpoint.VALIDASI}/data-hubungan-kerja/${id}`),
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
  getPeriodePayroll: () => {
    return axiosInstance.get(`${endpoint.ADMIN}/payroll/periods`);
  },
  getSlipGajiByPeriode: (id: string) => {
    return axiosInstance.get(`${endpoint.ADMIN}/payroll/periods/${id}`);
  },
  getDetailSlipGaji: (id: string) => {
    return axiosInstance.get(`${endpoint.ADMIN}/payroll/slips/${id}`);
  },
  printSlipGajiBulk: (id: string, format: any) => {
    return axiosInstance.get(
      `${endpoint.ADMIN}/payroll/periods/${id}/print-bulk`,
      {
        params: { format },
        responseType: "blob", // <-- TAMBAHKAN INI
      },
    );
  },
  // ─── Pelaksanaan Pendidikan ─────────────────────────────────────────────────
  getBahanAjarValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-bahan-ajar`, { params }),
  getDataSeringValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-sering`, { params }),
  getOrasiIlmiahValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-orasi-ilmiah`, { params }),
  getTugasTambahanValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-tugas-tambahan`, { params }),

  // ─── Pelaksanaan Penelitian ──────────────────────────────────────────────────
  getPenelitianValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-penelitian`, { params }),
  getPublikasiValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-publikasi`, { params }),
  getPatenValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-paten`, { params }),

  // ─── Pelaksanaan Pengabdian ──────────────────────────────────────────────────
  getPengabdianValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-pengabdian`, { params }),
  getPembicaraValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-pembicara`, { params }),
  getJabatanStrukturalPengabdianValidasiData: (params?: any) =>
    axiosInstance.get(
      `${endpoint.VALIDASI}/data-jabatan-struktural-pengabdian`,
      { params },
    ),

  // ─── Penunjang ───────────────────────────────────────────────────────────────
  getPenunjangLainValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-penunjang-lainnya`, {
      params,
    }),

  // ─── Kepegawaian: Homebase ───────────────────────────────────────────────────
  getHomebaseValidasiData: (params?: any) =>
    axiosInstance.get(`${endpoint.VALIDASI}/data-homebase`, { params }),
};

export default adminServices;

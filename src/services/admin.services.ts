import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import {
  HubunganKerjaParams,
  JabatanAkademikParams,
  JabatanFungsionalParams,
  JabatanStrukturalParams,
  KemampuanBahasaParams,
  OrganisasiParams,
  PangkatParams,
  PenghargaanParams,
  SertifikasiParams,
  TesKompetensiParams,
} from "@/types";

const adminServices = {
  getStatusAktif: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/status-aktif`, {
      params: {
        page: page,
      },
    }),
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
  getBerita: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/berita`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getJenisKehadiran: (page?: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-kehadiran`, {
      params: {
        page: page,
      },
    }),

  getDasboardAdmin: () =>
    axiosInstance.get(`${endpoint.ADMIN}/dashboard?unit_kerja_id=041001`),

  getPegawaiAdminPage: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai`, {
      params: {
        page: page,
        search: search,
      },
    }),
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
  getPenghargaan: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapenghargaan`, {
      params: {
        page: page,
      },
    }),

  getPelanggaran: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapelanggaran`, {
      params: {
        page: page,
      },
    }),

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
  getInputKehadiran: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/input-presensi`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getPengajuanIzinAdmin: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/validasi-izin`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getPengajuanCutiAdmin: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/validasi-cuti`, {
      params: {
        page: page,
        search: search,
      },
    }),

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
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.jabatan_akademik)
      cleanParams.jabatan_akademik = params.jabatan_akademik;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

    return axiosInstance.get(`${endpoint.ADMIN}/datajabatanakademikadm`, {
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
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) cleanParams.search = params.search;
    if (params.unit_kerja) cleanParams.unit_kerja = params.unit_kerja;
    if (params.jabatan_fungsional)
      cleanParams.jabatan_fungsional = params.jabatan_fungsional;
    if (params.status_pengajuan)
      cleanParams.status_pengajuan = params.status_pengajuan;

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
  getJenisIzinReferensi: (page: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-izin`, {
      params: {
        page: page,
        search: search,
      },
    }),
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
  getPegawaiDetailAdminPage: (idPegawai: number) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/` + idPegawai),

  getBeritaSelectwithParams: (id: number) =>
    axiosInstance.get(`${endpoint.ADMIN}/berita/` + id),

  getDetailPenghargaan: (id: number | string) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapenghargaan/` + id),

  getDetailPelanggaran: (id: number | string) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapelanggaran/` + id),

  getDetailUnitKerja: (id: number) =>
    axiosInstance.get(`${endpoint.ADMIN}/unit-kerja/` + id),

  getSuku: (idSuku: number) =>
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
};

export default adminServices;

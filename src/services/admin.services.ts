import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

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
  getBerita: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/berita`, {
      params: {
        page: page,
      },
    }),

  getDasboardAdmin: () =>
    axiosInstance.get(`${endpoint.ADMIN}/dashboard?unit_kerja_id=041001`),

  getPegawaiAdminPage: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai`, {
      params: {
        page: page,
      },
    }),
  getJabatanStrukturalReferensi: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/jabatan-struktural`, {
      params: {
        page: page,
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
  getSettingKehadiran: (page: any) =>
    axiosInstance.get(`${endpoint.ADMIN}/setting-kehadiran`, {
      params: {
        page: page,
      },
    }),
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
};

export default adminServices;

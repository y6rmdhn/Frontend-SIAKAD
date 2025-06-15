import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const adminServices = {
  getStatusAktif: (page?) =>
    axiosInstance.get(`${endpoint.ADMIN}/status-aktif`, {
      params: {
        page: page,
      },
    }),
  getUnitKerja: (page?) =>
    axiosInstance.get(`${endpoint.ADMIN}/unit-kerja`, {
      params: {
        page: page,
      },
    }),
  getHubunganKerja: (page?) =>
    axiosInstance.get(`${endpoint.ADMIN}/hubungan-kerja`, {
      params: {
        page: page,
      },
    }),
  getJabatanAkademik: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/jabatan-akademik`, {
      params: {
        page: page,
      },
    }),
  getJenisCuti: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/daftar-cuti`, {
      params: {
        page: page,
      },
    }),
  getJenisSk: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-sk`, {
      params: {
        page: page,
      },
    }),
  getJenisTes: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-test`, {
      params: {
        page: page,
      },
    }),
  getOutputPenelitian: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/output-penelitian`, {
      params: {
        page: page,
      },
    }),
  getJenisHari: () => axiosInstance.get(`${endpoint.ADMIN}/jenis-hari`),
  getBerita: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/berita`, {
      params: {
        page: page,
      },
    }),

  getDasboardAdmin: () =>
    axiosInstance.get(`${endpoint.ADMIN}/dashboard?unit_kerja_id=041001`),

  getPegawaiAdminPage: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai`, {
      params: {
        page: page,
      },
    }),
  getJabatanStrukturalReferensi: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/jabatan-struktural`, {
      params: {
        page: page,
      },
    }),
  getMasterPangkatReferensi: (page?) =>
    axiosInstance.get(`${endpoint.ADMIN}/master-pangkat`, {
      params: {
        page: page,
      },
    }),
  getStatusPernikahanReferensi: (page?) =>
    axiosInstance.get(`${endpoint.ADMIN}/status-pernikahan`, {
      params: {
        page: page,
      },
    }),

  getEselonReferensi: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/eselon`, {
      params: {
        page: page,
      },
    }),
  getJamKerjaReferensi: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/jam-kerja`, {
      params: {
        page: page,
      },
    }),
  getJenisSertifikasiReferensi: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/master-jenis-sertifikasi`, {
      params: {
        page: page,
      },
    }),
  getJenisLuaran: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-luaran`, {
      params: {
        page: page,
      },
    }),
  getJenisPengabdian: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-pkm`, {
      params: {
        page: page,
      },
    }),
  getJenisPublikasi: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-publikasi`, {
      params: {
        page: page,
      },
    }),
  getJenisPelanggaran: (page?) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-pelanggaran`, {
      params: {
        page: page,
      },
    }),
  getMediaPublikasi: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/media-publikasi`, {
      params: {
        page: page,
      },
    }),
  getSettingKehadiran: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/setting-kehadiran`, {
      params: {
        page: page,
      },
    }),
  getPenghargaan: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapenghargaan`, {
      params: {
        page: page,
      },
    }),

  getPelanggaran: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapelanggaran`, {
      params: {
        page: page,
      },
    }),

  getJenisPenghargaanAktifitas: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/jenis-penghargaan`, {
      params: {
        page: page,
      },
    }),

  getStatus: () => axiosInstance.get(`${endpoint.ADMIN}/status-aktif`),

  getParentUnitSelect: (page) =>
    axiosInstance.get(`${endpoint.ADMIN}/unit-kerja`, {
      params: {
        page: page,
      },
    }),

  // for detail
  getPegawaiDetailAdminPage: (idPegawai) =>
    axiosInstance.get(`${endpoint.ADMIN}/pegawai/` + idPegawai),

  getDetailPenghargaan: (id) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapenghargaan/` + id),

  getDetailPelanggaran: (id) =>
    axiosInstance.get(`${endpoint.ADMIN}/datapelanggaran/` + id),

  getSuku: (idSuku: number) =>
    axiosInstance.get(`${endpoint.ADMIN}/suku/` + idSuku),

  getDaftarRoleID: () => axiosInstance.get(`${endpoint.ADMIN}/role`),

  getSukuParams: (page?) =>
    axiosInstance.get(`${endpoint.ADMIN}/suku`, {
      params: {
        page: page,
      },
    }),
};

export default adminServices;

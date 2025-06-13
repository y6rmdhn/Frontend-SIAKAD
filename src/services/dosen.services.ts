import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const dosenServices = {
  //   keluarga
  getDataAnak: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/anak`, {
      params: {
        page: page,
      },
    }),
  getDataAnakWithoutParam: () => axiosInstance.get(`${endpoint.DOSEN}/anak`),

  getDataAnakDetail: (id) => axiosInstance.get(`${endpoint.DOSEN}/anak/` + id),

  getDataOrangtua: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/orangtua`, {
      params: {
        page: page,
      },
    }),
  getDataOrangtuaWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/orangtua`),

  getDataOrangtuaDetail: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/orangtua/` + id),

  getDataPasangan: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/pasangan`, {
      params: {
        page: page,
      },
    }),
  getDataPasanganWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/pasangan`),
  getDataPasanganDetail: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/pasangan/` + id),

  // kepegawaian
  getPangkat: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/pangkat`, {
      params: {
        page: page,
      },
    }),
  getDataPangkatWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/pangkat`),
  getDataPangkatDetail: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/pangkat/` + id),

  getJabatanAkademik: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanakademik`, {
      params: {
        page: page,
      },
    }),

  getJabatanAkademikDetail: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanakademik/` + id),

  getDataJabatanakademikWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanakademik`),

  getJabatanFungsional: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanfungsional`, {
      params: {
        page: page,
      },
    }),
  getJabatanFungsionalDetail: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanfungsional/` + id),
  getDataJabatanakfungsionalWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanfungsional`),

  getJabatanStruktural: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanstruktural`, {
      params: {
        page: page,
      },
    }),
  getJabatanStrukturalDetail: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanstruktural/` + id),
  getDataJabatanakstrukturalWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanstruktural`),

  getHubunganKerja: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/hubungankerja`, {
      params: {
        page: page,
      },
    }),
  getHubunganKerjaDetail: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/hubungankerja/` + id),
  getDataHubunganKerjaWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/hubungankerja`),

  //  kualifikasi
  getDiklat: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/data-diklat`, {
      params: {
        page: page,
      },
    }),
  getDiklatDetail: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/data-diklat/` + id),
  getDataDiklatWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/data-diklat`),

  getRiwayatPekerjaan: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/data-riwayat-pekerjaan-dosen`, {
      params: {
        page: page,
      },
    }),

  // Pengenbangan Diri
  getKemampuanBahasa: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/datakemampuanbahasa`, {
      params: {
        page: page,
      },
    }),
  getKemampuanBahasaDetail: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/datakemampuanbahasa/` + id),
  getDataKemampuanBahasaWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/datakemampuanbahasa`),

  getOrganisasi: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/dataorganisasi`, {
      params: {
        page: page,
      },
    }),
  getOrganisasiDetail: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/dataorganisasi/` + id),
  getDataOrganisasiWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/datakemampuanbahasa`),

  // riwayat kehadiran
  getDataRiwayatKehadiran: (tahun) =>
    axiosInstance.get(`${endpoint.DOSEN}/riwayat-kehadiran`, {
      params: {
        tahun: tahun,
      },
    }),
  getDataDetailRiwayatKehadiran: (tahun, bulan) =>
    axiosInstance.get(`${endpoint.DOSEN}/riwayat-kehadiran/detail`, {
      params: {
        tahun: tahun,
        bulan: bulan,
      },
    }),
  getStatusAbsen: () => axiosInstance.get(`${endpoint.DOSEN}/absensi/status`),

  getHistoryAbsensi: () =>
    axiosInstance.get(`${endpoint.DOSEN}/absensi/history`),

  //   kualifikasi
  getDataSertifikasiDosen: (page) =>
    axiosInstance.get(`${endpoint.DOSEN}/datasertifikasidosen`, {
      params: {
        page: page,
      },
    }),
  getDetailDataSertifikasiDosen: (id) =>
    axiosInstance.get(`${endpoint.DOSEN}/datasertifikasidosen/` + id),
};

export default dosenServices;

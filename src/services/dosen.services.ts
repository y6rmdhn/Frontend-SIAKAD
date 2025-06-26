import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const dosenServices = {
  //   keluarga
  getDataAnak: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/anak`, {
      params: {
        page: page,
      },
    }),
  getDataAnakWithoutParam: () => axiosInstance.get(`${endpoint.DOSEN}/anak`),

  getDataAnakDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/anak/` + id),

  getDataOrangtua: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/orangtua`, {
      params: {
        page: page,
      },
    }),
  getDataOrangtuaWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/orangtua`),

  getDataOrangtuaDetail: (id: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/orangtua/` + id),

  getDataPasangan: (page: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/pasangan`, {
      params: {
        page: page,
      },
    }),
  getDataPasanganWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/pasangan`),
  getDataPasanganDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/pasangan/` + id),

  // kepegawaian
  getPangkat: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/pangkat`, {
      params: {
        page: page,
      },
    }),
  getDataPangkatWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/pangkat`),
  getDataPangkatDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/pangkat/` + id),

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

  getJabatanFungsional: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanfungsional`, {
      params: {
        page: page,
      },
    }),
  getJabatanFungsionalDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanfungsional/` + id),
  getDataJabatanakfungsionalWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanfungsional`),

  getJabatanStruktural: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanstruktural`, {
      params: {
        page: page,
      },
    }),
  getJabatanStrukturalDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanstruktural/` + id),
  getDataJabatanakstrukturalWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/jabatanstruktural`),

  getHubunganKerja: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/hubungankerja`, {
      params: {
        page: page,
      },
    }),
  getHubunganKerjaDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/hubungankerja/` + id),
  getDataHubunganKerjaWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/hubungankerja`),

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

  getRiwayatPekerjaan: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/data-riwayat-pekerjaan-dosen`, {
      params: {
        page: page,
      },
    }),

  // Pengenbangan Diri
  getKemampuanBahasa: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/datakemampuanbahasa`, {
      params: {
        page: page,
      },
    }),
  getKemampuanBahasaDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/datakemampuanbahasa/` + id),
  getDataKemampuanBahasaWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/datakemampuanbahasa`),

  getOrganisasi: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/dataorganisasi`, {
      params: {
        page: page,
      },
    }),
  getOrganisasiDetail: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/dataorganisasi/` + id),
  getDataOrganisasiWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/dataorganisasi`),

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
  getStatusAbsen: () => axiosInstance.get(`${endpoint.DOSEN}/absensi/status`),

  getHistoryAbsensi: () =>
    axiosInstance.get(`${endpoint.DOSEN}/absensi/history`),

  //   kualifikasi
  getDataSertifikasiDosen: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/datasertifikasidosen`, {
      params: {
        page: page,
      },
    }),
  getDataTesDosen: (page: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/datariwayattes`, {
      params: {
        page: page,
      },
    }),
  getDetailDataSertifikasiDosen: (id: string | number) =>
    axiosInstance.get(`${endpoint.DOSEN}/datasertifikasidosen/` + id),

  getDetailDataTesDosen: (id: string | number) =>
    axiosInstance.get(`${endpoint.DOSEN}/datariwayattes/` + id),

  getDataDataSertifikasiWithoutParam: () =>
    axiosInstance.get(`${endpoint.DOSEN}/datasertifikasidosen`),

  // operasional
  getDataIzin: (page: any, search: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/pengajuan-izin-dosen`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getDataIzinWithoutParams: (id: number | string) =>
    axiosInstance.get(`${endpoint.DOSEN}/pengajuan-izin-dosen/` + id),

  getDataCuti: (page: any, search: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/pengajuan-cuti-dosen`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getDataBeritaUser: (page: any, search: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/berita-pegawai`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getDasboardUser: (
    tgl_mulai?: string | undefined,
    tgl_selesai?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.DOSEN}/dosen-dashboard`, {
      params: {
        tgl_mulai: tgl_mulai,
        tgl_selesai: tgl_selesai,
      },
    }),

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
    axiosInstance.get(`${endpoint.DOSEN}/jenis-jabatan-struktural`, {
      params: {
        page: page,
      },
    }),
  getHubunganKerjaSelect: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/hubungan-kerja`, {
      params: {
        page: page,
      },
    }),
  getStatusAktifSelect: (page?: any) =>
    axiosInstance.get(`${endpoint.DOSEN}/status-aktif`, {
      params: {
        page: page,
      },
    }),
};

export default dosenServices;

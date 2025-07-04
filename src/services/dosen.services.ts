import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";
import { AnakParams, BeritaParams, CutiParams, OrangtuaParams, PasanganParams } from "@/types";

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

  getRiwayatPekerjaan: (page?: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/data-riwayat-pekerjaan-dosen`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getPenghargaan: (page?: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/penghargaandosen`, {
      params: {
        page: page,
        search: search,
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
  getDataTesDosen: (page?: any) =>
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

  getDataCuti: (params: CutiParams) => {
    const cleanParams: Record<string, any> = { page: params.page || 1 };

    if (params.search) {
      cleanParams.search = params.search;
    }
    if (params.jenis_cuti && params.jenis_cuti !== "semua") {
      cleanParams.jenis_cuti_id = params.jenis_cuti;
    }
    if (params.jumlah_cuti && params.jumlah_cuti !== "semua") {
      cleanParams.jumlah_cuti = params.jumlah_cuti;
    }
    if (params.status_pengajuan && params.status_pengajuan !== "semua") {
      cleanParams.status_pengajuan = params.status_pengajuan;
    }

    return axiosInstance.get(`${endpoint.DOSEN}/pengajuan-cuti-dosen`, {
      params: cleanParams,
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
  getDataPendidikanFormalUser: (page?: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/pendidikanformaldosen`, {
      params: {
        page: page,
        search: search,
      },
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
    tahun?: number  // <-- Tambahkan parameter tahun
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
    tgl_selesai?: string | undefined
  ) =>
    axiosInstance.get(`${endpoint.DOSEN}/dosen-dashboard`, {
      params: {
        tgl_mulai: tgl_mulai,
        tgl_selesai: tgl_selesai,
      },
    }),
  getDasboardGrafik: (
    tgl_mulai?: string | undefined,
    tgl_selesai?: string | undefined
  ) =>
    axiosInstance.get(
      `${endpoint.DOSEN}/dosen-dashboard/evaluasi-kinerja-chart`,
      {
        params: {
          tgl_mulai: tgl_mulai,
          tgl_selesai: tgl_selesai,
        },
      }
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
  getPengajuanCutiDosen: (page?: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/daftar-cuti`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getPengajuanIzinDosen: (page?: any, search?: string | undefined) =>
    axiosInstance.get(`${endpoint.DOSEN}/jenis-izin`, {
      params: {
        page: page,
        search: search,
      },
    }),
  getProfileUser: () => axiosInstance.get(`${endpoint.DOSEN}/profiles`),
  getLocation: () => axiosInstance.get(`${endpoint.DOSEN}/setting-kehadiran`),
  getPendidikanFormalDetail: (id: string) =>
    axiosInstance.get(`${endpoint.DOSEN}/pendidikanformaldosen/${id}`),
  getRiwayatPekerjaanDetail: (id: string) =>
    axiosInstance.get(`${endpoint.DOSEN}/data-riwayat-pekerjaan-dosen/${id}`),
  getPenghargaanDetail: (id: string) =>
    axiosInstance.get(`${endpoint.DOSEN}/penghargaandosen/${id}`),
  getBeritaDetail: (id: string) =>
    axiosInstance.get(`${endpoint.DOSEN}/berita/${id}`),
  getSlipGaji: () => axiosInstance.get(`${endpoint.DOSEN}/payroll/slips`),
  getSlipGajiDetail: (id: string) => {
    return axiosInstance.get(`${endpoint.DOSEN}/payroll/slips/${id}`);
  },
};

export default dosenServices;

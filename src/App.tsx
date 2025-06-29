import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";

// --- AWAL KONVERSI IMPOR ---
const LoginPage = lazy(() => import("./pages/auth/login"));
const DasboardPage = lazy(() => import("./pages/admin/dasboard"));
const PegawaiPage = lazy(() => import("./pages/admin/pegawai"));
const DataPegawaiPage = lazy(() => import("./pages/admin/dataPegawai"));
const EditDataPegawaiPage = lazy(() => import("./pages/admin/editdataPegawai"));
const HubunganKerjaPegawaiPage = lazy(
  () => import("./pages/admin/operasional/hubunganKerjaPegawai")
);
const SettingKehadiranPage = lazy(
  () => import("./pages/admin/operasional/kehadiran/settingKehadiran")
);
const ShiftKerjaPage = lazy(
  () => import("./pages/admin/operasional/kehadiran/shiftKerja")
);
const DataShiftKerjaPage = lazy(
  () => import("./pages/admin/operasional/kehadiran/dataShiftKerja")
);
const DaftarMonitoringKehadiranPage = lazy(
  () => import("./pages/admin/operasional/kehadiran/daftarMonitoringKehadiran")
);
const RekapKehadiranPage = lazy(
  () => import("./pages/admin/operasional/kehadiran/rekapKehadiran")
);
const InputKehadiranPage = lazy(
  () => import("./pages/admin/operasional/kehadiran/InputKehadiran")
);
const MonitoringRekapKehadiranPage = lazy(
  () => import("./pages/admin/operasional/monitoringKegiatan")
);
const MonitoringSisaCutiPage = lazy(
  () => import("./pages/admin/operasional/cuti/monitoringSisaCuti")
);
const PermohonanIzinPage = lazy(
  () => import("./pages/admin/operasional/cuti/permohonanIzin")
);
const PeriodeCutiPage = lazy(
  () => import("./pages/admin/operasional/cuti/periodeCuti")
);
const PermohonanCutiPage = lazy(
  () => import("./pages/admin/operasional/cuti/permohonanCuti")
);
const PelanggaranPage = lazy(
  () => import("./pages/admin/operasional/kompensasi/pelanggaran")
);
const DetailRiwayatPelanggaranPage = lazy(
  () => import("./pages/admin/operasional/kompensasi/detailRiwayatPelanggaran")
);
const DetailDataPelanggaranPage = lazy(
  () =>
    import(
      "./pages/admin/operasional/kompensasi/pelanggaran/detaildataPelanggaran"
    )
);
const EditDataPelanggaranPage = lazy(
  () =>
    import(
      "./pages/admin/operasional/kompensasi/pelanggaran/editdataPelanggaran"
    )
);
const DasboardPageUser = lazy(() => import("./pages/dasboard")); // Asumsi ini untuk user
const RiwayatKehadiranPage = lazy(() => import("./pages/riwayatKehadiran")); // Asumsi ini untuk user
const ModulePage = lazy(() => import("./pages/module"));
const ProfilPage = lazy(() => import("./pages/profil"));
const RiwayatPenghargaanPage = lazy(
  () =>
    import(
      "./pages/admin/operasional/kompensasi/penghargaan/riwayatPenghargaan"
    )
);
const DetailPenghargaanPage = lazy(
  () =>
    import("./pages/admin/operasional/kompensasi/penghargaan/detailPenghargaan")
);
const DetailDataPenghargaanPage = lazy(
  () =>
    import(
      "./pages/admin/operasional/kompensasi/penghargaan/detaildataPenghargaan"
    )
);
const EditDataPenghargaanPage = lazy(
  () =>
    import(
      "./pages/admin/operasional/kompensasi/penghargaan/editdataPenghargaan"
    )
);
const DokumenInternalPage = lazy(
  () => import("./pages/admin/operasional/kompensasi/dokumenInternal")
);
const DetailDokumenInternalPage = lazy(
  () => import("./pages/admin/operasional/kompensasi/detailDokumenInternal")
);
const DetailDataDokumenInternalPage = lazy(
  () =>
    import(
      "./pages/admin/operasional/kompensasi/dokumenInternal/detaildataDokumenInternal"
    )
);
const EditDataDokumenInternalPage = lazy(
  () =>
    import(
      "./pages/admin/operasional/kompensasi/dokumenInternal/editdataDokumenInternal"
    )
);
const SettingValidasiPage = lazy(
  () => import("./pages/admin/validasiData/settingValidasi")
);
const KeluargaPage = lazy(() => import("./pages/admin/validasiData/keluarga"));
const MonitoringPage = lazy(
  () => import("./pages/admin/validasiData/monitoring")
);
const HomebasePage = lazy(
  () => import("./pages/admin/validasiData/kepegawaian/homebase")
);
const HubunganKerjaKepegawaianPage = lazy(
  () =>
    import("./pages/admin/validasiData/kepegawaian/hubunganKerjaKepegawaian")
);
const DetailHubunganKerjaValidasiPage = lazy(
  () =>
    import(
      "./pages/admin/validasiData/kepegawaian/hubunganKerjaKepegawaian/detailhubunganKerjaKepegawaian"
    )
);
const JabatanAkademikPage = lazy(
  () => import("./pages/admin/validasiData/kepegawaian/jabatanAkademik")
);
const DetailJabatanAkademikValidasiPage = lazy(
  () =>
    import(
      "./pages/admin/validasiData/kepegawaian/jabatanAkademik/detailjabatanAkademik"
    )
);
const JabatanFungionalPage = lazy(
  () => import("./pages/admin/validasiData/kepegawaian/jabatanFungsional")
); // Typo: Fungsional
const DetailJabatanFungionalValidasiPage = lazy(
  () =>
    import(
      "./pages/admin/validasiData/kepegawaian/jabatanFungsional/detailjabatanFungsional"
    )
);
const JabatanStrukturalPage = lazy(
  () => import("./pages/admin/validasiData/kepegawaian/jabatanStruktural")
);
const DetailJabatanStrukturalValidasiPage = lazy(
  () =>
    import(
      "./pages/admin/validasiData/kepegawaian/jabatanStruktural/detailjabatanStruktural"
    )
);
const PangkatPage = lazy(
  () => import("./pages/admin/validasiData/kepegawaian/pangkat")
);
const DetailPangkatValidasiPage = lazy(
  () => import("./pages/admin/validasiData/kepegawaian/pangkat/detailPangkat")
);
const SertifikasiPage = lazy(
  () => import("./pages/admin/validasiData/kompetensi/sertifikasi")
);
const DetailSertifikasiValidasiPage = lazy(
  () =>
    import(
      "./pages/admin/validasiData/kompetensi/sertifikasi/detailSertifikasiValidasi"
    )
);
const TesPage = lazy(() => import("./pages/admin/validasiData/kompetensi/tes"));
const DetailTesValidasiPage = lazy(
  () => import("./pages/admin/validasiData/kompetensi/tes/detailTesValidasi")
);
const BahanAjarPage = lazy(
  () => import("./pages/admin/validasiData/pelaksanaanPendidikan/bahanAjar")
);
const DataseringPage = lazy(
  () => import("./pages/admin/validasiData/pelaksanaanPendidikan/datasering")
);
const OrasiIlmiahPage = lazy(
  () => import("./pages/admin/validasiData/pelaksanaanPendidikan/orasiIlmiah")
);
const TugasTambahanPage = lazy(
  () => import("./pages/admin/validasiData/pelaksanaanPendidikan/tugasTambahan")
);
const PatenPage = lazy(
  () => import("./pages/admin/validasiData/pelaksanaanPenelitian/paten")
);
const PenelitianPage = lazy(
  () => import("./pages/admin/validasiData/pelaksanaanPenelitian/penelitian")
);
const PublikasiPage = lazy(
  () => import("./pages/admin/validasiData/pelaksanaanPenelitian/publikasi")
);
const JabatanStrukturalKepegawaianPage = lazy(
  () =>
    import("./pages/admin/validasiData/pelaksanaanPengabdian/jabatanStruktural")
);
const PembicaraPage = lazy(
  () => import("./pages/admin/validasiData/pelaksanaanPengabdian/pembicara")
);
const PengabdianPage = lazy(
  () => import("./pages/admin/validasiData/pelaksanaanPengabdian/pengabdian")
);
const KemampuanBahasaPage = lazy(
  () => import("./pages/admin/validasiData/pengembangan/kemampuanBahasa")
);

const OrganisasiPage = lazy(
  () => import("./pages/admin/validasiData/pengembangan/organisasi")
);
const OrganisasiPenunjangPage = lazy(
  () => import("./pages/admin/validasiData/penunjang/organisasi")
);
const PenghargaanPenunjangPage = lazy(
  () => import("./pages/admin/validasiData/penunjang/penghargaan")
);
const PenunjangLainPage = lazy(
  () => import("./pages/admin/validasiData/penunjang/penunjangLain")
);
const KegiatanHarianPage = lazy(() => import("./pages/kegiatanHarian")); // Asumsi ini untuk user
const JenisLuaranPage = lazy(
  () => import("./pages/admin/referensi/aktifitas/jenisLuaran")
);
const JenisPelanggaranReferensiPage = lazy(
  () => import("./pages/admin/referensi/aktifitas/jenisPelanggaran")
);
const JenisPengabdianReferensiPage = lazy(
  () => import("./pages/admin/referensi/aktifitas/jenisPengabdian")
);
const JenisPenghargaanReferensiPage = lazy(
  () => import("./pages/admin/referensi/aktifitas/jenisPenghargaan")
);
const JenisPublikasiReferensiPage = lazy(
  () => import("./pages/admin/referensi/aktifitas/jenisPublikasi")
);
const JenisSertifikasiReferensiPage = lazy(
  () => import("./pages/admin/referensi/aktifitas/jenisSertifikasi")
);
const JenisTesReferensiPage = lazy(
  () => import("./pages/admin/referensi/aktifitas/jenisTes")
);
const OutputPenelitianReferensiPage = lazy(
  () => import("./pages/admin/referensi/aktifitas/outputPenelitian")
);
const JamKerjaReferensiPage = lazy(
  () => import("./pages/admin/referensi/kehadiran/jamKerja")
);
const JenisCutiReferensiPage = lazy(
  () => import("./pages/admin/referensi/kehadiran/jenisCuti")
);
const JenisHariReferensiPage = lazy(
  () => import("./pages/admin/referensi/kehadiran/jenisHari")
);
const JenisIzinReferensiPage = lazy(
  () => import("./pages/admin/referensi/kehadiran/jenisIzin")
);
const JenisKehadiranReferensiPage = lazy(
  () => import("./pages/admin/referensi/kehadiran/jenisKehadiran")
);
const HariLiburReferensiPage = lazy(
  () => import("./pages/admin/referensi/kehadiran/hariLibur")
);
const BiodataPage = lazy(() => import("./pages/admin/DetailPegawai/Biodata")); // Perhatikan ada duplikasi nama, pastikan path unik atau rename
const DetailKeluargaPage = lazy(
  () => import("./pages/admin/DetailPegawai/Keluarga")
);
const CutiPage = lazy(() => import("./pages/operasional/pengajuan/cuti")); // Asumsi ini untuk user
const DetailCutiUserPage = lazy(
  () => import("./pages/operasional/pengajuan/cuti/detailCuti")
);
const DetailDataCutiUserPage = lazy(
  () => import("./pages/operasional/pengajuan/cuti/detaildataCuti")
);
const IzinPage = lazy(() => import("./pages/operasional/pengajuan/Izin")); // Asumsi ini untuk user
const DetailIzinUserPage = lazy(
  () => import("./pages/operasional/pengajuan/Izin/detailIzin")
);
const DetailDataIzinUserPage = lazy(
  () => import("./pages/operasional/pengajuan/Izin/detaildataIzin")
);
const BeritaOperasionalUserPage = lazy(
  () => import("./pages/operasional/berita")
);
const DetailBeritaUserPage = lazy(
  () => import("./pages/operasional/berita/detailBerita")
);
const DetailDataBeritaUserPage = lazy(
  () => import("./pages/operasional/berita/detaildataBerita")
);
const DetailDokumenInternalUserPage = lazy(
  () => import("./pages/operasional/dokumenInternal/detailDokumen")
);
const DokumenInternalUserPage = lazy(
  () => import("./pages/operasional/dokumenInternal/dokumen")
);
const DetailDataDokumenInternalUserPage = lazy(
  () => import("./pages/operasional/dokumenInternal/detaildataDokumen")
);
const KepegawaianHomebasePage = lazy(
  () => import("./pages/admin/DetailPegawai/kepegawaian/homebase")
);
const KepegawaianPangkatPage = lazy(
  () => import("./pages/admin/DetailPegawai/kepegawaian/pangkat")
);
const KepegawaianJabatanAkademikPage = lazy(
  () => import("./pages/admin/DetailPegawai/kepegawaian/jabatanAkademik")
);
const KepegawaianJabatanFungsionalPage = lazy(
  () => import("./pages/admin/DetailPegawai/kepegawaian/jabatanFungsional")
);
const KepegawaianJabatanStrukturalPage = lazy(
  () => import("./pages/admin/DetailPegawai/kepegawaian/jabatanStruktural")
);
const KepegawaianHubunganKerjaPage = lazy(
  () => import("./pages/admin/DetailPegawai/kepegawaian/hubunganKerja")
);
const KepegawaianPendidikanFormalPage = lazy(
  () => import("./pages/admin/DetailPegawai/kualifikasi/pendidikanFormal")
);
const KepegawaianDiklatPage = lazy(
  () => import("./pages/admin/DetailPegawai/kualifikasi/diklat")
);
const KepegawaianRiwayatPekerjaanPage = lazy(
  () => import("./pages/admin/DetailPegawai/kualifikasi/riwayatPekerjaan")
);
const KepegawaianRiwayatSertifikasiPage = lazy(
  () => import("./pages/admin/DetailPegawai/kompetensi/riwayatSertifikasi")
);
const KepegawaianRiwayatTesPage = lazy(
  () => import("./pages/admin/DetailPegawai/kompetensi/riwayatTes")
);
const KepegawaianPresensiPage = lazy(
  () => import("./pages/admin/DetailPegawai/presensi")
);
const KepegawaianPengajaranPage = lazy(
  () => import("./pages/admin/DetailPegawai/pendidikan/pengajaran")
);
const KepegawaianBimbinganMahasiswaPage = lazy(
  () => import("./pages/admin/DetailPegawai/pendidikan/bimbingan")
);
const KepegawaianTugasTambahanPage = lazy(
  () => import("./pages/admin/DetailPegawai/pendidikan/tugasTambahan")
);
const KepegawaianPengujianMahasiswaPage = lazy(
  () => import("./pages/admin/DetailPegawai/pendidikan/pengujianMahasiswa")
);
const KepegawaianVisitingscientistPage = lazy(
  () => import("./pages/admin/DetailPegawai/pendidikan/visitingscientist")
);
const KepegawaianPembinaanMahasiswaPage = lazy(
  () => import("./pages/admin/DetailPegawai/pendidikan/pembinaanMahasiswa")
);
const KepegawaianDataseringPage = lazy(
  () => import("./pages/admin/DetailPegawai/pendidikan/datasering")
);
const KepegawaianBahanAjarPage = lazy(
  () => import("./pages/admin/DetailPegawai/pendidikan/bahanAjar")
);
const KepegawaianOrasiIlmiahPage = lazy(
  () => import("./pages/admin/DetailPegawai/pendidikan/orasiIlmiah")
);
const KepegawaianPembimbingDosenPage = lazy(
  () => import("./pages/admin/DetailPegawai/pendidikan/pembimbingDosen")
);
const KepegawaianPenelitianPage = lazy(
  () => import("./pages/admin/DetailPegawai/penelitian/penelitian")
);
const KepegawaianPublikasiPage = lazy(
  () => import("./pages/admin/DetailPegawai/penelitian/publikasi")
);
const KepegawaianPatenHkiPage = lazy(
  () => import("./pages/admin/DetailPegawai/penelitian/patenHki")
);
const KepegawaianPengabdianPage = lazy(
  () => import("./pages/admin/DetailPegawai/pengabdian/pengabdian")
);
const KepegawaianPengelolaJurnalPage = lazy(
  () => import("./pages/admin/DetailPegawai/pengabdian/pengelolaJurnal")
);
const KepegawaianPembicaraPage = lazy(
  () => import("./pages/admin/DetailPegawai/pengabdian/pembicara")
);
const KepegawaianJabatanTugasPage = lazy(
  () => import("./pages/admin/DetailPegawai/pengabdian/jabatanTugas")
);
const KepegawaianAnggotaProfesiPage = lazy(
  () => import("./pages/admin/DetailPegawai/penunjang/anggotaProfesi")
);
const KepegawaianPenghargaanPage = lazy(
  () => import("./pages/admin/DetailPegawai/penunjang/penghargaan")
);
const KepegawaianPenunjangLainPage = lazy(
  () => import("./pages/admin/DetailPegawai/penunjang/penunjangLain")
);
const KepegawaianOrganisasiPage = lazy(
  () => import("./pages/admin/DetailPegawai/pengembangan/organisasi")
);
const KepegawaianKemampuanBahasaPage = lazy(
  () => import("./pages/admin/DetailPegawai/pengembangan/kemampuanBahasa")
);
const KepegawaianKompensasiPage = lazy(
  () => import("./pages/admin/DetailPegawai/kompensasi")
);
const KepegawaianCutiPage = lazy(
  () => import("./pages/admin/DetailPegawai/permohonan/cuti")
);
const KepegawaianIzinPage = lazy(
  () => import("./pages/admin/DetailPegawai/permohonan/izin")
);
const ElesonPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/eleson")
);
const GelarAkademikPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/gelarAkademik")
);
const HubunganKerjaReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/hubunganKerja")
);
const JabatanAkademikReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/jabatanAkademik")
);
const JabatanFungsionalReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/jabatanFungsional")
);
const JabatanStrukturalReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/jabatanStruktural")
);
const DetailJabatanFungsionalReferensiPage = lazy(
  () =>
    import(
      "./pages/admin/referensi/kepegawaian/jabatanFungsional/detailJabatanFungsional"
    )
);
const DetailDataJabatanFungsionalReferensiPage = lazy(
  () =>
    import(
      "./pages/admin/referensi/kepegawaian/jabatanFungsional/detaildataJabatanFungsionalReferensi"
    )
);
const EditJabatanFungsionalReferensiPage = lazy(
  () =>
    import(
      "./pages/admin/referensi/kepegawaian/jabatanFungsional/editJabatanFungsionalReferensi"
    )
)
const DetailJabatanStrukturalReferensiPage = lazy(
  () =>
    import(
      "./pages/admin/referensi/kepegawaian/jabatanStruktural/detailJabatanStruktural"
    )
);
const DetailDataJabatanStrukturalReferensiPage = lazy(
  () =>
    import(
      "./pages/admin/referensi/kepegawaian/jabatanStruktural/detaildataJabatanStrukturalReferensi"
    )
)
const EditJabatanStrukturalReferensiPage = lazy(
  () =>
    import(
      "./pages/admin/referensi/kepegawaian/jabatanStruktural/editJabatanStrukturalReferensi"
    )
)
const JenisKenaikanPangkatReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/jenisKenaikanPangkat")
);
const JenisSkReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/jenisSK")
);
const MediaPublikasiReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/mediaPublikasi")
);
const PangkatReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/pangkat")
);
const RumpunBidangIlmuReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/rumpunBidangIlmu")
);
const StatusKeaktifanReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/statusKeaktifan")
);
const UnitKerjaReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/unitKerja")
);
const DetailUnitKerjaReferensiPage = lazy(
  () => import("./pages/admin/referensi/kepegawaian/unitKerja/detailUnitKerja")
);
const DetailDataUnitKerjaReferensiPage = lazy(
  () =>
    import("./pages/admin/referensi/kepegawaian/unitKerja/detaildataUnitKerja")
);
const EditDataUnitKerjaReferensiPage = lazy(
  () =>
    import("./pages/admin/referensi/kepegawaian/unitKerja/editdataUnitKerja")
);
const KotaReferensiPage = lazy(
  () => import("./pages/admin/referensi/wilayah/kota")
);
const KecamatanReferensiPage = lazy(
  () => import("./pages/admin/referensi/wilayah/kecamatan")
);
const NegaraReferensiPage = lazy(
  () => import("./pages/admin/referensi/wilayah/negara")
);
const ProvinsiReferensiPage = lazy(
  () => import("./pages/admin/referensi/wilayah/provinsi")
);
const AgamaPage = lazy(() => import("./pages/admin/referensi/pelengkap/agama"));
const StatusPernikahanPage = lazy(
  () => import("./pages/admin/referensi/pelengkap/statusPernikahan")
);
const JenjangPendidikanPage = lazy(
  () => import("./pages/admin/referensi/pelengkap/jenjangPendidikan")
);
const BankPage = lazy(() => import("./pages/admin/referensi/pelengkap/bank"));
const SukuPage = lazy(() => import("./pages/admin/referensi/pelengkap/suku"));
const GolonganDarahPage = lazy(
  () => import("./pages/admin/referensi/pelengkap/golonganDarah")
);
const HomebaseUserPage = lazy(
  () => import("./pages/dataRiwayat/kepegawaian/homebase")
);
const JabatanAkademikUserPage = lazy(
  () => import("./pages/dataRiwayat/kepegawaian/jabatanAkademik")
);
const PangkatUserPage = lazy(
  () => import("./pages/dataRiwayat/kepegawaian/pangkat")
);
const PendidikanFormalUserPage = lazy(
  () => import("./pages/dataRiwayat/kualifikasi/pendidikanFormal")
);
const DiklatUserPage = lazy(
  () => import("./pages/dataRiwayat/kualifikasi/diklat")
);
const RiwayatPekerjaanUserPage = lazy(
  () => import("./pages/dataRiwayat/kualifikasi/riwayatPekerjaan")
);
const DetailPangkatUserPage = lazy(
  () => import("./pages/dataRiwayat/kepegawaian/pangkat/detailPangkat")
);
const DetailDataPangkatUserPage = lazy(
  () => import("./pages/dataRiwayat/kepegawaian/pangkat/detaildataPangkat")
);
const DetailJabatanAkademikUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kepegawaian/jabatanAkademik/detailJabatanAkademik"
    )
);
const DetailDataJabatanAkademikUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kepegawaian/jabatanAkademik/detaildataJabatanAkademik"
    )
);
const DetailPendidikanFormalUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kualifikasi/pendidikanFormal/detailPendidikanFormal"
    )
);
const DetailDiklatUserPage = lazy(
  () => import("./pages/dataRiwayat/kualifikasi/diklat/detailDiklat")
);
const DetailRiwayatPekerjaanUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kualifikasi/riwayatPekerjaan/detailRiwayatPekerjaan"
    )
);
const DetailDataRiwayatPekerjaanUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kualifikasi/riwayatPekerjaan/detaildataRiwayatPekerjaan"
    )
);
const DetailDataDiklatUserPage = lazy(
  () => import("./pages/dataRiwayat/kualifikasi/diklat/detaildataDiklat")
);
const DetailDataPendidikanFormalUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kualifikasi/pendidikanFormal/detaildataPendidikanFormal"
    )
);
const ForgetPasswordPage = lazy(() => import("./pages/auth/forgetPassword"));
const JabatanFungsionalUserPage = lazy(
  () => import("./pages/dataRiwayat/kepegawaian/jabatanfungsional")
); // Perhatikan path 'jabatanfungsional'
const DetailJabatanFungsionalUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kepegawaian/jabatanfungsional/detailJabatanFungsional"
    )
);
const DetailDataJabatanFungsionalUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kepegawaian/jabatanfungsional/detaildataJabatanFungsional"
    )
);
const JabatanStrukturalUserPage = lazy(
  () => import("./pages/dataRiwayat/kepegawaian/jabatanStruktular")
); // Perhatikan path 'jabatanStruktular'
const DetailJabatanStrukturalUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kepegawaian/jabatanStruktular/detailJabatanStruktural"
    )
);
const DetailDataJabatanStrukturalUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kepegawaian/jabatanStruktular/detaildataJabatanStruktural"
    )
);
const BahanAjarUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPendidikan/bahanAjar")
);
const DetailBahanAjarUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/bahanAjar/detailBahanAjar"
    )
);
const DetailDataBahanAjarUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/bahanAjar/detaildataBahanAjar"
    )
);
const DataseringUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPendidikan/datasering")
);
const DetailDataseringUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/datasering/detailDatasering"
    )
);
const DetailDataDataseringUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/datasering/detaildataDatasering"
    )
);
const OrasiIlmiahUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPendidikan/orasiIlmiah")
);
const DetailOrasiIlmiahUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/orasiIlmiah/detailOrasiIlmiah"
    )
);
const DetailDataOrasiIlmiahUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/orasiIlmiah/detaildataOrasiIlmiah"
    )
);
const BimbinganMahasiswaUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPendidikan/bimbinganMahasiswa")
);
const PembimbingDosenUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPendidikan/pembimbingDosen")
);
const PembinaanMahasiswaUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPendidikan/pembinaanMahasiswa")
);
const PengajaranUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPendidikan/pengajaran")
);
const PengujianMahasiswaUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPendidikan/pengujianMahasiswa")
);
const TugasTambahanUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPendidikan/tugasTambahan")
);
const VisitingScientistUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPendidikan/visitingScientist")
);
const DetailTugasTambahanUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/tugasTambahan/detailTugasTambahan"
    )
);
const DetailDataTugasTambahanUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/tugasTambahan/detaildataTugastambahan"
    )
);
const DetailVisitingScientistUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/visitingScientist/detailVisitingScientist"
    )
);
const DetailDataVisitingScientistUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/visitingScientist/detaildataVisitingScientist"
    )
);
const DetailPembimbingDosenUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/pembimbingDosen/detailPembimbingDosen"
    )
);
const DetailDataPembimbingDosenUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPendidikan/pembimbingDosen/detaildataPembimbingDosen"
    )
);
const SertifikasiUserPage = lazy(
  () => import("./pages/dataRiwayat/Kompetensi/Sertifikasi")
);
const DetailSertifikasiUserPage = lazy(
  () => import("./pages/dataRiwayat/Kompetensi/Sertifikasi/detailSertifikasi")
);
const DetailDataSertifikasiUserPage = lazy(
  () =>
    import("./pages/dataRiwayat/Kompetensi/Sertifikasi/detaildataSertifikasi")
);
const TesUserPage = lazy(() => import("./pages/dataRiwayat/Kompetensi/Tes"));
const DetailTesUserPage = lazy(
  () => import("./pages/dataRiwayat/Kompetensi/Tes/detailTes")
);
const DetailDataTesUserPage = lazy(
  () => import("./pages/dataRiwayat/Kompetensi/Tes/detaildataTes")
);
const PatenUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPenelitian/Paten")
);
const DetailPatenUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPenelitian/Paten/detailPaten")
);
const DetailDataPatenUserPage = lazy(
  () =>
    import("./pages/dataRiwayat/PelaksanaanPenelitian/Paten/detaildataPaten")
);
const PenelitianUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPenelitian/Penelitian")
);
const DetailPenelitianUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPenelitian/Penelitian/detailPenelitian"
    )
);
const DetailDataPenelitianUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPenelitian/Penelitian/detaildataPenelitian"
    )
);
const PublikasiUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPenelitian/Publikasi")
);
const DetailPublikasiUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPenelitian/Publikasi/detailPublikasi"
    )
);
const DetailDataPublikasiUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPenelitian/Publikasi/detaildataPublikasi"
    )
);
const KemampuanBahasaUserPage = lazy(
  () => import("./pages/dataRiwayat/PengembanganDiri/KemampuanBahasa")
);
const DetailKemampuanBahasaUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PengembanganDiri/KemampuanBahasa/detailKemampuanBahasa"
    )
);
const DetailDataKemampuanBahasaUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PengembanganDiri/KemampuanBahasa/detaildataKemampuanBahasa"
    )
);
const OrganisasiUserPage = lazy(
  () => import("./pages/dataRiwayat/PengembanganDiri/Organisasi")
);
const DetailOrganisasiUserPage = lazy(
  () =>
    import("./pages/dataRiwayat/PengembanganDiri/Organisasi/detailOrganisasi")
);
const DetailDataOrganisasiUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PengembanganDiri/Organisasi/detaildataOrganisasi"
    )
);
const PelanggaranUserPage = lazy(
  () => import("./pages/dataRiwayat/Kompensasi/Pelanggaran")
); // Ada duplikasi nama, beri alias _User
const HubunganKerjaUserPage = lazy(
  () => import("./pages/dataRiwayat/kepegawaian/hubunganKerja")
);
const DetailHubunganKerjaUserPage = lazy(
  () =>
    import("./pages/dataRiwayat/kepegawaian/hubunganKerja/detailHubunganKerja")
);
const DetailDataHubunganKerjaUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/kepegawaian/hubunganKerja/detaildataHubunganKerja"
    )
);
const PengabdianUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPengabdian/Pengabdian")
);
const DetailPengabdianUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPengabdian/Pengabdian/DetailPengabdian"
    )
);
const DetailDataPengabdianUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPengabdian/Pengabdian/detaildataPengabdian"
    )
);
const BeritaPage = lazy(() => import("./pages/admin/operasional/berita")); // Ada duplikasi nama, pastikan ini benar atau beri alias
const DetailDataBeritaPage = lazy(
  () => import("./pages/admin/operasional/berita/detaildataBerita")
);
const EditDataBeritaPage = lazy(
  () => import("./pages/admin/operasional/berita/editdataBerita")
);
const PembicaraUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPengabdian/Pembicara")
);
const DetailPembicaraUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPengabdian/Pembicara/DetailPembicara"
    )
);
const DetailDataPembicaraUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPengabdian/Pembicara/detaildataPembicara"
    )
);
const PengelolaJurnalUserPage = lazy(
  () => import("./pages/dataRiwayat/PelaksanaanPengabdian/PengelolaJurnal")
);
const DetailPengelolaJurnalUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPengabdian/PengelolaJurnal/DetailPengelolaJurnal"
    )
);
const DetailDataPengelolaJurnalUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/PelaksanaanPengabdian/PengelolaJurnal/detaildataPengelolaJurnal"
    )
);
const AnggotaProfesiUserPage = lazy(
  () => import("./pages/dataRiwayat/Penunjang/AnggotaProfesi")
);
const DetailAnggotaProfesiUserPage = lazy(
  () =>
    import("./pages/dataRiwayat/Penunjang/AnggotaProfesi/DetailAnggotaProfesi")
);
const DetailDataAnggotaProfesiUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/Penunjang/AnggotaProfesi/detaildataAnggotaProfesi"
    )
);
const PenghargaanUserPage = lazy(
  () => import("./pages/dataRiwayat/Penunjang/Penghargaan")
);
const DetailPenghargaanUserPage = lazy(
  () => import("./pages/dataRiwayat/Penunjang/Penghargaan/DetailPenghargaan")
);
const DetailDataPenghargaanUserPage = lazy(
  () =>
    import("./pages/dataRiwayat/Penunjang/Penghargaan/detaildataPenghargaan")
);
const PenunjangLainUserPage = lazy(
  () => import("./pages/dataRiwayat/Penunjang/PenunjangLain")
);
const DetailPenunjangLainUserPage = lazy(
  () =>
    import("./pages/dataRiwayat/Penunjang/PenunjangLain/DetailPenunjangLain")
);
const DetailDataPenunjangLainUserPage = lazy(
  () =>
    import(
      "./pages/dataRiwayat/Penunjang/PenunjangLain/detaildataPenunjangLain"
    )
);
const AnakUserPage = lazy(() => import("./pages/dataRiwayat/Keluarga/Anak"));
const DetailAnakUserPage = lazy(
  () => import("./pages/dataRiwayat/Keluarga/Anak/detailAnak")
);
const DetailDataAnakUserPage = lazy(
  () => import("./pages/dataRiwayat/Keluarga/Anak/detaildataAnak")
);
const OrangtuaUserPage = lazy(
  () => import("./pages/dataRiwayat/Keluarga/Orangtua")
);
const DetailOrangtuaUserPage = lazy(
  () => import("./pages/dataRiwayat/Keluarga/Orangtua/detailOrangtua")
);
const DetailDataOrangtuaUserPage = lazy(
  () => import("./pages/dataRiwayat/Keluarga/Orangtua/detaildataOrangtua")
);
const PasanganUserPage = lazy(
  () => import("./pages/dataRiwayat/Keluarga/Pasangan")
);
const DetailPasanganUserPage = lazy(
  () => import("./pages/dataRiwayat/Keluarga/Pasangan/detailPasangan")
);
const DetailDataPasanganUserPage = lazy(
  () => import("./pages/dataRiwayat/Keluarga/Pasangan/detaildataPasangan")
);
const BiodataPageUser = lazy(() => import("./pages/biodata"));
const EvaluasiKerjaUserPage = lazy(
  () => import("./pages/operasional/EvaluasiKerja")
);
const DetailEvaluasiKerjaUserPage = lazy(
  () => import("./pages/operasional/EvaluasiKerja/detailEvaluasiKerja")
);
const DetailEvaluasiKerjaPegawaiUserPage = lazy(
  () => import("./pages/operasional/EvaluasiKerja/detailEvaluasiKerjaPegawai")
);
const TahapanDataRiwayatPageUser = lazy(
  () => import("./pages/tahapandatariwayat")
);

import { useHydration } from "./hooks/useHydration";
import LoadingSpinner from "./components/blocks/LoadingSpinner";
import LoadingText from "./components/blocks/LoadingText";
import DetailBeritaPage from "./pages/admin/operasional/berita/detailberita";
import penggajianUserPage from "./pages/penggajian";
import printpenggajian from "./components/view/penggajian/printpenggajian";
import DetailDataOrganisasiKepegawaianPage from "./pages/admin/validasiData/pengembangan/organisasi/detaildataOrganisasi";
import DetailDataKemampuanBahasaKepegawaianPage from "./pages/admin/validasiData/pengembangan/kemampuanBahasa/detaildataKemampuanBahasa";
import DetailDataPenghargaanKepegawaianPage from "./pages/admin/validasiData/penunjang/penghargaan/detaildataPenghargaan";

function App() {
  const { isHydrate } = useHydration();

  if (!isHydrate) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center w-screen h-screen">
        <LoadingSpinner />
        <LoadingText />
      </div>
    );
  }

  // Komponen fallback untuk Suspense.
  const SuspenseLoadingFallback = () => (
    <div className="flex flex-col gap-2 justify-center items-center w-screen h-screen">
      <LoadingSpinner />
      <p>Memuat halaman...</p>
    </div>
  );

  return (
    <>
      <Toaster position="top-right" />
      <Suspense fallback={<SuspenseLoadingFallback />}>
        <Routes>
          <Route path="/" Component={ModulePage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/forget-password" Component={ForgetPasswordPage} />
          <Route path="/profil" Component={ProfilPage} />

          {/* USER PAGES */}
          <Route path="/dasboard" Component={DasboardPageUser} />
          <Route path="/biodata" Component={BiodataPageUser} />
          <Route
            path="/tahapan-data-riwayat"
            Component={TahapanDataRiwayatPageUser}
          />

          {/* KEHADIRAN */}
          <Route path="/kehadiran">
            <Route path="riwayat-kehadiran" Component={RiwayatKehadiranPage} />
            <Route path="kegiatan-harian" Component={KegiatanHarianPage} />
          </Route>

          {/* PENGGAJIAN */}
          <Route path="/penggajian">
            <Route path="" Component={penggajianUserPage} />
            <Route path="printpenggajian" Component={printpenggajian} />
          </Route>

          {/* OPERASIONAL */}
          <Route path="/operasional">
            <Route path="berita" Component={BeritaOperasionalUserPage} />
            <Route path="tambah-berita" Component={DetailBeritaUserPage} />
            <Route path="detail-berita" Component={DetailDataBeritaUserPage} />

            <Route
              path="detail-dokumen-internal"
              Component={DetailDokumenInternalUserPage}
            />
            <Route
              path="dokumen-internal"
              Component={DokumenInternalUserPage}
            />
            <Route
              path="detail-data-dokumen-internal"
              Component={DetailDataDokumenInternalUserPage}
            />

            <Route path="pengajuan">
              <Route path="cuti" Component={CutiPage} />
              <Route path="tambah-cuti" Component={DetailCutiUserPage} />
              <Route
                path="detail-cuti/:id"
                Component={DetailDataCutiUserPage}
              />
              <Route path="izin" Component={IzinPage} />
              <Route path="tambah-izin" Component={DetailIzinUserPage} />
              <Route
                path="detail-izin/:id"
                Component={DetailDataIzinUserPage}
              />
            </Route>
            <Route path="evaluasi-kerja" Component={EvaluasiKerjaUserPage} />
            <Route path="evaluasi-kerja">
              <Route
                path="form-evaluasi-kerja-dosen"
                Component={DetailEvaluasiKerjaUserPage}
              />
              <Route
                path="form-evaluasi-kerja-pegawai"
                Component={DetailEvaluasiKerjaPegawaiUserPage}
              />
            </Route>
          </Route>

          {/* DATA RIWAYAT */}
          <Route path="/data-riwayat">
            {/* DATA RIWAYAT > KEPEGAWAIAN */}
            <Route path="kepegawaian">
              <Route path="homebase" Component={HomebaseUserPage} />
              <Route
                path="jabatan-akademik"
                Component={JabatanAkademikUserPage}
              />
              <Route
                path="detail-jabatan-akademik"
                Component={DetailJabatanAkademikUserPage}
              />
              <Route
                path="detail-data-jabatan-akademik/:id"
                Component={DetailDataJabatanAkademikUserPage}
              />
              <Route
                path="jabatan-fungsional"
                Component={JabatanFungsionalUserPage}
              />
              <Route
                path="detail-jabatan-fungsional"
                Component={DetailJabatanFungsionalUserPage}
              />
              <Route
                path="detail-data-jabatan-fungsional/:id"
                Component={DetailDataJabatanFungsionalUserPage}
              />
              <Route
                path="jabatan-struktural"
                Component={JabatanStrukturalUserPage}
              />
              <Route
                path="detail-jabatan-struktural"
                Component={DetailJabatanStrukturalUserPage}
              />
              <Route
                path="detail-data-jabatan-struktural/:id"
                Component={DetailDataJabatanStrukturalUserPage}
              />
              <Route path="hubungan-kerja" Component={HubunganKerjaUserPage} />
              <Route
                path="detail-hubungan-kerja"
                Component={DetailHubunganKerjaUserPage}
              />
              <Route
                path="detail-data-hubungan-kerja/:id"
                Component={DetailDataHubunganKerjaUserPage}
              />

              <Route path="pangkat" Component={PangkatUserPage} />
              <Route path="detail-pangkat" Component={DetailPangkatUserPage} />
              <Route
                path="detail-data-pangkat/:id"
                Component={DetailDataPangkatUserPage}
              />
            </Route>

            {/* DATA RIWAYAT > KELUARGA */}
            <Route path="keluarga">
              <Route path="anak" Component={AnakUserPage} />
              <Route path="detail-anak" Component={DetailAnakUserPage} />
              <Route
                path="detail-data-anak/:id"
                Component={DetailDataAnakUserPage}
              />
              <Route path="orangtua" Component={OrangtuaUserPage} />
              <Route
                path="detail-orangtua"
                Component={DetailOrangtuaUserPage}
              />
              <Route
                path="detail-data-orangtua/:id"
                Component={DetailDataOrangtuaUserPage}
              />
              <Route path="pasangan" Component={PasanganUserPage} />
              <Route
                path="detail-pasangan"
                Component={DetailPasanganUserPage}
              />
              <Route
                path="detail-data-pasangan/:id"
                Component={DetailDataPasanganUserPage}
              />
            </Route>

            {/* DATA RIWAYAT > KUALIFIKASI */}
            <Route path="kualifikasi">
              <Route
                path="pendidikan-formal"
                Component={PendidikanFormalUserPage}
              />
              <Route
                path="detail-pendidikan-formal"
                Component={DetailPendidikanFormalUserPage}
              />
              <Route
                path="detail-data-pendidikan-formal"
                Component={DetailDataPendidikanFormalUserPage}
              />
              <Route path="diklat" Component={DiklatUserPage} />
              <Route path="detail-diklat" Component={DetailDiklatUserPage} />
              <Route
                path="detail-data-diklat/:id"
                Component={DetailDataDiklatUserPage}
              />
              <Route
                path="riwayat-pekerjaan"
                Component={RiwayatPekerjaanUserPage}
              />
              <Route
                path="detail-riwayat-pekerjaan"
                Component={DetailRiwayatPekerjaanUserPage}
              />
              <Route
                path="detail-data-riwayat-pekerjaan"
                Component={DetailDataRiwayatPekerjaanUserPage}
              />
            </Route>

            {/* DATA RIWAYAT > KOMPETENSI */}
            <Route path="kompetensi">
              <Route path="sertifikasi" Component={SertifikasiUserPage} />
              <Route
                path="detail-sertifikasi"
                Component={DetailSertifikasiUserPage}
              />
              <Route
                path="detail-data-sertifikasi/:id"
                Component={DetailDataSertifikasiUserPage}
              />
              <Route path="tes" Component={TesUserPage} />
              <Route path="detail-tes" Component={DetailTesUserPage} />
              <Route
                path="detail-data-tes/:id"
                Component={DetailDataTesUserPage}
              />
            </Route>

            {/* DETAIL RIWAYAT > PELAKSANAAN PENELITIAN */}
            <Route path="pelaksanaan-penelitian">
              <Route path="paten" Component={PatenUserPage} />
              <Route path="detail-paten" Component={DetailPatenUserPage} />
              <Route
                path="detail-data-paten"
                Component={DetailDataPatenUserPage}
              />
              <Route path="penelitian" Component={PenelitianUserPage} />
              <Route
                path="detail-penelitian"
                Component={DetailPenelitianUserPage}
              />
              <Route
                path="detail-data-penelitian"
                Component={DetailDataPenelitianUserPage}
              />
              <Route path="publikasi" Component={PublikasiUserPage} />
              <Route
                path="detail-publikasi"
                Component={DetailPublikasiUserPage}
              />
              <Route
                path="detail-data-publikasi"
                Component={DetailDataPublikasiUserPage}
              />
            </Route>

            {/* DATA RIWAYAT > PENGEMBANGAN DIRI */}
            <Route path="pengembangan-diri">
              <Route
                path="kemampuan-bahasa"
                Component={KemampuanBahasaUserPage}
              />
              <Route
                path="detail-kemampuan-bahasa"
                Component={DetailKemampuanBahasaUserPage}
              />
              <Route
                path="detail-data-kemampuan-bahasa/:id"
                Component={DetailDataKemampuanBahasaUserPage}
              />
              <Route path="organisasi" Component={OrganisasiUserPage} />
              <Route
                path="detail-organisasi"
                Component={DetailOrganisasiUserPage}
              />
              <Route
                path="detail-data-organisasi/:id"
                Component={DetailDataOrganisasiUserPage}
              />
            </Route>

            <Route path="kompensasi">
              <Route path="pelanggaran" Component={PelanggaranUserPage} />
            </Route>

            <Route path="pelaksanaan-penelitian">
              <Route path="paten" Component={PatenUserPage} />
              <Route path="detail-paten" Component={DetailPatenUserPage} />
              <Route path="penelitian" Component={PenelitianUserPage} />
              <Route
                path="detail-penelitian"
                Component={DetailPenelitianUserPage}
              />
              <Route path="publikasi" Component={PublikasiUserPage} />
              <Route
                path="detail-publikasi"
                Component={DetailPublikasiUserPage}
              />
            </Route>

            {/* DATA RIWAYAT > PELAKSANAAN PENGABDIAN */}

            <Route path="pelaksanaan-pengabdian">
              <Route path="pengabdian" Component={PengabdianUserPage} />
              <Route
                path="detail-pengabdian"
                Component={DetailPengabdianUserPage}
              />
              <Route
                path="detail-data-pengabdian"
                Component={DetailDataPengabdianUserPage}
              />
              <Route path="pembicara" Component={PembicaraUserPage} />
              <Route
                path="detail-pembicara"
                Component={DetailPembicaraUserPage}
              />
              <Route
                path="detail-data-pembicara"
                Component={DetailDataPembicaraUserPage}
              />
              <Route
                path="pengelola-jurnal"
                Component={PengelolaJurnalUserPage}
              />
              <Route
                path="detail-pengelola-jurnal"
                Component={DetailPengelolaJurnalUserPage}
              />
              <Route
                path="detail-data-pengelola-jurnal"
                Component={DetailDataPengelolaJurnalUserPage}
              />
            </Route>

            <Route path="pengembangan-diri">
              <Route
                path="kemampuan-bahasa"
                Component={KemampuanBahasaUserPage}
              />
              <Route
                path="detail-kemampuan-bahasa"
                Component={DetailKemampuanBahasaUserPage}
              />
              <Route path="organisasi" Component={OrganisasiUserPage} />
            </Route>

            <Route path="kompensasi">
              <Route path="pelanggaran" Component={PelanggaranUserPage} />
            </Route>

            {/* DATA RIWAYAT > Penunjang */}
            <Route path="penunjang">
              <Route
                path="anggota-profesi"
                Component={AnggotaProfesiUserPage}
              />
              <Route
                path="detail-anggota-profesi"
                Component={DetailAnggotaProfesiUserPage}
              />
              <Route
                path="detail-data-anggota-profesi"
                Component={DetailDataAnggotaProfesiUserPage}
              />

              <Route path="penghargaan" Component={PenghargaanUserPage} />
              <Route
                path="detail-penghargaan"
                Component={DetailPenghargaanUserPage}
              />
              <Route
                path="detail-data-penghargaan"
                Component={DetailDataPenghargaanUserPage}
              />

              <Route path="penunjang-lain" Component={PenunjangLainUserPage} />
              <Route
                path="detail-penunjang-lain"
                Component={DetailPenunjangLainUserPage}
              />
              <Route
                path="detail-data-penunjang-lain"
                Component={DetailDataPenunjangLainUserPage}
              />
            </Route>

            {/* DATA RIWAYAT > PELAKSANAAN PENDIDIKAN */}
            <Route path="pelaksanaan-pendidikan">
              <Route path="bahan-ajar" Component={BahanAjarUserPage} />
              <Route
                path="detail-bahan-ajar"
                Component={DetailBahanAjarUserPage}
              />
              <Route
                path="detail-data-bahan-ajar"
                Component={DetailDataBahanAjarUserPage}
              />

              <Route
                path="bimbingan-mahasiswa"
                Component={BimbinganMahasiswaUserPage}
              />

              <Route path="datasering" Component={DataseringUserPage} />
              <Route
                path="detail-datasering"
                Component={DetailDataseringUserPage}
              />
              <Route
                path="detail-data-datasering"
                Component={DetailDataDataseringUserPage}
              />
              <Route path="orasi-ilmiah" Component={OrasiIlmiahUserPage} />
              <Route
                path="detail-orasi-ilmiah"
                Component={DetailOrasiIlmiahUserPage}
              />
              <Route
                path="detail-data-orasi-ilmiah"
                Component={DetailDataOrasiIlmiahUserPage}
              />
              <Route
                path="pembimbing-dosen"
                Component={PembimbingDosenUserPage}
              />
              <Route
                path="detail-pembimbing-dosen"
                Component={DetailPembimbingDosenUserPage}
              />
              <Route
                path="detail-data-pembimbing-dosen"
                Component={DetailDataPembimbingDosenUserPage}
              />
              <Route
                path="pembinaan-mahasiswa"
                Component={PembinaanMahasiswaUserPage}
              />
              <Route path="pengajaran" Component={PengajaranUserPage} />
              <Route
                path="pengujian-mahasiswa"
                Component={PengujianMahasiswaUserPage}
              />
              <Route path="tugas-tambahan" Component={TugasTambahanUserPage} />
              <Route
                path="detail-tugas-tambahan"
                Component={DetailTugasTambahanUserPage}
              />
              <Route
                path="detail-data-tugas-tambahan"
                Component={DetailDataTugasTambahanUserPage}
              />
              <Route
                path="visiting-scientist"
                Component={VisitingScientistUserPage}
              />
              <Route
                path="detail-visiting-scientist"
                Component={DetailVisitingScientistUserPage}
              />
              <Route
                path="detail-data-visiting-scientist"
                Component={DetailDataVisitingScientistUserPage}
              />
            </Route>
          </Route>

          {/* ADMIN PAGES */}
          <Route path="/admin">
            <Route path="dasboard" Component={DasboardPage} />
            <Route path="pegawai" Component={PegawaiPage} />
            <Route path="pegawai/data-pegawai" Component={DataPegawaiPage} />
            <Route
              path="pegawai/edit-data-pegawai/:id"
              Component={EditDataPegawaiPage}
            />

            {/* DETAIL PEGAWAI */}
            <Route path="detail-pegawai">
              <Route path="biodata/:id" Component={BiodataPage} />
              <Route path="keluarga/:id" Component={DetailKeluargaPage} />
              <Route path="presensi/:id" Component={KepegawaianPresensiPage} />

              {/* DETAIL PEGAWAI > KEPEGAWAIAN */}
              <Route path="kepegawaian">
                <Route
                  path="homebase/:id"
                  Component={KepegawaianHomebasePage}
                />
                <Route path="pangkat/:id" Component={KepegawaianPangkatPage} />
                <Route
                  path="jabatan-akademik/:id"
                  Component={KepegawaianJabatanAkademikPage}
                />
                <Route
                  path="jabatan-fungsional/:id"
                  Component={KepegawaianJabatanFungsionalPage}
                />
                <Route
                  path="jabatan-struktural/:id"
                  Component={KepegawaianJabatanStrukturalPage}
                />
                <Route
                  path="hubungan-kerja/:id"
                  Component={KepegawaianHubunganKerjaPage}
                />
              </Route>

              {/* DETAIL PEGAWAI > KUALIFIKASI */}
              <Route path="kualifikasi">
                <Route
                  path="pendidikan-formal/:id"
                  Component={KepegawaianPendidikanFormalPage}
                />
                <Route path="diklat/:id" Component={KepegawaianDiklatPage} />
                <Route
                  path="riwayat-pekerjaan/:id"
                  Component={KepegawaianRiwayatPekerjaanPage}
                />
              </Route>

              {/* DETAIL PEGAWAI > KOMPETENSI */}
              <Route path="kompetensi">
                <Route
                  path="riwayat-sertifikasi/:id"
                  Component={KepegawaianRiwayatSertifikasiPage}
                />
                <Route
                  path="riwayat-tes/:id"
                  Component={KepegawaianRiwayatTesPage}
                />
              </Route>

              {/* DETAIL PEGAWAI > PENDIDIKAN */}
              <Route path="pendidikan">
                <Route
                  path="pengajaran/:id"
                  Component={KepegawaianPengajaranPage}
                />
                <Route
                  path="bimbingan-mahasiswa/:id"
                  Component={KepegawaianBimbinganMahasiswaPage}
                />
                <Route
                  path="tugas-tambahan/:id"
                  Component={KepegawaianTugasTambahanPage}
                />
                <Route
                  path="pengujian-mahasiswa/:id"
                  Component={KepegawaianPengujianMahasiswaPage}
                />
                <Route
                  path="visiting-scientist/:id"
                  Component={KepegawaianVisitingscientistPage}
                />
                <Route
                  path="pembinaan-mahasiswa/:id"
                  Component={KepegawaianPembinaanMahasiswaPage}
                />
                <Route
                  path="datasering/:id"
                  Component={KepegawaianDataseringPage}
                />
                <Route
                  path="bahan-ajar/:id"
                  Component={KepegawaianBahanAjarPage}
                />
                <Route
                  path="orasi-ilmiah/:id"
                  Component={KepegawaianOrasiIlmiahPage}
                />
                <Route
                  path="pembimbing-dosen/:id"
                  Component={KepegawaianPembimbingDosenPage}
                />
              </Route>

              {/* DETAIL PEGAWAI > PENELITIAN */}
              <Route path="penelitian">
                <Route
                  path="penelitian/:id"
                  Component={KepegawaianPenelitianPage}
                />
                <Route
                  path="publikasi/:id"
                  Component={KepegawaianPublikasiPage}
                />
                <Route path="paten/:id" Component={KepegawaianPatenHkiPage} />
              </Route>

              {/* DETAIL PEGAWAI > > PENGABDIAN */}
              <Route path="pengabdian">
                <Route
                  path="pengabdian/:id"
                  Component={KepegawaianPengabdianPage}
                />
                <Route
                  path="pengelola-jurnal/:id"
                  Component={KepegawaianPengelolaJurnalPage}
                />
                <Route
                  path="pembicara/:id"
                  Component={KepegawaianPembicaraPage}
                />
                <Route
                  path="jabatan-tugas/:id"
                  Component={KepegawaianJabatanTugasPage}
                />
              </Route>

              {/* DETAIL PEGAWAI > PENUNJANG */}
              <Route path="penunjang">
                <Route
                  path="anggota-profesi/:id"
                  Component={KepegawaianAnggotaProfesiPage}
                />
                <Route
                  path="penghargaan/:id"
                  Component={KepegawaianPenghargaanPage}
                />
                <Route
                  path="penunjang-lain/:id"
                  Component={KepegawaianPenunjangLainPage}
                />
              </Route>

              {/* DETAIL PEGAWAI > > PENGEMBANGAN */}
              <Route path="pengembangan">
                <Route
                  path="organisasi/:id"
                  Component={KepegawaianOrganisasiPage}
                />
                <Route
                  path="kemampuan-bahasa/:id"
                  Component={KepegawaianKemampuanBahasaPage}
                />
              </Route>

              {/* DETAIL PEGAWAI > KOMPENSASI */}
              <Route
                path="kompensasi/:id"
                Component={KepegawaianKompensasiPage}
              />

              {/* DETAIL PEGAWAI > PERMOHONAN */}
              <Route path="permohonan">
                <Route path="cuti/:id" Component={KepegawaianCutiPage} />
                <Route path="izin/:id" Component={KepegawaianIzinPage} />
              </Route>
            </Route>

            {/* OPERASIONAL */}
            <Route path="operasional">
              <Route
                path="hubungan-kerja-pegawai"
                Component={HubunganKerjaPegawaiPage}
              />
              <Route
                path="setting-kehadiran"
                Component={SettingKehadiranPage}
              />
              <Route path="shift-kerja" Component={ShiftKerjaPage} />
              <Route path="data-shift-kerja" Component={DataShiftKerjaPage} />
              <Route
                path="daftar-monitoring-kehadiran"
                Component={DaftarMonitoringKehadiranPage}
              />
              <Route path="rekap-kehadiran" Component={RekapKehadiranPage} />
              <Route path="input-kehadiran" Component={InputKehadiranPage} />
              <Route
                path="monitoring-kegiatan"
                Component={MonitoringRekapKehadiranPage}
              />

              {/* OPERASIONAL > BERITA */}
              <Route path="berita" Component={BeritaPage} />
              <Route path="detail-berita" Component={DetailBeritaPage} />
              <Route
                path="detail-data-berita/:id"
                Component={DetailDataBeritaPage}
              />
              <Route path="edit-data-berita" Component={EditDataBeritaPage} />

              {/* OPERASIONAL > CUTI */}
              <Route path="cuti">
                <Route
                  path="monitoring-sisa-cuti"
                  Component={MonitoringSisaCutiPage}
                />
                <Route path="permohonan-izin" Component={PermohonanIzinPage} />
                <Route path="periode-cuti" Component={PeriodeCutiPage} />
                <Route path="permohonan-cuti" Component={PermohonanCutiPage} />
              </Route>

              {/* OPERASIONAL > KOMPENSASI */}
              <Route path="kompensasi">
                <Route path="pelanggaran" Component={PelanggaranPage} />
                <Route
                  path="detail-riwayat-pelanggaran"
                  Component={DetailRiwayatPelanggaranPage}
                />
                <Route
                  path="detail-data-pelanggaran/:id"
                  Component={DetailDataPelanggaranPage}
                />
                <Route
                  path="edit-data-pelanggaran/:id"
                  Component={EditDataPelanggaranPage}
                />
                <Route path="penghargaan" Component={RiwayatPenghargaanPage} />
                <Route
                  path="detail-penghargaan/"
                  Component={DetailPenghargaanPage}
                />
                <Route
                  path="detail-data-penghargaan/:id"
                  Component={DetailDataPenghargaanPage}
                />
                <Route
                  path="edit-data-penghargaan/:id"
                  Component={EditDataPenghargaanPage}
                />
                <Route
                  path="dokumen-internal"
                  Component={DokumenInternalPage}
                />
                <Route
                  path="detail-dokumen-internal"
                  Component={DetailDokumenInternalPage}
                />
                <Route
                  path="detail-data-dokumen-internal"
                  Component={DetailDataDokumenInternalPage}
                />
                <Route
                  path="edit-data-dokumen-internal"
                  Component={EditDataDokumenInternalPage}
                />
              </Route>
            </Route>

            {/* VALIDASI */}
            <Route path="validasi-data">
              <Route path="setting-validasi" Component={SettingValidasiPage} />
              <Route path="keluarga" Component={KeluargaPage} />
              <Route path="monitoring" Component={MonitoringPage} />

              {/* VALIDASI > KEPEGAWAIAN */}
              <Route path="kepegawaian">
                <Route path="homebase" Component={HomebasePage} />
                <Route
                  path="hubungan-kerja"
                  Component={HubunganKerjaKepegawaianPage}
                />
                <Route
                  path="hubungan-kerja/detail-hubungan-kerja"
                  Component={DetailHubunganKerjaValidasiPage}
                />
                <Route
                  path="jabatan-akademik"
                  Component={JabatanAkademikPage}
                />
                <Route
                  path="jabatan-akademik/detail-jabatan-akademik"
                  Component={DetailJabatanAkademikValidasiPage}
                />
                <Route
                  path="jabatan-fungsional"
                  Component={JabatanFungionalPage}
                />
                <Route
                  path="jabatan-fungsional/detail-jabatan-fungsional"
                  Component={DetailJabatanFungionalValidasiPage}
                />
                <Route
                  path="jabatan-struktural"
                  Component={JabatanStrukturalPage}
                />
                <Route
                  path="jabatan-struktural/detail-jabatan-struktural"
                  Component={DetailJabatanStrukturalValidasiPage}
                />
                <Route path="pangkat" Component={PangkatPage} />
                <Route
                  path="pangkat/detail-pangkat"
                  Component={DetailPangkatValidasiPage}
                />
              </Route>

              {/* VALIDASI > KOMPETENSI */}
              <Route path="kompetensi">
                <Route path="sertifikasi" Component={SertifikasiPage} />
                <Route
                  path="sertifikasi/detail-sertifikasi"
                  Component={DetailSertifikasiValidasiPage}
                />
                <Route path="tes" Component={TesPage} />
                <Route
                  path="tes/detail-tes"
                  Component={DetailTesValidasiPage}
                />
              </Route>

              {/* VALIDASI > PELAKSANAAN PENDIDIKAN */}
              <Route path="pelaksanaan-pendidikan">
                <Route path="bahan-ajar" Component={BahanAjarPage} />
                <Route path="datasering" Component={DataseringPage} />
                <Route path="orasi-ilmiah" Component={OrasiIlmiahPage} />
                <Route path="tugas-tambahan" Component={TugasTambahanPage} />
              </Route>

              {/* VALIDASI > PELAKSANAAN PENELITIAN */}
              <Route path="pelaksanaan-penelitian">
                <Route path="paten" Component={PatenPage} />
                <Route path="penelitian" Component={PenelitianPage} />
                <Route path="publikasi" Component={PublikasiPage} />
              </Route>

              {/* VALIDASI > PELAKSANAAN PENGABDIAN */}
              <Route path="pelaksanaan-pengabdian">
                <Route
                  path="jabatan-struktural"
                  Component={JabatanStrukturalKepegawaianPage}
                />
                <Route path="pembicara" Component={PembicaraPage} />
                <Route path="pengabdian" Component={PengabdianPage} />
              </Route>

              {/* VALIDASI > PENGEMBANGAN */}
              <Route path="pengembangan">
                <Route
                  path="kemampuan-bahasa"
                  Component={KemampuanBahasaPage}
                />
                <Route
                path="detail-data-kemampuan-bahasa"
                Component={DetailDataKemampuanBahasaKepegawaianPage}
                />
                <Route path="organisasi" Component={OrganisasiPage} />
                <Route
                path="detail-data-organisasi"
                Component={DetailDataOrganisasiKepegawaianPage}
                />
              </Route>

              {/* VALIDASI > PENUNJANG */}
              <Route path="penunjang">
                <Route path="organisasi" Component={OrganisasiPenunjangPage} />
                <Route
                  path="penghargaan"
                  Component={PenghargaanPenunjangPage}
                />
                <Route
                path="detail-data-penghargaan"
                Component={DetailDataPenghargaanKepegawaianPage}
                />
                <Route path="penunjang-lain" Component={PenunjangLainPage} />
              </Route>
            </Route>

            {/* REFERENSI */}
            <Route path="referensi">
              {/* REFERENSI > AKTIVITAS */}
              <Route path="aktifitas">
                <Route path="jenis-luaran" Component={JenisLuaranPage} />
                <Route
                  path="jenis-pelanggaran"
                  Component={JenisPelanggaranReferensiPage}
                />
                <Route
                  path="jenis-pengabdian"
                  Component={JenisPengabdianReferensiPage}
                />
                <Route
                  path="jenis-penghargaan"
                  Component={JenisPenghargaanReferensiPage}
                />
                <Route
                  path="jenis-publikasi"
                  Component={JenisPublikasiReferensiPage}
                />
                <Route
                  path="jenis-sertifikasi"
                  Component={JenisSertifikasiReferensiPage}
                />
                <Route path="jenis-tes" Component={JenisTesReferensiPage} />
                <Route
                  path="output-penelitian"
                  Component={OutputPenelitianReferensiPage}
                />
              </Route>

              {/* REFERENSI > KEHADIRAN */}
              <Route path="kehadiran">
                <Route path="hari-libur" Component={HariLiburReferensiPage} />
                <Route path="jam-kerja" Component={JamKerjaReferensiPage} />
                <Route path="jenis-cuti" Component={JenisCutiReferensiPage} />
                <Route path="jenis-hari" Component={JenisHariReferensiPage} />
                <Route path="jenis-izin" Component={JenisIzinReferensiPage} />
                <Route
                  path="jenis-kehadiran"
                  Component={JenisKehadiranReferensiPage}
                />
              </Route>

              {/* REFERENSI > KEPEGAWAIAN */}
              <Route path="kepegawaian">
                <Route path="eleson" Component={ElesonPage} />
                <Route path="gelar-akademik" Component={GelarAkademikPage} />
                <Route
                  path="hubungan-kerja"
                  Component={HubunganKerjaReferensiPage}
                />
                <Route
                  path="jabatan-akademik"
                  Component={JabatanAkademikReferensiPage}
                />
                <Route
                  path="jabatan-fungsional"
                  Component={JabatanFungsionalReferensiPage}
                />
                <Route
                  path="jabatan-fungsional/detail-jabatan-fungsional"
                  Component={DetailJabatanFungsionalReferensiPage}
                />
                <Route
                  path="jabatan-fungsional/detail-data-jabatan-fungsional"
                  Component={DetailDataJabatanFungsionalReferensiPage}
                />
                <Route
                  path="jabatan-fungsional/detail-jabatan-fungsional/edit-jabatan-fungsional"
                  Component={EditJabatanFungsionalReferensiPage}
                />
                <Route
                  path="jabatan-struktural"
                  Component={JabatanStrukturalReferensiPage}
                />
                <Route
                  path="jabatan-struktural/detail-jabatan-struktural"
                  Component={DetailJabatanStrukturalReferensiPage}
                />
                <Route
                  path="jabatan-struktural/detail-data-jabatan-struktural"
                  Component={DetailDataJabatanStrukturalReferensiPage}
                />
                <Route
                  path="jabatan-struktural/detail-jabatan-struktural/edit-jabatan-struktural"
                  Component={EditJabatanStrukturalReferensiPage}
                />
                <Route
                  path="jenis-kenaikan-pangkat"
                  Component={JenisKenaikanPangkatReferensiPage}
                />
                <Route path="jenis-sk" Component={JenisSkReferensiPage} />
                <Route
                  path="media-publikasi"
                  Component={MediaPublikasiReferensiPage}
                />
                <Route path="pangkat" Component={PangkatReferensiPage} />
                <Route
                  path="rumpun-bidang-ilmu"
                  Component={RumpunBidangIlmuReferensiPage}
                />
                <Route
                  path="status-keaktifan"
                  Component={StatusKeaktifanReferensiPage}
                />
                <Route path="unit-kerja" Component={UnitKerjaReferensiPage} />
                <Route
                  path="unit-kerja/detail-unit-kerja"
                  Component={DetailUnitKerjaReferensiPage}
                />
                <Route
                  path="unit-kerja/detail-data-unit-kerja/:id"
                  Component={DetailDataUnitKerjaReferensiPage}
                />
                <Route
                  path="unit-kerja/edit-data-unit-kerja"
                  Component={EditDataUnitKerjaReferensiPage}
                />
              </Route>

              {/* REFERENSI > WILAYAH */}
              <Route path="wilayah">
                <Route path="kota" Component={KotaReferensiPage} />
                <Route path="kecamatan" Component={KecamatanReferensiPage} />
                <Route path="negara" Component={NegaraReferensiPage} />
                <Route path="provinsi" Component={ProvinsiReferensiPage} />
              </Route>

              {/* REFERENSI > PELENGKAP */}
              <Route path="pelengkap">
                <Route path="agama" Component={AgamaPage} />
                <Route
                  path="status-pernikahan"
                  Component={StatusPernikahanPage}
                />
                <Route
                  path="jenjang-pendidikan"
                  Component={JenjangPendidikanPage}
                />
                <Route path="bank" Component={BankPage} />
                <Route path="suku" Component={SukuPage} />
                <Route path="golongan-darah" Component={GolonganDarahPage} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

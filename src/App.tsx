import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import DasboardPage from "./pages/admin/dasboard";
import PegawaiPage from "./pages/admin/pegawai";
import DataPegawaiPage from "./pages/admin/dataPegawai";
import HubunganKerjaPegawaiPage from "./pages/admin/operasional/hubunganKerjaPegawai";
import SettingKehadiranPage from "./pages/admin/operasional/kehadiran/settingKehadiran";
import ShiftKerjaPage from "./pages/admin/operasional/kehadiran/shiftKerja";
import DataShiftKerjaPage from "./pages/admin/operasional/kehadiran/dataShiftKerja";
import DaftarMonitoringKehadiranPage from "./pages/admin/operasional/kehadiran/daftarMonitoringKehadiran";
import RekapKehadiranPage from "./pages/admin/operasional/kehadiran/rekapKehadiran";
import InputKehadiranPage from "./pages/admin/operasional/kehadiran/InputKehadiran";
import MonitoringRekapKehadiranPage from "./pages/admin/operasional/monitoringKegiatan";
import MonitoringSisaCutiPage from "./pages/admin/operasional/cuti/monitoringSisaCuti";
import PermohonanIzinPage from "./pages/admin/operasional/cuti/permohonanIzin";
import PeriodeCutiPage from "./pages/admin/operasional/cuti/periodeCuti";
import PermohonanCutiPage from "./pages/admin/operasional/cuti/permohonanCuti";
import PelanggaranPage from "./pages/admin/operasional/kompensasi/pelanggaran";
import DetailRiwayatPelanggaranPage from "./pages/admin/operasional/kompensasi/detailRiwayatPelanggaran";
import DasboardPageUser from "./pages/dasboard";
import RiwayatKehadiranPage from "./pages/riwayatKehadiran";
import ModulePage from "./pages/module";
import RiwayatPenghargaanPage from "./pages/admin/operasional/kompensasi/penghargaan/riwayatPenghargaan";
import DetailPenghargaanPage from "./pages/admin/operasional/kompensasi/penghargaan/detailPenghargaan";
import DokumenInternalPage from "./pages/admin/operasional/kompensasi/dokumenInternal";
import DetailDokumenInternalPage from "./pages/admin/operasional/kompensasi/detailDokumenInternal";
import SettingValidasiPage from "./pages/admin/validasiData/settingValidasi";
import KeluargaPage from "./pages/admin/validasiData/keluarga";
import MonitoringPage from "./pages/admin/validasiData/monitoring";
import HomebasePage from "./pages/admin/validasiData/kepegawaian/homebase";
import HubunganKerjaKepegawaianPage from "./pages/admin/validasiData/kepegawaian/hubunganKerjaKepegawaian";
import JabatanAkademikPage from "./pages/admin/validasiData/kepegawaian/jabatanAkademik";
import JabatanFungionalPage from "./pages/admin/validasiData/kepegawaian/jabatanFungsional";
import JabatanStrukturalPage from "./pages/admin/validasiData/kepegawaian/jabatanStruktural";
import PangkatPage from "./pages/admin/validasiData/kepegawaian/pangkat";
import SertifikasiPage from "./pages/admin/validasiData/kompetensi/sertifikasi";
import TesPage from "./pages/admin/validasiData/kompetensi/tes";
import BahanAjarPage from "./pages/admin/validasiData/pelaksanaanPendidikan/bahanAjar";
import DataseringPage from "./pages/admin/validasiData/pelaksanaanPendidikan/datasering";
import OrasiIlmiahPage from "./pages/admin/validasiData/pelaksanaanPendidikan/orasiIlmiah";
import TugasTambahanPage from "./pages/admin/validasiData/pelaksanaanPendidikan/tugasTambahan";
import PatenPage from "./pages/admin/validasiData/pelaksanaanPenelitian/paten";
import PenelitianPage from "./pages/admin/validasiData/pelaksanaanPenelitian/penelitian";
import PublikasiPage from "./pages/admin/validasiData/pelaksanaanPenelitian/publikasi";
import JabatanStrukturalKepegawaianPage from "./pages/admin/validasiData/pelaksanaanPengabdian/jabatanStruktural";
import PembicaraPage from "./pages/admin/validasiData/pelaksanaanPengabdian/pembicara";
import PengabdianPage from "./pages/admin/validasiData/pelaksanaanPengabdian/pengabdian";
import KemampuanBahasaPage from "./pages/admin/validasiData/pengembangan/kemampuanBahasa";
import OrganisasiPage from "./pages/admin/validasiData/pengembangan/organisasi";
import OrganisasiPenunjangPage from "./pages/admin/validasiData/penunjang/organisasi";
import PenghargaanPenunjangPage from "./pages/admin/validasiData/penunjang/penghargaan";
import PenunjangLainPage from "./pages/admin/validasiData/penunjang/penunjangLain";
import KegiatanHarianPage from "./pages/kegiatanHarian";
import JenisLuaranPage from "./pages/admin/referensi/aktifitas/jenisLuaran";
import JenisPelanggaranReferensiPage from "./pages/admin/referensi/aktifitas/jenisPelanggaran";
import JenisPengabdianReferensiPage from "./pages/admin/referensi/aktifitas/jenisPengabdian";
import JenisPenghargaanReferensiPage from "./pages/admin/referensi/aktifitas/jenisPenghargaan";
import JenisPublikasiReferensiPage from "./pages/admin/referensi/aktifitas/jenisPublikasi";
import JenisSertifikasiReferensiPage from "./pages/admin/referensi/aktifitas/jenisSertifikasi";
import JenisTesReferensiPage from "./pages/admin/referensi/aktifitas/jenisTes";
import OutputPenelitianReferensiPage from "./pages/admin/referensi/aktifitas/outputPenelitian";
import JamKerjaReferensiPage from "./pages/admin/referensi/kehadiran/jamKerja";
import JenisCutiReferensiPage from "./pages/admin/referensi/kehadiran/jenisCuti";
import JenisHariReferensiPage from "./pages/admin/referensi/kehadiran/jenisHari";
import JenisIzinReferensiPage from "./pages/admin/referensi/kehadiran/jenisIzin";
import JenisKehadiranReferensiPage from "./pages/admin/referensi/kehadiran/jenisKehadiran";
import HariLiburReferensiPage from "./pages/admin/referensi/kehadiran/hariLibur";
import BiodataPage from "./pages/admin/DetailPegawai/Biodata";
import DetailKeluargaPage from "./pages/admin/DetailPegawai/Keluarga";
import CutiPage from "./pages/operasional/pengajuan/cuti";
import IzinPage from "./pages/operasional/pengajuan/Izin";
import { Toaster } from "@/components/ui/sonner";
import BeritaOperasionalUserPage from "./pages/operasional/berita";
import DetailDokumenInternalUserPage from "./pages/operasional/dokumenInternal/detailDokumen";
import DokumenInternalUserPage from "./pages/operasional/dokumenInternal/dokumen";
import KepegawaianHomebasePage from "./pages/admin/DetailPegawai/kepegawaian/homebase";
import KepegawaianPangkatPage from "./pages/admin/DetailPegawai/kepegawaian/pangkat";
import KepegawaianJabatanAkademikPage from "./pages/admin/DetailPegawai/kepegawaian/jabatanAkademik";
import KepegawaianJabatanFungsionalPage from "./pages/admin/DetailPegawai/kepegawaian/jabatanFungsional";
import KepegawaianJabatanStrukturalPage from "./pages/admin/DetailPegawai/kepegawaian/jabatanStruktural";
import KepegawaianHubunganKerjaPage from "./pages/admin/DetailPegawai/kepegawaian/hubunganKerja";
import KepegawaianPendidikanFormalPage from "./pages/admin/DetailPegawai/kualifikasi/pendidikanFormal";
import KepegawaianDiklatPage from "./pages/admin/DetailPegawai/kualifikasi/diklat";
import KepegawaianRiwayatPekerjaanPage from "./pages/admin/DetailPegawai/kualifikasi/riwayatPekerjaan";
import KepegawaianRiwayatSertifikasiPage from "./pages/admin/DetailPegawai/kompetensi/riwayatSertifikasi";
import KepegawaianRiwayatTesPage from "./pages/admin/DetailPegawai/kompetensi/riwayatTes";
import KepegawaianPresensiPage from "./pages/admin/DetailPegawai/presensi";
import KepegawaianPengajaranPage from "./pages/admin/DetailPegawai/pendidikan/pengajaran";
import KepegawaianBimbinganMahasiswaPage from "./pages/admin/DetailPegawai/pendidikan/bimbingan";
import KepegawaianTugasTambahanPage from "./pages/admin/DetailPegawai/pendidikan/tugasTambahan";
import KepegawaianPengujianMahasiswaPage from "./pages/admin/DetailPegawai/pendidikan/pengujianMahasiswa";
import KepegawaianVisitingscientistPage from "./pages/admin/DetailPegawai/pendidikan/visitingscientist";
import KepegawaianPembinaanMahasiswaPage from "./pages/admin/DetailPegawai/pendidikan/pembinaanMahasiswa";
import KepegawaianDataseringPage from "./pages/admin/DetailPegawai/pendidikan/datasering";
import KepegawaianBahanAjarPage from "./pages/admin/DetailPegawai/pendidikan/bahanAjar";
import KepegawaianOrasiIlmiahPage from "./pages/admin/DetailPegawai/pendidikan/orasiIlmiah";
import KepegawaianPembimbingDosenPage from "./pages/admin/DetailPegawai/pendidikan/pembimbingDosen";
import KepegawaianPenelitianPage from "./pages/admin/DetailPegawai/penelitian/penelitian";
import KepegawaianPublikasiPage from "./pages/admin/DetailPegawai/penelitian/publikasi";
import KepegawaianPatenHkiPage from "./pages/admin/DetailPegawai/penelitian/patenHki";
import KepegawaianPengabdianPage from "./pages/admin/DetailPegawai/pengabdian/pengabdian";
import KepegawaianPengelolaJurnalPage from "./pages/admin/DetailPegawai/pengabdian/pengelolaJurnal";
import KepegawaianPembicaraPage from "./pages/admin/DetailPegawai/pengabdian/pembicara";
import KepegawaianJabatanTugasPage from "./pages/admin/DetailPegawai/pengabdian/jabatanTugas";
import KepegawaianAnggotaProfesiPage from "./pages/admin/DetailPegawai/penunjang/anggotaProfesi";
import KepegawaianPenghargaanPage from "./pages/admin/DetailPegawai/penunjang/penghargaan";
import KepegawaianPenunjangLainPage from "./pages/admin/DetailPegawai/penunjang/penunjangLain";
import KepegawaianOrganisasiPage from "./pages/admin/DetailPegawai/pengembangan/organisasi";
import KepegawaianKemampuanBahasaPage from "./pages/admin/DetailPegawai/pengembangan/kemampuanBahasa";
import KepegawaianKompensasiPage from "./pages/admin/DetailPegawai/kompensasi";
import KepegawaianCutiPage from "./pages/admin/DetailPegawai/permohonan/cuti";
import KepegawaianIzinPage from "./pages/admin/DetailPegawai/permohonan/izin";
import ElesonPage from "./pages/admin/referensi/kepegawaian/eleson";
import GelarAkademikPage from "./pages/admin/referensi/kepegawaian/gelarAkademik";
import HubunganKerjaReferensiPage from "./pages/admin/referensi/kepegawaian/hubunganKerja";
import JabatanAkademikReferensiPage from "./pages/admin/referensi/kepegawaian/jabatanAkademik";
import JabatanFungsionalReferensiPage from "./pages/admin/referensi/kepegawaian/jabatanFungsional";
import JabatanStrukturalReferensiPage from "./pages/admin/referensi/kepegawaian/jabatanStruktural";
import DetailJabatanFungsionalReferensiPage from "./pages/admin/referensi/kepegawaian/jabatanFungsional/detailJabatanFungsional";
import DetailJabatanStrukturalReferensiPage from "./pages/admin/referensi/kepegawaian/jabatanStruktural/detailJabatanStruktural";
import JenisKenaikanPangkatReferensiPage from "./pages/admin/referensi/kepegawaian/jenisKenaikanPangkat";
import JenisSkReferensiPage from "./pages/admin/referensi/kepegawaian/jenisSK";
import MediaPublikasiReferensiPage from "./pages/admin/referensi/kepegawaian/mediaPublikasi";
import PangkatReferensiPage from "./pages/admin/referensi/kepegawaian/pangkat";
import RumpunBidangIlmuReferensiPage from "./pages/admin/referensi/kepegawaian/rumpunBidangIlmu";
import StatusKeaktifanReferensiPage from "./pages/admin/referensi/kepegawaian/statusKeaktifan";
import UnitKerjaReferensiPage from "./pages/admin/referensi/kepegawaian/unitKerja";
import DetailUnitKerjaReferensiPage from "./pages/admin/referensi/kepegawaian/unitKerja/detailUnitKerja";
import KotaReferensiPage from "./pages/admin/referensi/wilayah/kota";
import KecamatanReferensiPage from "./pages/admin/referensi/wilayah/kecamatan";
import NegaraReferensiPage from "./pages/admin/referensi/wilayah/negara";
import ProvinsiReferensiPage from "./pages/admin/referensi/wilayah/provinsi";
import HomebaseUserPage from "./pages/dataRiwayat/kepegawaian/homebase";
import JabatanAkademikUserPage from "./pages/dataRiwayat/kepegawaian/jabatanAkademik";
import PangkatUserPage from "./pages/dataRiwayat/kepegawaian/pangkat";
import PendidikanFormalUserPage from "./pages/dataRiwayat/kualifikasi/pendidikanFormal";
import DiklatUserPage from "./pages/dataRiwayat/kualifikasi/diklat";
import RiwayatPekerjaanUserPage from "./pages/dataRiwayat/kualifikasi/riwayatPekerjaan";
import DetailPangkatUserPage from "./pages/dataRiwayat/kepegawaian/pangkat/detailPangkat";
import DetailJabatanAkademikUserPage from "./pages/dataRiwayat/kepegawaian/jabatanAkademik/detailJabatanAkademik";
import DetailPendidikanFormalUserPage from "./pages/dataRiwayat/kualifikasi/pendidikanFormal/detailPendidikanFormal";
import DetailDiklatUserPage from "./pages/dataRiwayat/kualifikasi/diklat/detailDiklat";
import DetailRiwayatPekerjaanUserPage from "./pages/dataRiwayat/kualifikasi/riwayatPekerjaan/detailRiwayatPekerjaan";
import ForgetPasswordPage from "./pages/auth/forgetPassword";
import JabatanFungsionalUserPage from "./pages/dataRiwayat/kepegawaian/jabatanfungsional";
import DetailJabatanFungsionalUserPage from "./pages/dataRiwayat/kepegawaian/jabatanfungsional/detailJabatanFungsional";
import JabatanStrukturalUserPage from "./pages/dataRiwayat/kepegawaian/jabatanStruktular";
import DetailJabatanStrukturalUserPage from "./pages/dataRiwayat/kepegawaian/jabatanStruktular/detailJabatanStruktural";
import BahanAjarUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/bahanAjar";
import DetailBahanAjarUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/bahanAjar/detailBahanAjar";
import DataseringUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/datasering";
import DetailDataseringUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/datasering/detailDatasering";
import OrasiIlmiahUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/orasiIlmiah";
import DetailOrasiIlmiahUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/orasiIlmiah/detailOrasiIlmiah";
import BimbinganMahasiswaUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/bimbinganMahasiswa";
import PembimbingDosenUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/pembimbingDosen";
import PembinaanMahasiswaUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/pembinaanMahasiswa";
import PengajaranUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/pengajaran";
import PengujianMahasiswaUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/pengujianMahasiswa";
import TugasTambahanUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/tugasTambahan";
import VisitingScientistUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/visitingScientist";
import DetailTugasTambahanUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/tugasTambahan/detailTugasTambahan";
import DetailVisitingScientistUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/visitingScientist/detailVisitingScientist";
import DetailPembimbingDosenUserPage from "./pages/dataRiwayat/PelaksanaanPendidikan/pembimbingDosen/detailPembimbingDosen";
import SertifikasiUserPage from "./pages/dataRiwayat/Kompetensi/Sertifikasi";
import DetailSertifikasiUserPage from "./pages/dataRiwayat/Kompetensi/Sertifikasi/detailSertifikasi";
import TesUserPage from "./pages/dataRiwayat/Kompetensi/Tes";
import DetailTesUserPage from "./pages/dataRiwayat/Kompetensi/Tes/detailTes";
import PatenUserPage from "./pages/dataRiwayat/PelaksanaanPenelitian/Paten";
import DetailPatenUserPage from "./pages/dataRiwayat/PelaksanaanPenelitian/Paten/detailPaten";
import PenelitianUserPage from "./pages/dataRiwayat/PelaksanaanPenelitian/Penelitian";
import DetailPenelitianUserPage from "./pages/dataRiwayat/PelaksanaanPenelitian/Penelitian/detailPenelitian";
import PublikasiUserPage from "./pages/dataRiwayat/PelaksanaanPenelitian/Publikasi";
import DetailPublikasiUserPage from "./pages/dataRiwayat/PelaksanaanPenelitian/Publikasi/detailPublikasi";
import KemampuanBahasaUserPage from "./pages/dataRiwayat/PengembanganDiri/KemampuanBahasa";
import DetailKemampuanBahasaUserPage from "./pages/dataRiwayat/PengembanganDiri/KemampuanBahasa/detailKemampuanBahasa";
import OrganisasiUserPage from "./pages/dataRiwayat/PengembanganDiri/Organisasi";
import PelanggaranUserPage from "./pages/dataRiwayat/Kompensasi/Pelanggaran";
import HubunganKerjaUserPage from "./pages/dataRiwayat/kepegawaian/hubunganKerja";
import DetailHubunganKerjaUserPage from "./pages/dataRiwayat/kepegawaian/hubunganKerja/detailHubunganKerja";
import PengabdianUserPage from "./pages/dataRiwayat/PelaksanaanPengabdian/Pengabdian";
import DetailPengabdianUserPage from "./pages/dataRiwayat/PelaksanaanPengabdian/Pengabdian/DetailPengabdian";
import BeritaPage from "./pages/admin/operasional/berita";
import PembicaraUserPage from "./pages/dataRiwayat/PelaksanaanPengabdian/Pembicara";
import DetailPembicaraUserPage from "./pages/dataRiwayat/PelaksanaanPengabdian/Pembicara/DetailPembicara";
import PengelolaJurnalUserPage from "./pages/dataRiwayat/PelaksanaanPengabdian/PengelolaJurnal";
import DetailPengelolaJurnalUserPage from "./pages/dataRiwayat/PelaksanaanPengabdian/PengelolaJurnal/DetailPengelolaJurnal";
import AnggotaProfesiUserPage from "./pages/dataRiwayat/Penunjang/AnggotaProfesi";
import DetailAnggotaProfesiUserPage from "./pages/dataRiwayat/Penunjang/AnggotaProfesi/DetailAnggotaProfesi";
import PenghargaanUserPage from "./pages/dataRiwayat/Penunjang/Penghargaan";
import DetailPenghargaanUserPage from "./pages/dataRiwayat/Penunjang/Penghargaan/DetailPenghargaan";
import PenunjangLainUserPage from "./pages/dataRiwayat/Penunjang/PenunjangLain";
import DetailPenunjangLainUserPage from "./pages/dataRiwayat/Penunjang/PenunjangLain/DetailPenunjangLain";
import AnakUserPage from "./pages/dataRiwayat/Keluarga/Anak";
import DetailAnakUserPage from "./pages/dataRiwayat/Keluarga/Anak/detailAnak";
import OrangtuaUserPage from "./pages/dataRiwayat/Keluarga/Orangtua";
import DetailOrangtuaUserPage from "./pages/dataRiwayat/Keluarga/Orangtua/detailOrangtua";

import { useHydration } from "./hooks/useHydration";
import LoadingSpinner from "./components/blocks/LoadingSpinner";
import LoadingText from "./components/blocks/LoadingText";
import BiodataPageUser from "./pages/biodata";

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

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" Component={ModulePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/forget-password" Component={ForgetPasswordPage} />

        {/* USER PAGES */}
        <Route path="/dasboard" Component={DasboardPageUser} />
        <Route path="/biodata" Component={BiodataPageUser} />

        {/* KEHADIRAN */}
        <Route path="/kehadiran">
          <Route path="riwayat-kehadiran" Component={RiwayatKehadiranPage} />
          <Route path="kegiatan-harian" Component={KegiatanHarianPage} />
        </Route>

        {/* OPERASIONAL */}
        <Route path="/operasional">
          <Route path="berita" Component={BeritaOperasionalUserPage} />

          <Route
            path="detail-dokumen-internal"
            Component={DetailDokumenInternalUserPage}
          />
          <Route path="dokumen-internal" Component={DokumenInternalUserPage} />

          <Route path="pengajuan">
            <Route path="cuti" Component={CutiPage} />
            <Route path="izin" Component={IzinPage} />
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
              path="jabatan-fungsional"
              Component={JabatanFungsionalUserPage}
            />
            <Route
              path="detail-jabatan-fungsional"
              Component={DetailJabatanFungsionalUserPage}
            />
            <Route
              path="jabatan-struktural"
              Component={JabatanStrukturalUserPage}
            />
            <Route
              path="detail-jabatan-struktural"
              Component={DetailJabatanStrukturalUserPage}
            />
            <Route path="hubungan-kerja" Component={HubunganKerjaUserPage} />
            <Route
              path="detail-hubungan-kerja"
              Component={DetailHubunganKerjaUserPage}
            />

            <Route path="pangkat" Component={PangkatUserPage} />
            <Route path="detail-pangkat" Component={DetailPangkatUserPage} />
          </Route>

          {/* DATA RIWAYAT > KELUARGA */}
          <Route path="keluarga">
            <Route path="anak" Component={AnakUserPage} />
            <Route path="detail-anak" Component={DetailAnakUserPage} />
            <Route path="orangtua" Component={OrangtuaUserPage} />
            <Route path="detail-orangtua" Component={DetailOrangtuaUserPage} />
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
            <Route path="diklat" Component={DiklatUserPage} />
            <Route path="detail-diklat" Component={DetailDiklatUserPage} />
            <Route
              path="riwayat-pekerjaan"
              Component={RiwayatPekerjaanUserPage}
            />
            <Route
              path="detail-riwayat-pekerjaan"
              Component={DetailRiwayatPekerjaanUserPage}
            />
          </Route>

          {/* DATA RIWAYAT > KOMPETENSI */}
          <Route path="kompetensi">
            <Route path="sertifikasi" Component={SertifikasiUserPage} />
            <Route
              path="detail-sertifikasi"
              Component={DetailSertifikasiUserPage}
            />
            <Route path="tes" Component={TesUserPage} />
            <Route path="detail-tes" Component={DetailTesUserPage} />
          </Route>

          {/* DETAIL RIWAYAT > PELAKSANAAN PENELITIAN */}
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
            <Route path="organisasi" Component={OrganisasiUserPage} />
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
            <Route path="pembicara" Component={PembicaraUserPage} />
            <Route
              path="detail-pembicara"
              Component={DetailPembicaraUserPage}
            />
            <Route
              path="pengelola-jurnal"
              Component={PengelolaJurnalUserPage}
            />
            <Route
              path="detail-pengelola-jurnal"
              Component={DetailPengelolaJurnalUserPage}
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
            <Route path="anggota-profesi" Component={AnggotaProfesiUserPage} />
            <Route
              path="detail-anggota-profesi"
              Component={DetailAnggotaProfesiUserPage}
            />

            <Route path="penghargaan" Component={PenghargaanUserPage} />
            <Route
              path="detail-penghargaan"
              Component={DetailPenghargaanUserPage}
            />

            <Route path="penunjang-lain" Component={PenunjangLainUserPage} />
            <Route
              path="detail-penunjang-lain"
              Component={DetailPenunjangLainUserPage}
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
              path="bimbingan-mahasiswa"
              Component={BimbinganMahasiswaUserPage}
            />

            <Route path="datasering" Component={DataseringUserPage} />
            <Route
              path="detail-datasering"
              Component={DetailDataseringUserPage}
            />
            <Route path="orasi-ilmiah" Component={OrasiIlmiahUserPage} />
            <Route
              path="detail-orasi-ilmiah"
              Component={DetailOrasiIlmiahUserPage}
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
              path="visiting-scientist"
              Component={VisitingScientistUserPage}
            />
            <Route
              path="detail-visiting-scientist"
              Component={DetailVisitingScientistUserPage}
            />
          </Route>
        </Route>

        {/* ADMIN PAGES */}
        <Route path="/admin">
          <Route path="dasboard" Component={DasboardPage} />
          <Route path="pegawai" Component={PegawaiPage} />
          <Route path="pegawai/data-pegawai" Component={DataPegawaiPage} />

          {/* DETAIL PEGAWAI */}
          <Route path="detail-pegawai">
            <Route path="biodata/:id" Component={BiodataPage} />
            <Route path="keluarga/:id" Component={DetailKeluargaPage} />
            <Route path="presensi/:id" Component={KepegawaianPresensiPage} />

            {/* DETAIL PEGAWAI > KEPEGAWAIAN */}
            <Route path="kepegawaian">
              <Route path="homebase/:id" Component={KepegawaianHomebasePage} />
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
            <Route path="setting-kehadiran" Component={SettingKehadiranPage} />
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
              <Route path="penghargaan" Component={RiwayatPenghargaanPage} />
              <Route
                path="detail-penghargaan"
                Component={DetailPenghargaanPage}
              />
              <Route path="dokumen-internal" Component={DokumenInternalPage} />
              <Route
                path="detail-dokumen-internal"
                Component={DetailDokumenInternalPage}
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
              <Route path="jabatan-akademik" Component={JabatanAkademikPage} />
              <Route
                path="jabatan-fungsional"
                Component={JabatanFungionalPage}
              />
              <Route
                path="jabatan-struktural"
                Component={JabatanStrukturalPage}
              />
              <Route path="pangkat" Component={PangkatPage} />
            </Route>

            {/* VALIDASI > KOMPETENSI */}
            <Route path="kompetensi">
              <Route path="sertifikasi" Component={SertifikasiPage} />
              <Route path="tes" Component={TesPage} />
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
              <Route path="kemampuan-bahasa" Component={KemampuanBahasaPage} />
              <Route path="organisasi" Component={OrganisasiPage} />
            </Route>

            {/* VALIDASI > PENUNJANG */}
            <Route path="penunjang">
              <Route path="organisasi" Component={OrganisasiPenunjangPage} />
              <Route path="penghargaan" Component={PenghargaanPenunjangPage} />
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
                path="jabatan-struktural"
                Component={JabatanStrukturalReferensiPage}
              />
              <Route
                path="jabatan-struktural/detail-jabatan-struktural"
                Component={DetailJabatanStrukturalReferensiPage}
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
            </Route>

            {/* REFERENSI > WILAYAH */}
            <Route path="wilayah">
              <Route path="kota" Component={KotaReferensiPage} />
              <Route path="kecamatan" Component={KecamatanReferensiPage} />
              <Route path="negara" Component={NegaraReferensiPage} />
              <Route path="provinsi" Component={ProvinsiReferensiPage} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

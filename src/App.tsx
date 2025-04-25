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

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" Component={ModulePage} />
        <Route path="/login" Component={LoginPage} />
        {/* for user path */}
        <Route path="/dasboard" Component={DasboardPageUser} />
        <Route path="/riwayat-kehadiran" Component={RiwayatKehadiranPage} />
        <Route path="/kegiatan-harian" Component={KegiatanHarianPage} />
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

        {/* for admin path */}
        <Route path="/admin">
          <Route path="dasboard" Component={DasboardPage} />
          <Route path="pegawai" Component={PegawaiPage} />
          <Route path="pegawai/data-pegawai" Component={DataPegawaiPage} />

          <Route path="detail-pegawai">
            <Route path="biodata/:id" Component={BiodataPage} />
            <Route path="keluarga/:id" Component={DetailKeluargaPage} />
            <Route path="presensi/:id" Component={KepegawaianPresensiPage} />

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

            <Route
              path="kompensasi/:id"
              Component={KepegawaianKompensasiPage}
            />

            <Route path="permohonan">
              <Route path="cuti/:id" Component={KepegawaianCutiPage} />
              <Route path="izin/:id" Component={KepegawaianIzinPage} />
            </Route>
          </Route>

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

            <Route path="cuti">
              <Route
                path="monitoring-sisa-cuti"
                Component={MonitoringSisaCutiPage}
              />
              <Route path="permohonan-izin" Component={PermohonanIzinPage} />
              <Route path="periode-cuti" Component={PeriodeCutiPage} />
              <Route path="permohonan-cuti" Component={PermohonanCutiPage} />
            </Route>

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

          <Route path="validasi-data">
            <Route path="setting-validasi" Component={SettingValidasiPage} />
            <Route path="keluarga" Component={KeluargaPage} />
            <Route path="monitoring" Component={MonitoringPage} />

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

            <Route path="kompetensi">
              <Route path="sertifikasi" Component={SertifikasiPage} />
              <Route path="tes" Component={TesPage} />
            </Route>

            <Route path="pelaksanaan-pendidikan">
              <Route path="bahan-ajar" Component={BahanAjarPage} />
              <Route path="datasering" Component={DataseringPage} />
              <Route path="orasi-ilmiah" Component={OrasiIlmiahPage} />
              <Route path="tugas-tambahan" Component={TugasTambahanPage} />
            </Route>

            <Route path="pelaksanaan-penelitian">
              <Route path="paten" Component={PatenPage} />
              <Route path="penelitian" Component={PenelitianPage} />
              <Route path="publikasi" Component={PublikasiPage} />
            </Route>

            <Route path="pelaksanaan-pengabdian">
              <Route
                path="jabatan-struktural"
                Component={JabatanStrukturalKepegawaianPage}
              />
              <Route path="pembicara" Component={PembicaraPage} />
              <Route path="pengabdian" Component={PengabdianPage} />
            </Route>

            <Route path="pengembangan">
              <Route path="kemampuan-bahasa" Component={KemampuanBahasaPage} />
              <Route path="organisasi" Component={OrganisasiPage} />
            </Route>

            <Route path="penunjang">
              <Route path="organisasi" Component={OrganisasiPenunjangPage} />
              <Route path="penghargaan" Component={PenghargaanPenunjangPage} />
              <Route path="penunjang-lain" Component={PenunjangLainPage} />
            </Route>
          </Route>

          <Route path="referensi">
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
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

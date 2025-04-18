import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import DasboardPage from "./pages/admin/dasboard";
import PegawaiPage from "./pages/admin/pegawai";
import DetailPegawaiPage from "./pages/admin/detailPegawai";
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
import KehadiranPage from "./pages/kehadiran";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={ModulePage} />
        <Route path="/login" Component={LoginPage} />
        {/* for user path */}
        <Route path="/dasboard" Component={DasboardPageUser} />
        <Route path="/kehadiran" Component={KehadiranPage} />

        {/* for admin path */}
        <Route path="/admin">
          <Route path="dasboard" Component={DasboardPage} />
          <Route path="pegawai" Component={PegawaiPage} />
          <Route path="pegawai/:pegawaiID" Component={DetailPegawaiPage} />

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
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

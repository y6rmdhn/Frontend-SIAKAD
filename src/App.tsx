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

function App() {
  return (
    <>
      <Routes>
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
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

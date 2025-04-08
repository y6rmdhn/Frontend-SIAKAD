import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import DasboardPage from "./pages/dasboard";
import PegawaiPage from "./pages/pegawai";
import DetailPegawaiPage from "./pages/detailPegawai";
import HubunganKerjaPegawaiPage from "./pages/operasional/hubunganKerjaPegawai";
import SettingKehadiranPage from "./pages/operasional/kehadiran/settingKehadiran";
import ShiftKerjaPage from "./pages/operasional/kehadiran/shiftKerja";
import DataShiftKerjaPage from "./pages/operasional/kehadiran/dataShiftKerja";
import DaftarMonitoringKehadiranPage from "./pages/operasional/kehadiran/daftarMonitoringKehadiran";
import RekapKehadiranPage from "./pages/operasional/kehadiran/rekapKehadiran";

function App() {
  return (
    <>
      <Routes>
        <Route path="/gate/login" Component={LoginPage} />
        <Route path="/gate/dasboard" Component={DasboardPage} />
        <Route path="/gate/pegawai" Component={PegawaiPage} />
        <Route path="/gate/pegawai/:pegawaiID" Component={DetailPegawaiPage} />

        <Route path="/gate/operasional">
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
          <Route path="input-kehadiran" Component={RekapKehadiranPage} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

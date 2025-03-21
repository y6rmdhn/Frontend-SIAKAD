import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import DasboardPage from "./pages/dasboard";
import PegawaiPage from "./pages/pegawai";

function App() {

  return (
    <>
      <Routes>
        <Route path="/gate/login" Component={LoginPage} />
        <Route path="/gate/dasboard" Component={DasboardPage} />
        <Route path="/gate/pegawai" Component={PegawaiPage} />
      </Routes> 
    </>
  )
}

export default App

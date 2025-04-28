const Status = () => {
  return (
    <div className="w-full bg-[#F6E9E9] px-10 py-6 mt-16 mb-10">
      <h1 className="text-2xl font-semibold">Status</h1>

      <div className="grid grid-cols-4 mt-7">
        <ul>
          <li>-- Pilih Status --</li>
          <li>M5 : Mangkir 5 Kali Berturut - turut</li>
          <li>SB : Kesalahan Berat</li>
        </ul>
        <ul>
          <li>AA : Aktif</li>
          <li>MD : Mengundurkan Diri</li>
          <li>PL : Pelanggaran</li>
          <li>SP : Sakit Berkepanjangan</li>
        </ul>
        <ul>
          <li>CL : Cuti Luar Tanggungan</li>
          <li>PD : Pensiun Dini</li>
          <li>PN : Pensiun Normal</li>
          <li>TW : Ditahan Pihak Berwajib</li>
        </ul>
        <ul>
          <li>KH : Kontrak Habis</li>
          <li>M : Meninggal Dunia</li>
          <li>PH : PHK</li>
          <li>PS : Pernikahan Sesama Karyawan</li>
          <li>TB : Tugas Belajar</li>
        </ul>
      </div>
    </div>
  );
};

export default Status;

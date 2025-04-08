const formFieldsDataShiftKerja = [
  { name: "nama-shift", label: "Nama Shift" },
  {
    name: "senin",
    label: "Senin",
    placeholder: "--Pilih Senin--",
    select: true,
  },
  {
    name: "selasa",
    label: "Selasa",
    placeholder: "--Pilih Selasa--",
    select: true,
  },
  {
    name: "rabu",
    label: "Rabu",
    placeholder: "--Pilih Rabu--",
    select: true,
  },
  {
    name: "kamis",
    label: "Kamis",
    placeholder: "--Pilih Kamis--",
    select: true,
  },
  {
    name: "jumat",
    label: "Jumat",
    placeholder: "--Pilih Jumat--",
    select: true,
  },
  {
    name: "sabtu",
    label: "Sabtu",
    placeholder: "--Pilih Sabtu--",
    select: true,
  },
  {
    name: "minggu",
    label: "Minggu",
    placeholder: "--Pilih Minggu--",
    select: true,
  },
];

const formFieldsDaftarMonitoringKehadiran = [
  {
    name: "unit-kerja",
    label: "Unit Kerja",
    placeholder: "--041001 Universitas Ibn Khaldun--",
    select: true,
  },
  {
    name: "status-presensi",
    label: "Status Presensi",
    placeholder: "--Semua Status Presensi--",
    select: true,
  },
  {
    name: "tanggal",
    label: "Tanggal",
    type: "date",
  },
];

export default {
  formFieldsDataShiftKerja,
  formFieldsDaftarMonitoringKehadiran,
};

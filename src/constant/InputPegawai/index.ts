// Data form fields
const formFieldsBiodata = [
  { name: "nip", label: "NIP", required: true },
  { name: "agama", label: "Agama", required: true },
  { name: "namaLengkap", label: "Nama Lengkap", required: true },
  { name: "tempatLahir", label: "Tempat Lahir" },
  { name: "gelarDepan", label: "Gelar Depan" },
  { name: "tglLahir", label: "Tgl Lahir" },
  { name: "gelarBelakang", label: "Gelar Belakang" },
  { name: "statusNikah", label: "Status Nikah" },
];

const formFieldsKepegawaian = [
  {
    name: "unitKerja1",
    label: "Unit Kerja",
    required: true,
    select: true,
    placeholder: "Universitas Ibn Khaldun",
  },
  {
    name: "statusAktif",
    label: "Status Aktif",
    required: true,
    select: true,
    placeholder: "--Pilih Status Aktif--",
  },
  {
    name: "hubunganKerja",
    label: "Hubungan Kerja",
    required: true,
    select: true,
    placeholder: "--Pilih Hubungan Kerja--",
  },
  { name: "emailPerguruanTinggi", label: "Email Perguruan Tinggi" },
  { name: "noAkunFinger", label: "No Akun Finger" },
  {
    name: "unitKerja2",
    label: "Unit Kerja",
    required: true,
    select: true,
    placeholder: "--Pilih Jabatan Akademik--",
  },
];

const formFieldsAlamat = [
  { name: "fileSertifDosen", label: "File Sertifikasi Dosen", type: "file" },
  {
    name: "provinsi",
    label: "Provinsi",
    placeholder: "--Pilih Provinsi--",
    select: true,
  },
  { name: "kota", label: "Kota", placeholder: "--Pilih Kota--", select: true },
  {
    name: "kecamatan",
    label: "Kecamatan",
    placeholder: "--Pilih Kecamatan--",
    select: true,
  },
  { name: "alamat", label: "Alamat / Jalan" },
  { name: "kodePos", label: "Kode Pos" },
  {
    name: "jarakRumah",
    label: "Jarak Rumah (KM)",
    placeholder: "Tuliskan jarak dalam KM",
  },
  { name: "noTelpon", label: "No.Telpon" },
  { name: "noTelponKantor", label: "No.Telpon Kantor" },
  { name: "noTelponUtama", label: "No.Hp Utama" },
  {
    name: "kepemilikanNoHpUtama",
    label: "Kepemilikan No.Hp Utama",
    placeholder: "--Pilih Kepemilikan No HP Utama--",
    select: true,
  },
];

const formFieldsDokumen = [
  { name: "file-rekening", label: "File Rekening", type: "file" },
  { name: "kapreg", label: "KAPREG" },
  { name: "file-kaprek", label: "File Kapreg", type: "file" },
  { name: "npwp", label: "NPWP" },
  { name: "file-npwp", label: "File NPWP", type: "file" },
  { name: "no-bpjs", label: "No BPJS", placeholder: "Masukan Angka" },
  {
    name: "no-bpjs-ketenagakerjaan",
    label: "No.BPJS Ketenagakerjaan",
    placeholder: "Masukan Angka",
  },
  {
    name: "no-bpjs-pensiun",
    label: "No.BPJS Pensiun",
    placeholder: "Masukan Angka",
  },
  { name: "file-bpjs", label: "File BPJS", type: "file" },
  {
    name: "file-bpjs-ketenagakerjaan",
    label: "File BPJS Ketenagakerjaan",
    type: "file",
  },
];

const formFieldsLainLain = [
  { name: "file-bpjs-pensiun", label: "File BPJS Pensiun", type: "file" },
  {
    name: "golongan-darah",
    label: "Golongan Darah",
    select: true,
    placeholder: "--Pilih Status Aktif--",
  },
  { name: "tinggi-badan", label: "Tinggi Badan (cm)" },
  { name: "berat-badan", label: "Berat Badan (kg)" },
  { name: "file-tanda-tangan", label: "File Tanda Tangan", type: "file" },
];

const formFieldsKependudukan = [
  { name: "emailPribadi", label: "Email Pribadi" },
  { name: "no-ktp", label: "No.KTP" },
  { name: "no-kk", label: "No.KK" },
  {
    name: "warga-negara",
    label: "Warga Negara",
    placeholder: "--Pilih Provinsi--",
    select: true,
    required: true,
  },
  {
    name: "provinsi",
    label: "Provinsi",
    placeholder: "--Pilih Provinsi--",
    select: true,
  },
  { name: "kota", label: "Kota", placeholder: "--Pilih Kota--", select: true },
  {
    name: "kecamatan",
    label: "Kecamatan",
    placeholder: "--Pilih Kecamatan--",
    select: true,
  },
  { name: "alamat", label: "Alamat" },
  { name: "kodePos", label: "Kode Pos" },
  { name: "suku", label: "Suku", placeholder: "--Pilih Suku--", select: true },
  { name: "fileSertifDosen", label: "File Sertifikasi Dosen", type: "file" },
];

const formFieldsRekeningBank = [
  { name: "file-kk", label: "File KK", type: "file" },
  {
    name: "nama-bank",
    label: "Nama Bank",
    placeholder: "--Pilih BANK--",
    select: true,
  },
  { name: "no-rekening", label: "No Rekening" },
  { name: "atas-nama-rekening", label: "Atas Nama Rekening" },
  { name: "cabang-bank", label: "Cabang BANK" },
];

export default {
  formFieldsBiodata,
  formFieldsAlamat,
  formFieldsDokumen,
  formFieldsKepegawaian,
  formFieldsKependudukan,
  formFieldsLainLain,
  formFieldsRekeningBank,
};

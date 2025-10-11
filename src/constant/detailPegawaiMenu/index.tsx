// biodata
const biodataLeftColumn = [
  { name: "NIP" },
  { name: "NUPTK" },
  { name: "Nama Lengkap" },
  { name: "Gelar Depan" },
  { name: "Gelar Belakang" },
];

const biodataRightColumn = [
  { name: "Jenis Kelamin" },
  { name: "Agama" },
  { name: "Tempat Lahir" },
  { name: "Tanggal Lahir" },
  { name: "Status Pernikahan" },
];

// kepegawaian
const kepegawaianLeftColumn = [
  { name: "Unit Kerja" },
  { name: "Status Aktif" },
  { name: "Hubungan Kerja" },
  { name: "Email Perguruan Tinggi" },
  { name: "No. Akun Finger" },
];

const kepegawaianRightColumn = [
  { name: "Jabatan Atasan" },
  { name: "Jabatan Akademik" },
  { name: "Jabatan Fungsional" },
];

// dosen
const dosenLeftColumn = [
  { name: "Bidang Keahlian" },
  { name: "Homebase" },
  { name: "Orchid ID" },
  { name: "Scopus ID" },
  { name: "NIDN" },
];

const dosenRightColumn = [
  { name: "NIDK" },
  { name: "NUPN" },
  { name: "NBM" },
  { name: "Rumpun Bidang Dosen" },
  { name: "Tgl.Sertifikasi Dosen" },
];

// alamat domisili
const alamatLeftColumn = [
  { name: "File Sertifikat Dosen" },
  { name: "Provinsi" },
  { name: "Kota" },
  { name: "Kecamatan" },
  { name: "Alamat/Jalan" },
  { name: "Kode Pos" },
];

const alamatRightColumn = [
  { name: "Jarak Rumah(KM)" },
  { name: "No. Handphone" },
  { name: "No. Whatsapp" },
];

// kependudukan
const kependudukanLeftColumn = [
  { name: "Email Pribadi" },
  { name: "No. KTP" },
  { name: "No. KK" },
  { name: "Warga Negara" },
  { name: "Provinsi" },
  { name: "Kota" },
];

const kependudukanRightColumn = [
  { name: "Kecamatan" },
  { name: "Alamat" },
  { name: "Kode Pos" },
  { name: "Suku" },
  { name: "File KTP" },
];

// rekening bank
const rekeningLeftColumn = [
  { name: "File KK" },
  { name: "Nama Bank" },
  { name: "No. Rekening" },
];

const rekeningRightColumn = [
  { name: "Alamat Rekening" },
  { name: "Cabang Bank" },
];

// dokumen

// lain-lain
const lainLainLeftColumn = [
  { name: "File Rekening" },
  { name: "KAPREG" },
  { name: "File Kapreg" },
  { name: "NPWP" },
  { name: "File NPWM" },
];

const lainLainRightColumn = [
  { name: "No. BPJS" },
  { name: "No. BPJS Ketenagakerjaan" },
];

export default {
  biodataLeftColumn,
  biodataRightColumn,
  kepegawaianLeftColumn,
  kepegawaianRightColumn,
  dosenLeftColumn,
  dosenRightColumn,
  alamatLeftColumn,
  alamatRightColumn,
  kependudukanLeftColumn,
  kependudukanRightColumn,
  rekeningLeftColumn,
  rekeningRightColumn,
  lainLainLeftColumn,
  lainLainRightColumn,
};

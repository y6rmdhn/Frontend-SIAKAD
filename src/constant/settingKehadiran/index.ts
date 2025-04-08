const dataItems = [
  { label: "Berlaku Karabatan", status: "x" },
  { label: "Toleransi Terlambat (Menit)", status: "x" },
  { label: "Berlaku pulang cepat (Menit)", status: "x" },
  { label: "Wajib Foto", status: "check" },
  { label: "Wajib Isi Rencana Kegiatan", status: "check" },
  { label: "Wajib Isi Kegiatan", status: "check" },
  { label: "Wajib Presensi di Lokasi", status: "check" },
];

const leftColumnItems = dataItems.filter((item) => item.status === "x");
const rightColumnItems = dataItems.filter((item) => item.status === "check");

export default { leftColumnItems, rightColumnItems };

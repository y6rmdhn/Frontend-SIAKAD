const referensi: {
  title: string;
  href: string;
  childrenItems?: { title: string; href: string }[];
}[] = [
  {
    title: "Aktifitas",
    href: "",
    childrenItems: [
      {
        title: "Jenis Luaran",
        href: "/admin/referensi/aktifitas/jenis-luaran",
      },
      {
        title: "Jenis Pelanggaran",
        href: "/admin/referensi/aktifitas/jenis-pelanggaran",
      },
      {
        title: "Jenis Pengabdian",
        href: "/admin/referensi/aktifitas/jenis-pengabdian",
      },
      {
        title: "Jenis Penghargaan",
        href: "/admin/referensi/aktifitas/jenis-penghargaan",
      },
      {
        title: "Jenis Publikasi",
        href: "/admin/referensi/aktifitas/jenis-publikasi",
      },
      {
        title: "Jenis Sertifikasi",
        href: "/admin/referensi/aktifitas/jenis-sertifikasi",
      },
      { title: "Jenis Tes", href: "/admin/referensi/aktifitas/jenis-tes" },
      {
        title: "Output Penelitian",
        href: "/admin/referensi/aktifitas/output-penelitian",
      },
    ],
  },
  {
    title: "Kehadiran",
    href: "",
    childrenItems: [
      { title: "Hari Libur", href: "/admin/referensi/kehadiran/hari-libur" },
      { title: "Jam Kerja", href: "/admin/referensi/kehadiran/jam-kerja" },
      { title: "Jenis Cuti", href: "/admin/referensi/kehadiran/jenis-cuti" },
      { title: "Jenis Hari", href: "/admin/referensi/kehadiran/jenis-hari" },
      { title: "Jenis Izin", href: "/admin/referensi/kehadiran/jenis-izin" },
      {
        title: "Jenis Kehadiran",
        href: "/admin/referensi/kehadiran/jenis-kehadiran",
      },
    ],
  },
  {
    title: "Kepegawaian",
    href: "",
    childrenItems: [
      { title: "Eselon", href: "/admin/referensi/kepegawaian/eleson" },
      {
        title: "Gelar Akademik",
        href: "/admin/referensi/kepegawaian/gelar-akademik",
      },
      {
        title: "Hubungan Kerja",
        href: "/admin/referensi/kepegawaian/hubungan-kerja",
      },
      {
        title: "Jabatan Akademik",
        href: "/admin/referensi/kepegawaian/jabatan-akademik",
      },
      {
        title: "Jabatan Fungsional",
        href: "/admin/referensi/kepegawaian/jabatan-fungsional",
      },
      {
        title: "Jabatan Struktural",
        href: "/admin/referensi/kepegawaian/jabatan-struktural",
      },
      {
        title: "Jenis Kenaikan Pangkat",
        href: "/admin/referensi/kepegawaian/jenis-kenaikan-pangkat",
      },
      { title: "Jenis SK", href: "/admin/referensi/kepegawaian/jenis-sk" },
      {
        title: "Media Publikasi",
        href: "/admin/referensi/kepegawaian/media-publikasi",
      },
      { title: "Pangkat", href: "/admin/referensi/kepegawaian/pangkat" },
      {
        title: "Rumpun Bidang Ilmu",
        href: "/admin/referensi/kepegawaian/rumpun-bidang-ilmu",
      },
      {
        title: "Status Keaktifan",
        href: "/admin/referensi/kepegawaian/status-keaktifan",
      },
      { title: "Unit Kerja", href: "/admin/referensi/kepegawaian/unit-kerja" },
    ],
  },
  {
    title: "Wilayah",
    href: "",
    childrenItems: [
      { title: "Kecamatan", href: "/admin/referensi/wilayah/kecamatan" },
      { title: "Kota", href: "/admin/referensi/wilayah/kota" },
      { title: "Negara", href: "/admin/referensi/wilayah/negara" },
      { title: "Profinsi", href: "/admin/referensi/wilayah/provinsi" },
    ],
  },
];

export default referensi;

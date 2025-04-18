const validasiData: {
  title: string;
  href: string;
  childrenItems?: { title: string; href: string }[];
}[] = [
  {
    title: "Setting Validasi",
    href: "/admin/validasi-data/setting-validasi",
  },
  {
    title: "Monitoring",
    href: "/admin/validasi-data/monitoring",
  },
  {
    title: "Keluarga",
    href: "/admin/validasi-data/keluarga",
  },
  {
    title: "Kepegawaian",
    href: "",
    childrenItems: [
      {
        title: "Homebase",
        href: "/admin/validasi-data/kepegawaian/homebase",
      },
      {
        title: "Hubungan Kerja",
        href: "/admin/validasi-data/kepegawaian/hubungan-kerja",
      },
      {
        title: "Jabatan Akademik",
        href: "/admin/validasi-data/kepegawaian/jabatan-akademik",
      },
      {
        title: "Jabatan Fungsional",
        href: "/admin/validasi-data/kepegawaian/jabatan-fungsional",
      },
      {
        title: "Jabatan Struktural",
        href: "/admin/validasi-data/kepegawaian/jabatan-struktural",
      },
      {
        title: "Pangkat",
        href: "/admin/validasi-data/kepegawaian/pangkat",
      },
    ],
  },
  {
    title: "Kompetensi",
    href: "/docs/primitives/tabs",
    childrenItems: [
      {
        title: "Sertifikasi",
        href: "/admin/validasi-data/kompetensi/sertifikasi",
      },
      {
        title: "Tes",
        href: "/admin/validasi-data/kompetensi/tes",
      },
    ],
  },
  {
    title: "Pelaksanaan Pendidikan",
    href: "",
  },
  {
    title: "Pelaksanaan Penelitian",
    href: "/admin/operasional/kompensasi/dokumen-internal",
  },
  {
    title: "Kualifikasi",
    href: "/admin/operasional/kompensasi/dokumen-internal",
  },
  {
    title: "Pelaksanaan Pengabdian",
    href: "/admin/operasional/kompensasi/dokumen-internal",
  },
  {
    title: "Penunjang",
    href: "/admin/operasional/kompensasi/dokumen-internal",
  },
  {
    title: "Pengembangan",
    href: "/admin/operasional/kompensasi/dokumen-internal",
  },
];

export default validasiData;

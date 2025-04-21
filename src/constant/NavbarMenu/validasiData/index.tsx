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
    childrenItems: [
      {
        title: "Bahan Ajar",
        href: "/admin/validasi-data/pelaksanaan-pendidikan/bahan-ajar",
      },
      {
        title: "Datasering",
        href: "/admin/validasi-data/pelaksanaan-pendidikan/datasering",
      },
      {
        title: "Orasi Ilmiah",
        href: "/admin/validasi-data/pelaksanaan-pendidikan/orasi-ilmiah",
      },
      {
        title: "Tugas Tambahan",
        href: "/admin/validasi-data/pelaksanaan-pendidikan/tugas-tambahan",
      },
    ],
  },
  {
    title: "Pelaksanaan Penelitian",
    href: "",
    childrenItems: [
      {
        title: "Peten",
        href: "/admin/validasi-data/pelaksanaan-penelitian/paten",
      },
      {
        title: "Penelitian",
        href: "/admin/validasi-data/pelaksanaan-penelitian/penelitian",
      },
      {
        title: "Publikasi",
        href: "/admin/validasi-data/pelaksanaan-penelitian/publikasi",
      },
    ],
  },
  {
    title: "Kualifikasi",
    href: "/admin/operasional/kompensasi/dokumen-internal",
  },
  {
    title: "Pelaksanaan Pengabdian",
    href: "",
    childrenItems: [
      {
        title: "Jabatan Struktural",
        href: "/admin/validasi-data/pelaksanaan-pengabdian/jabatan-struktural",
      },
      {
        title: "Pembicara",
        href: "/admin/validasi-data/pelaksanaan-pengabdian/pembicara",
      },
      {
        title: "Pengabdian",
        href: "/admin/validasi-data/pelaksanaan-pengabdian/pengabdian",
      },
    ],
  },
  {
    title: "Penunjang",
    href: "",
    childrenItems: [
      {
        title: "Organisasi",
        href: "/admin/validasi-data/penunjang/organisasi",
      },
      {
        title: "Penghargaan",
        href: "/admin/validasi-data/penunjang/penghargaan",
      },
      {
        title: "Penunjang Lain",
        href: "/admin/validasi-data/penunjang/penunjang-lain",
      },
    ],
  },
  {
    title: "Pengembangan",
    href: "",
    childrenItems: [
      {
        title: "Kemampuan Bahasa",
        href: "/admin/validasi-data/pengembangan/kemampuan-bahasa",
      },
      {
        title: "Organisasi",
        href: "/admin/validasi-data/pengembangan/organisasi",
      },
    ],
  },
];

export default validasiData;

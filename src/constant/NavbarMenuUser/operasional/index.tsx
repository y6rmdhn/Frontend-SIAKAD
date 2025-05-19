const operasional: {
  title: string;
  href: string;
  childrenItems?: { title: string; href: string }[];
}[] = [
  {
    title: "Berita",
    href: "/operasional/berita",
  },
  {
    title: "Dokumen Internal",
    href: "/operasional/dokumen-internal",
  },
  {
    title: "Pengajuan",
    href: "",
    childrenItems: [
      {
        title: "Cuti",
        href: "/operasional/pengajuan/cuti",
      },
      {
        title: "Izin",
        href: "/operasional/pengajuan/izin",
      },
    ],
  },
    {
    title: "Evaluasi Kerja",
    href: "/operasional/evaluasi-kerja",
  },
];

export default operasional;

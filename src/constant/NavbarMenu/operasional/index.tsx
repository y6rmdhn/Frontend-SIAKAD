const operasional: {
  title: string;
  href: string;
  childrenItems?: { title: string; href: string }[];
}[] = [
  {
    title: "Hubungan Kerja Pegawai",
    href: "/admin/operasional/hubungan-kerja-pegawai",
  },
  {
    title: "Kehadiran",
    href: "/admin/operasional/setting-kehadiran",
    childrenItems: [
      {
        title: "Setting Kehadiran",
        href: "/admin/operasional/setting-kehadiran",
      },
      {
        title: "Shift Kerja",
        href: "/admin/operasional/shift-kerja",
      },
      {
        title: "Monitoring Kehadiran",
        href: "/admin/operasional/daftar-monitoring-kehadiran",
      },
      {
        title: "Rekap Kehadiran",
        href: "/admin/operasional/rekap-kehadiran",
      },
      {
        title: "Input Kehadiran",
        href: "/admin/operasional/input-kehadiran",
      },
    ],
  },
  {
    title: "Monitoring Kegiatan",
    href: "/admin/operasional/monitoring-kegiatan",
  },
  {
    title: "Cuti",
    href: "",
    childrenItems: [
      {
        title: "Monitoring Sisa Cuti",
        href: "/admin/operasional/cuti/monitoring-sisa-cuti",
      },
      {
        title: "Periode Cuti",
        href: "/admin/operasional/cuti/periode-cuti",
      },
      {
        title: "Permohonan Cuti",
        href: "/admin/operasional/cuti/permohonan-cuti",
      },
    ],
  },
  {
    title: "Berita",
    href: "/admin/operasional/berita",
  },
  {
    title: "Kompensasi",
    href: "",
    childrenItems: [
      {
        title: "Pelanggaran",
        href: "/admin/operasional/kompensasi/pelanggaran",
      },
      {
        title: "Penghargaan",
        href: "/admin/operasional/kompensasi/penghargaan",
      },
    ],
  },
  {
    title: "Dokumen Internal",
    href: "/admin/operasional/kompensasi/dokumen-internal",
  },
];

export default operasional;

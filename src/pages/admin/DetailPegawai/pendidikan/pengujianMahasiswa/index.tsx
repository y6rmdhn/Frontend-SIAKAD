import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PengujianMahasiswa from "@/components/view/admin/DetailPegawai/Pendidikan/PengujianMahasiswa";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import PengujianMahasiswa from "@/view/admin/DetailPegawai/Pendidikan/PengujianMahasiswa";

const KepegawaianPengujianMahasiswaPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pengujian Mahasiswa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PengujianMahasiswa />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPengujianMahasiswaPage;

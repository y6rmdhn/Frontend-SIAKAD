import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BimbinganMahasiswa from "@/components/view/admin/DetailPegawai/Pendidikan/Bimbingan";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import BimbinganMahasiswa from "@/view/admin/DetailPegawai/Pendidikan/Bimbingan";

const KepegawaianBimbinganMahasiswaPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Bimbingan Mahasiswa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <BimbinganMahasiswa />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianBimbinganMahasiswaPage;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PembinaanMahasiswa from "@/components/view/admin/DetailPegawai/Pendidikan/PembinaanMahasiswa";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import PembinaanMahasiswa from "@/view/admin/DetailPegawai/Pendidikan/PembinaanMahasiswa";

const KepegawaianPembinaanMahasiswaPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pembinaan Mahasiswa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PembinaanMahasiswa />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPembinaanMahasiswaPage;

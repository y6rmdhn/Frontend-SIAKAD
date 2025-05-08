import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Pembicara from "@/components/view/admin/DetailPegawai/Pengabdian/Pembicara";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Pembicara from "@/view/admin/DetailPegawai/Pengabdian/Pembicara";

const KepegawaianPembicaraPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pembicara</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Pembicara />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPembicaraPage;

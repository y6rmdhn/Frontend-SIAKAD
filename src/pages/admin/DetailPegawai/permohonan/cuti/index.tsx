import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Cuti from "@/components/view/admin/DetailPegawai/Permohonan/Cuti";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Cuti from "@/view/admin/DetailPegawai/Permohonan/Cuti";

const KepegawaianCutiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cuti</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Cuti />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianCutiPage;

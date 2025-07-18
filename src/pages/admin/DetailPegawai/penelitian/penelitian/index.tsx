import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Penelitian from "@/components/view/admin/DetailPegawai/Penelitian/Penelitian";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Penelitian from "@/view/admin/DetailPegawai/Penelitian/Penelitian";

const KepegawaianPenelitianPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Penelitian</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Penelitian />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPenelitianPage;

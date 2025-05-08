import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Pangkat from "@/components/view/admin/DetailPegawai/Kepegawaian/Pangkat";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Pangkat from "@/view/admin/DetailPegawai/Kepegawaian/Pangkat";

const KepegawaianPangkatPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pangkat</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Pangkat />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPangkatPage;

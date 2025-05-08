import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Homebase from "@/components/view/admin/DetailPegawai/Kepegawaian/Homebase";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Homebase from "@/view/admin/DetailPegawai/Kepegawaian/Homebase";

const KepegawaianHomebasePage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Homebase</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Homebase />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianHomebasePage;

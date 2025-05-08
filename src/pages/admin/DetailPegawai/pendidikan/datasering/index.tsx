import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Datasering from "@/components/view/admin/DetailPegawai/Pendidikan/Datasering";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Datasering from "@/view/admin/DetailPegawai/Pendidikan/Datasering";

const KepegawaianDataseringPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Datasering</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Datasering />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianDataseringPage;

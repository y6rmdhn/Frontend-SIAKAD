import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import VisitingScientist from "@/components/view/admin/DetailPegawai/Pendidikan/VisitingScientist";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import VisitingScientist from "@/view/admin/DetailPegawai/Pendidikan/VisitingScientist";

const KepegawaianVisitingscientistPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Visiting Scientist</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <VisitingScientist />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianVisitingscientistPage;

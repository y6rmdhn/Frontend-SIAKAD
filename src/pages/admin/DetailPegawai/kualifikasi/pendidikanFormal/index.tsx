import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PendidikanFormal from "@/components/view/admin/DetailPegawai/Kualifikasi/PendidikanFormal";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import PendidikanFormal from "@/view/admin/DetailPegawai/Kualifikasi/PendidikanFormal";

const KepegawaianPendidikanFormalPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pendidikan Formal</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PendidikanFormal />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPendidikanFormalPage;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import HubunganKerja from "@/components/view/admin/DetailPegawai/Kepegawaian/HubunganKerja";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import HubunganKerja from "@/view/admin/DetailPegawai/Kepegawaian/HubunganKerja";

const KepegawaianHubunganKerjaPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Hubungan Kerja</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <HubunganKerja />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianHubunganKerjaPage;

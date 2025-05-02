import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Organisasi from "@/components/view/admin/DetailPegawai/Pengembangan/Organisasi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Organisasi from "@/view/admin/DetailPegawai/Pengembangan/Organisasi";

const KepegawaianOrganisasiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Organisasi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Organisasi />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianOrganisasiPage;

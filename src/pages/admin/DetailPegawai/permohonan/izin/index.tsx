import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Izin from "@/components/view/admin/DetailPegawai/Permohonan/Izin";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Izin from "@/view/admin/DetailPegawai/Permohonan/Izin";

const KepegawaianIzinPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Izin</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Izin />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianIzinPage;

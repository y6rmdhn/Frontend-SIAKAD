import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Kompensasi from "@/components/view/admin/DetailPegawai/Kompensasi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Kompensasi from "@/view/admin/DetailPegawai/Kompensasi";

const KepegawaianKompensasiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pelanggaran</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Kompensasi />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianKompensasiPage;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Publikasi from "@/components/view/admin/DetailPegawai/Penelitian/Publikasi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Publikasi from "@/view/admin/DetailPegawai/Penelitian/Publikasi";

const KepegawaianPublikasiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Publikasi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Publikasi />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPublikasiPage;

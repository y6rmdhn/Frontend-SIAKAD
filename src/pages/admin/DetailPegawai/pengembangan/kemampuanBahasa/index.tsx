import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import KemampuanBahasa from "@/components/view/admin/DetailPegawai/Pengembangan/Kemampuanbahasa";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import KemampuanBahasa from "@/view/admin/DetailPegawai/Pengembangan/Kemampuanbahasa";

const KepegawaianKemampuanBahasaPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Kemampuan Bahasa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <KemampuanBahasa />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianKemampuanBahasaPage;

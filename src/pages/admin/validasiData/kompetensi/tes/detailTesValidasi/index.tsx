import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailTesValidasi from "@/components/view/admin/ValidasiData/Kompetensi/Tes/DetailTesValidasi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";

const DetailTesValidasiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Kompetensi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Tes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Tes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailTesValidasi />
    </SimKepegawaianLayout>
  );
};

export default DetailTesValidasiPage;

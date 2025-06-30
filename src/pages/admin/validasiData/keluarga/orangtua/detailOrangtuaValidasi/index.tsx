import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailOrangtuaValidasi from "@/components/view/admin/ValidasiData/Keluarga/Orangtua/DetailOrangtuaValidasi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";

const DetailOrangtuaValidasiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Keluarga</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Orang Tua</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailOrangtuaValidasi />
    </SimKepegawaianLayout>
  );
};

export default DetailOrangtuaValidasiPage;

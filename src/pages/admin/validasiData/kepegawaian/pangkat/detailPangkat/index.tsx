import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailPangkat from "@/components/view/admin/ValidasiData/Kepegawaian/Pangkat/DetailPangkat";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";

const DetailPangkatValidasiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Kepegawaian</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pangkat</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Pangkat</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailPangkat />
    </SimKepegawaianLayout>
  );
};

export default DetailPangkatValidasiPage;

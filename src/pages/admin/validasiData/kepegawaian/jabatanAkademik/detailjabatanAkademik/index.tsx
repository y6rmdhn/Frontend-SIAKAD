import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailJabatanAkademik from "@/components/view/admin/ValidasiData/Kepegawaian/JabatanAkademik/DetailJabatanAkademik";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";

const DetailJabatanAkademikValidasiPage = () => {
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
            <BreadcrumbLink href="/gate/pegawai">Jabatan Akademik</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Jabatan Akademik</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailJabatanAkademik />
    </SimKepegawaianLayout>
  );
};

export default DetailJabatanAkademikValidasiPage;

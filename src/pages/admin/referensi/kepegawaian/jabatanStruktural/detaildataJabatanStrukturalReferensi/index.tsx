import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailDataJabatanStrukturalReferensi from "@/components/view/admin/Referensi/Kepegawaian/JabatanStruktural/DetailDataJabatanStruktural";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";

const DetailDataJabatanStrukturalReferensiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Referensi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Kepegawaian</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">
              Jabatan Struktural
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Jabatan Struktural</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailDataJabatanStrukturalReferensi />
    </SimKepegawaianLayout>
  );
};

export default DetailDataJabatanStrukturalReferensiPage;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailDataJabatanFungsionalReferensi from "@/components/view/admin/Referensi/Kepegawaian/JabatanFungsional/DetailDataJabatanFungsionalReferensi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";

const DetailDataJabatanFungsionalReferensiPage = () => {
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
              Jabatan Fungsional
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Jabatan Fungsional</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailDataJabatanFungsionalReferensi />
    </SimKepegawaianLayout>
  );
};

export default DetailDataJabatanFungsionalReferensiPage;

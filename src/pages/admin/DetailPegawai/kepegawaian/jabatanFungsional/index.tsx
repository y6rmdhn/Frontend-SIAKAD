import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JabatanFungsional from "@/components/view/admin/DetailPegawai/Kepegawaian/JabatanFungsional";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import JabatanFungsional from "@/view/admin/DetailPegawai/Kepegawaian/JabatanFungsional";

const KepegawaianJabatanFungsionalPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jabatan Fungsional</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JabatanFungsional />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianJabatanFungsionalPage;

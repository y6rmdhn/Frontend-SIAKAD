import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JabatanStruktural from "@/components/view/admin/DetailPegawai/Kepegawaian/JabatanStruktural";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import JabatanStruktural from "@/view/admin/DetailPegawai/Kepegawaian/JabatanStruktural";

const KepegawaianJabatanStrukturalPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jabatan Struktural</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JabatanStruktural />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianJabatanStrukturalPage;

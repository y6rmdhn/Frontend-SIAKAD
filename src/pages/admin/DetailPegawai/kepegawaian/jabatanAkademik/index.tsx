import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JabatanAkademik from "@/components/view/admin/DetailPegawai/Kepegawaian/JabatanAkademik";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import JabatanAkademik from "@/view/admin/DetailPegawai/Kepegawaian/JabatanAkademik";

const KepegawaianJabatanAkademikPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jabatan Akademik</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JabatanAkademik />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianJabatanAkademikPage;

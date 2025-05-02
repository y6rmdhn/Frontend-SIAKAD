import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JabatanTugas from "@/components/view/admin/DetailPegawai/Pengabdian/JabatanTugas";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import JabatanTugas from "@/view/admin/DetailPegawai/Pengabdian/JabatanTugas";

const KepegawaianJabatanTugasPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jabatan Tugas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JabatanTugas />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianJabatanTugasPage;

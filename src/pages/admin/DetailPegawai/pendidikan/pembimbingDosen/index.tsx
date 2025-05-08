import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PembimbingDosen from "@/components/view/admin/DetailPegawai/Pendidikan/PembimbingDosen";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import PembimbingDosen from "@/view/admin/DetailPegawai/Pendidikan/PembimbingDosen";

const KepegawaianPembimbingDosenPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pembimbing Dosen</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PembimbingDosen />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPembimbingDosenPage;

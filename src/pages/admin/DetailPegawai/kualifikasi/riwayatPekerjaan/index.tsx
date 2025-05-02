import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RiwayatPekerjaan from "@/components/view/admin/DetailPegawai/Kualifikasi/RiwayatPekerjaan";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import RiwayatPekerjaan from "@/view/admin/DetailPegawai/Kualifikasi/RiwayatPekerjaan";

const KepegawaianRiwayatPekerjaanPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Riwayat Pekerjaan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RiwayatPekerjaan />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianRiwayatPekerjaanPage;

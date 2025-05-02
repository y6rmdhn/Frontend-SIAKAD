import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RiwayatSertifikasi from "@/components/view/admin/DetailPegawai/Kompetensi/RiwayatSertifikasi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import RiwayatSertifikasi from "@/view/admin/DetailPegawai/Kompetensi/RiwayatSertifikasi";

const KepegawaianRiwayatSertifikasiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Riwayat Sertifikasi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RiwayatSertifikasi />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianRiwayatSertifikasiPage;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RiwayatPekerjaanValidasi from "@/components/view/admin/ValidasiData/Kualifikasi/RiwayatPekerjaan";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";

const RiwayatPekerjaanValidasiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Kualifikasi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Riwayat Pekerjaan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RiwayatPekerjaanValidasi />
    </SimKepegawaianLayout>
  );
};

export default RiwayatPekerjaanValidasiPage;

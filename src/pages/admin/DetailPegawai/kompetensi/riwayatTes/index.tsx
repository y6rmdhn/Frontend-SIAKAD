import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RiwayatTes from "@/components/view/admin/DetailPegawai/Kompetensi/RiwayatTes";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import RiwayatTes from "@/view/admin/DetailPegawai/Kompetensi/RiwayatTes";

const KepegawaianRiwayatTesPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Riwayat Tes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RiwayatTes />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianRiwayatTesPage;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AnggotaProfesi from "@/components/view/admin/DetailPegawai/Penunjang/AnggotaProfesi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import AnggotaProfesi from "@/view/admin/DetailPegawai/Penunjang/AnggotaProfesi";

const KepegawaianAnggotaProfesiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Anggota Profesi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <AnggotaProfesi />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianAnggotaProfesiPage;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PengelolaJurnal from "@/components/view/admin/DetailPegawai/Pengabdian/PengelolaJurnal";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import PengelolaJurnal from "@/view/admin/DetailPegawai/Pengabdian/PengelolaJurnal";

const KepegawaianPengelolaJurnalPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pengelola Jurnal</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PengelolaJurnal />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPengelolaJurnalPage;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Penghargaan from "@/components/view/admin/DetailPegawai/Penunjang/Penghargaan";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Penghargaan from "@/view/admin/DetailPegawai/Penunjang/Penghargaan";

const KepegawaianPenghargaanPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Penghargaan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Penghargaan />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPenghargaanPage;

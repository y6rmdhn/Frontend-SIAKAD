import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PenunjangLain from "@/components/view/admin/DetailPegawai/Penunjang/PenunjangLain";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import PenunjangLain from "@/view/admin/DetailPegawai/Penunjang/PenunjangLain";

const KepegawaianPenunjangLainPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Penunjang Lain</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PenunjangLain />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPenunjangLainPage;

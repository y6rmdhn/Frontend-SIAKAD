import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Pengabdian from "@/components/view/admin/DetailPegawai/Pengabdian/Pengabdian";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Pengabdian from "@/view/admin/DetailPegawai/Pengabdian/Pengabdian";

const KepegawaianPengabdianPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pengabdian</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Pengabdian />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPengabdianPage;

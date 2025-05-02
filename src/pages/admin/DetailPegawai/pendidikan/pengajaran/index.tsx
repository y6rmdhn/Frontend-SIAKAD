import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Pengajaran from "@/components/view/admin/DetailPegawai/Pendidikan/Pengajaran";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Pengajaran from "@/view/admin/DetailPegawai/Pendidikan/Pengajaran";

const KepegawaianPengajaranPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pengajaran</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Pengajaran />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPengajaranPage;

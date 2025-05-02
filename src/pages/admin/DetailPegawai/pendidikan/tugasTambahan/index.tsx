import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import TugasTambahan from "@/components/view/admin/DetailPegawai/Pendidikan/TugasTambahan";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import TugasTambahan from "@/view/admin/DetailPegawai/Pendidikan/TugasTambahan";

const KepegawaianTugasTambahanPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tugas Tambahan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TugasTambahan />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianTugasTambahanPage;

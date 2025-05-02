import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Presensi from "@/components/view/admin/DetailPegawai/Presensi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Presensi from "@/view/admin/DetailPegawai/Presensi";

const KepegawaianPresensiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10 pl-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Presensi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Presensi />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPresensiPage;

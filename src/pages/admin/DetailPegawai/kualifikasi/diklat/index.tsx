import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Diklat from "@/components/view/admin/DetailPegawai/Kualifikasi/Diklat";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Diklat from "@/view/admin/DetailPegawai/Kualifikasi/Diklat";

const KepegawaianDiklatPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Diklat</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Diklat />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianDiklatPage;

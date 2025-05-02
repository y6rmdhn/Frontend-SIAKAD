import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BahanAjar from "@/components/view/admin/DetailPegawai/Pendidikan/BahanAjar";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import BahanAjar from "@/view/admin/DetailPegawai/Pendidikan/BahanAjar";

const KepegawaianBahanAjarPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Bahan Ajar</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <BahanAjar />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianBahanAjarPage;

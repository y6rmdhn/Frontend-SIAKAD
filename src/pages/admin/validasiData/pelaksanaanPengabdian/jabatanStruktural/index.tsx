import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JabatanStruktural from "@/components/view/admin/ValidasiData/PelaksanaanPengabdian/JabatanStruktural";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";

const JabatanStrukturalKepegawaianPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">
              Pelaksanaan Pengabdian
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jabatan Struktural</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JabatanStruktural />
    </SimKepegawaianLayout>
  );
};

export default JabatanStrukturalKepegawaianPage;

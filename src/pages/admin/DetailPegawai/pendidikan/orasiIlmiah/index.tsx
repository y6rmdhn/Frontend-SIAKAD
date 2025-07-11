import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import OrasiIlmiah from "@/components/view/admin/DetailPegawai/Pendidikan/OrasiIlmiah";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import OrasiIlmiah from "@/view/admin/DetailPegawai/Pendidikan/OrasiIlmiah";

const KepegawaianOrasiIlmiahPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Orasi Ilmiah</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <OrasiIlmiah />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianOrasiIlmiahPage;

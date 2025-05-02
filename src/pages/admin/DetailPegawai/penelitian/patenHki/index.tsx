import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PatenHki from "@/components/view/admin/DetailPegawai/Penelitian/PatenHki";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import PatenHki from "@/view/admin/DetailPegawai/Penelitian/PatenHki";

const KepegawaianPatenHkiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Paten/HKI</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PatenHki />
    </SimKepegawaianLayout>
  );
};

export default KepegawaianPatenHkiPage;

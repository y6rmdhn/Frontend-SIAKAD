import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import TahapanDataRiwayat from "@/components/view/TahapanDataRiwayat";
import SimUserLayout from "@/layouts/SimUserLayout/SimUserLayout";

const TahapanDataRiwayatPageUser = () => {
  return (
    <SimUserLayout>
      <Breadcrumb className="mt-10 pl-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dasboard">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tahapan Data Riwayat</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TahapanDataRiwayat />
    </SimUserLayout>
  );
};

export default TahapanDataRiwayatPageUser;

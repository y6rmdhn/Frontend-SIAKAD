import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import KirimSlip from "@/components/view/admin/Keuangan/KirimSlip/KirimSlip";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";

const KirimSlipPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dasboard">Keuangan</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Kirim Slips</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <KirimSlip />
    </SimKepegawaianLayout>
  );
};

export default KirimSlipPage;

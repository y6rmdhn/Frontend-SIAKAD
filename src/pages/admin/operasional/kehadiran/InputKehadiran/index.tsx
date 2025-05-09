import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import InputKehadiran from "@/components/view/admin/Operasional/Kehadiran/InpuKehadiran";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";

const InputKehadiranPage = () => {
  return (
    <SimKepegawaianLayout>
      <div>
        <Breadcrumb className="mt-10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/gate/pegawai">Operasional</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/gate/pegawai">Kehadiran</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Input Kehadiran</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <InputKehadiran />
      </div>
    </SimKepegawaianLayout>
  );
};

export default InputKehadiranPage;

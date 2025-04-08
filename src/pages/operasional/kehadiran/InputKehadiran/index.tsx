import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import InputKehadiran from "@/view/Operasional/Kehadiran/InpuKehadiran";
import React from "react";

const InputKehadiranPage = () => {
  return (
    <SimKepegawaianLayout>
      <div>
        <Breadcrumb className="mt-10 pl-4">
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

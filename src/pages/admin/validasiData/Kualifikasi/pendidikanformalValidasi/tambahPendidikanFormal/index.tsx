import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import TambahPendidikanFormal from "@/components/view/admin/ValidasiData/Kualifikasi/PendidikanFormal/TambahPendidikanFormal/TambahPendidikanFormal";

const TambahPendidikanFormalPage = () => {
    return (
        <SimKepegawaianLayout>
            <Breadcrumb className="mt-10">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Kualifikasi</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Pendidikan Formal</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Tambah Pendidikan Formal</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <TambahPendidikanFormal />
        </SimKepegawaianLayout>
    );
};

export default TambahPendidikanFormalPage;
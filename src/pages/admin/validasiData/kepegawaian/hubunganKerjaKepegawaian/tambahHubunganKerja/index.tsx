import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import TambahHubunganKerja from "@/components/view/admin/ValidasiData/Kepegawaian/HubunganKerja/TambahHubunganKerja/TambahHubunganKerja";

const TambahHubunganKerjaPage = () => {
    return (
        <SimKepegawaianLayout>
            <Breadcrumb className="mt-10">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Kepegawaian</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Hubungan Kerja</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Tambah Hubungan Kerja</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <TambahHubunganKerja />
        </SimKepegawaianLayout>
    );
};

export default TambahHubunganKerjaPage;
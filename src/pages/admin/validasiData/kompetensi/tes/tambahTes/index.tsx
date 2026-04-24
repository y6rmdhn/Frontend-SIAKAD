import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import TambahTes from "@/components/view/admin/ValidasiData/Kompetensi/Tes/TambahTes/TambahTes";

const TambahTesPage = () => {
    return (
        <SimKepegawaianLayout>
            <Breadcrumb className="mt-10">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Kompetensi</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Sertifikasi</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Tambah Tes</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <TambahTes />
        </SimKepegawaianLayout>
    );
};

export default TambahTesPage;
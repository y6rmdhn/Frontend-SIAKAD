import { Skeleton } from "@/components/ui/skeleton";

const LoadingStateDasbordAdmin = () => {
    return (
        <div className="w-full h-full mt-6">
            {/* Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="h-40 w-full rounded-xl" />
                ))}
            </div>

            {/* Statistik dan Card Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                {/* Grafik / Statistik Pegawai */}
                <Skeleton className="h-[400px] w-full rounded-lg" />

                {/* Informasi Panel */}
                <div className="space-y-6">
                    {/* Pemberitahuan */}
                    <Skeleton className="h-40 w-full rounded-lg" />

                    {/* Berita */}
                    <Skeleton className="h-40 w-full rounded-lg" />

                    {/* Ulang Tahun */}
                    <Skeleton className="h-52 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default LoadingStateDasbordAdmin;

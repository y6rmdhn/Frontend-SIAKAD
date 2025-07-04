import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { id as localeID } from "date-fns/locale";

// UI Components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";

// Icons
import { IoIosArrowBack } from "react-icons/io";

// Services
import adminServices from "@/services/admin.services";

// --- Sub-Component untuk Pratinjau File ---
const FilePreviewDialog = ({
  fileUrl,
  fileName,
}: {
  fileUrl?: string;
  fileName?: string;
}) => {
  if (!fileUrl) return <span>-</span>;
  const isImage = /\.(jpeg|jpg|png|gif)$/i.test(fileName || fileUrl);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-auto text-blue-600 hover:underline hover:text-blue-800 text-sm font-medium"
        >
          Lihat Dokumen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Pratinjau Dokumen</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isImage ? (
            <img
              src={fileUrl}
              alt="Pratinjau File"
              className="w-full h-auto rounded-md object-contain max-h-[70vh]"
            />
          ) : (
            <div className="text-center">
              <p className="mb-4">
                Pratinjau tidak tersedia. Silakan unduh untuk melihat file.
              </p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button>Unduh File</Button>
              </a>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// --- Komponen Utama ---
const DetailDiklatValidasi = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["detail-diklat-admin", params.id],
    queryFn: async () => {
      if (!params.id) throw new Error("ID Diklat tidak ditemukan di URL");
      const response = await adminServices.getDiklatDetailAdmin(params.id);
      return response.data;
    },
    enabled: !!params.id,
  });

  const diklatData = data?.data;
  const pegawaiInfo = data?.pegawai;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return format(parseISO(dateString), "d MMMM yyyy", { locale: localeID });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title
          title="Validasi Riwayat Diklat"
          subTitle="Detail Riwayat Diklat"
        />
        <CustomCard>
          <div className="p-6 space-y-4">
            <div className="flex justify-end">
              <Skeleton className="h-10 w-48" />
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </CustomCard>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Validasi Riwayat Diklat" />
        <CustomCard>
          <p className="p-10 text-red-500">
            Gagal memuat detail data: {(error as Error).message}
          </p>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title
        title="Validasi Riwayat Diklat"
        subTitle="Detail Riwayat Diklat Pegawai"
      />

      <CustomCard
        title={
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{pegawaiInfo?.nama}</h2>
            <p className="text-sm text-gray-500">NIP: {pegawaiInfo?.nip}</p>
          </div>
        }
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/admin/validasi-data/kualifikasi/diklat"
              >
                <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-[#329C59] text-white">
                  <IoIosArrowBack /> Kembali ke Daftar
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 border border-gray-200 rounded-lg p-4">
              {/* KOLOM KIRI */}
              <div className="space-y-2">
                <InfoItem label="Nama Diklat" value={diklatData?.nama_diklat} />
                <InfoItem
                  label="Jenis Diklat"
                  value={diklatData?.jenis_diklat}
                />
                <InfoItem
                  label="Tingkat Diklat"
                  value={diklatData?.tingkat_diklat}
                />
                <InfoItem
                  label="Penyelenggara"
                  value={diklatData?.penyelenggara}
                />
                <InfoItem label="Tempat" value={diklatData?.tempat} />
                <InfoItem label="Peran" value={diklatData?.peran} />
                <InfoItem label="Keterangan" value={diklatData?.keterangan} />
                <InfoItem
                  label="No. Sertifikat"
                  value={diklatData?.no_sertifikat}
                />
                <InfoItem label="Dokumen Pendukung">
                  {diklatData?.dokumen_pendukung.length > 0 ? (
                    <div className="flex flex-col items-end gap-2">
                      {diklatData.dokumen_pendukung.map((doc: any) => (
                        <FilePreviewDialog
                          key={doc.id}
                          fileUrl={doc.url}
                          fileName={doc.nama_file}
                        />
                      ))}
                    </div>
                  ) : (
                    "-"
                  )}
                </InfoItem>
              </div>

              {/* KOLOM KANAN */}
              <div className="space-y-2">
                <InfoItem
                  label="Jumlah Jam"
                  value={`${diklatData?.jumlah_jam || 0} Jam`}
                />
                <InfoItem
                  label="Tahun Penyelenggaraan"
                  value={diklatData?.tahun_penyelenggaraan}
                />
                <InfoItem
                  label="Tanggal Mulai"
                  value={formatDate(diklatData?.tgl_mulai)}
                />
                <InfoItem
                  label="Tanggal Selesai"
                  value={formatDate(diklatData?.tgl_selesai)}
                />
                <InfoItem
                  label="Tanggal Sertifikat"
                  value={formatDate(diklatData?.tgl_sertifikat)}
                />
                <InfoItem
                  label="SK Penugasan"
                  value={diklatData?.sk_penugasan}
                />
                <InfoItem
                  label="Status Pengajuan"
                  value={diklatData?.status_pengajuan_label}
                />
                <InfoItem
                  label="Tanggal Diajukan"
                  value={formatDate(diklatData?.timestamps.tgl_diajukan)}
                />
                <InfoItem
                  label="Tanggal Disetujui"
                  value={formatDate(diklatData?.timestamps.tgl_disetujui)}
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

// Komponen kecil untuk menampilkan item info
const InfoItem = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | null | number;
  children?: React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row gap-2 justify-between border-b py-2 min-h-[40px] items-center">
    <Label className="font-semibold text-[#3F6FA9] text-sm shrink-0 w-48">
      {label}
    </Label>
    {children ? (
      <div className="text-sm font-medium text-right">{children}</div>
    ) : (
      <Label className="text-sm font-medium text-right break-words">
        {value || "-"}
      </Label>
    )}
  </div>
);

export default DetailDiklatValidasi;

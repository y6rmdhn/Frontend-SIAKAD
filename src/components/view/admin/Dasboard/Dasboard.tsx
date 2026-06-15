import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// --- UI & Custom Components ---
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import SelectFilter from "@/components/blocks/SelectFilter";
import CardStatistikPegawai from "@/components/blocks/CardStatistikPegawai/CardStatistikPegawai";
import LoadingStateDasbordAdmin from "@/components/blocks/LoadingStateDasboradAdmin/LoadingStateDasbordAdmin";

// --- Ikon ---
import {
  FaGraduationCap,
  FaBirthdayCake,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlinePersonRemove } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";

// --- Services ---
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi";

interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

interface TableData<T> {
  headers: string[];
  rows: T[];
  total?: number | string;
}

interface NewsItem {
  id: number | string;
  judul: string;
  ringkasan: string;
}

interface BirthdayItem {
  id: string;
  nip: string;
  nama: string;
  tanggal_lahir: string;
  unit_kerja_nama: string;
}

interface PensiunItem {
  id: string;
  nip: string;
  nama: string;
  tanggal_lahir: string;
  usia_pensiun: number;
  tanggal_pensiun: string;
  jabatan_fungsional: string;
  unit_kerja_nama: string;
}

interface DashboardData {
  staff_summary: {
    active_employees: number;
    academic_staff: number;
    non_academic_staff: number;
    inactive_employees: number;
  };
  academic_education: { chart_data: ChartData; table_data: TableData<any> };
  non_academic_education: { chart_data: ChartData; table_data: TableData<any> };
  staff_distribution: { chart_data: ChartData; table_data: TableData<any> };
  jabatan_fungsional_distribution: { chart_data: ChartData; table_data: TableData<any> };
  work_relationships: { chart_data: ChartData; table_data: TableData<any> };
  birthdays: BirthdayItem[];
  pensiun_bulan_ini: {
    total: number;
    data: PensiunItem[];
  };
}

const generateGajiSchema = z.object({
  bulan: z
    .string({ required_error: "Bulan wajib dipilih." })
    .min(1, "Bulan wajib dipilih."),
  tahun: z.string().min(4, { message: "Tahun harus terdiri dari 4 digit." }),
});

const dummyDashboardData: DashboardData = {
  staff_summary: {
    active_employees: 150,
    academic_staff: 100,
    non_academic_staff: 40,
    inactive_employees: 10,
  },
  academic_education: {
    chart_data: {
      labels: ["S1", "S2", "S3"],
      datasets: [{ label: "Jumlah", data: [20, 50, 30] }],
    },
    table_data: {
      headers: ["Pendidikan", "Jumlah"],
      rows: [
        { pendidikan: "S1", jumlah: 20 },
        { pendidikan: "S2", jumlah: 50 },
        { pendidikan: "S3", jumlah: 30 },
      ],
      total: 100,
    },
  },
  non_academic_education: {
    chart_data: {
      labels: ["SMA", "D3", "S1"],
      datasets: [{ label: "Jumlah", data: [10, 15, 15] }],
    },
    table_data: {
      headers: ["Pendidikan", "Jumlah"],
      rows: [
        { pendidikan: "SMA", jumlah: 10 },
        { pendidikan: "D3", jumlah: 15 },
        { pendidikan: "S1", jumlah: 15 },
      ],
      total: 40,
    },
  },
  staff_distribution: {
    chart_data: {
      labels: ["Fakultas Teknik", "Fakultas Ekonomi", "Rektorat"],
      datasets: [{ label: "Jumlah", data: [50, 40, 60] }],
    },
    table_data: {
      headers: ["Unit Kerja", "Jumlah"],
      rows: [
        { unit: "Fakultas Teknik", jumlah: 50 },
        { unit: "Fakultas Ekonomi", jumlah: 40 },
        { unit: "Rektorat", jumlah: 60 },
      ],
      total: 150,
    },
  },
  jabatan_fungsional_distribution: {
    chart_data: {
      labels: ["Tenaga Pengajar", "Lektor", "Asisten Ahli"],
      datasets: [{ label: "Jumlah", data: [451, 186, 83] }],
    },
    table_data: {
      headers: ["Jabatan Fungsional", "Jumlah"],
      rows: [
        { jabatan_fungsional: "Tenaga Pengajar", jumlah: 451 },
        { jabatan_fungsional: "Lektor", jumlah: 186 },
        { jabatan_fungsional: "Asisten Ahli", jumlah: 83 },
      ],
      total: 720,
    },
  },
  work_relationships: {
    chart_data: {
      labels: ["PNS", "PPPK", "Honorer"],
      datasets: [{ label: "Jumlah", data: [80, 50, 20] }],
    },
    table_data: {
      headers: ["Status", "Jumlah"],
      rows: [
        { status: "PNS", jumlah: 80 },
        { status: "PPPK", jumlah: 50 },
        { status: "Honorer", jumlah: 20 },
      ],
      total: 150,
    },
  },
  birthdays: [
    { id: "1", nip: "19800101", nama: "Budi Santoso", tanggal_lahir: "1980-05-15", unit_kerja_nama: "Fakultas Teknik" },
    { id: "2", nip: "19850202", nama: "Siti Aminah", tanggal_lahir: "1985-05-20", unit_kerja_nama: "Rektorat" },
  ],
  pensiun_bulan_ini: {
    total: 0,
    data: [],
  },
};

// =================================================================================
// --- Komponen Dashboard ---
// =================================================================================
const Dasboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(""); // Nilai awal "" akan memicu default di service
  const queryClient = useQueryClient();

  // Pagination untuk Daftar Ulang Tahun
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Fetch Data Dashboard (Reaktif terhadap Filter) ---
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useQuery<DashboardData>({
      queryKey: ["dasboard-admin", selectedUnit],
      queryFn: async () => {
        const response = await adminServices.getDasboardAdmin({
          unit_kerja_id: selectedUnit,
        });
        return response.data.data;
      },
    });

  const { data: unitKerjaList } = useQuery({
    queryKey: ["all-unit-kerja-dropdown-dasboard"],
    queryFn: async () => {
      const res = await adminServices.getUnitKerja({ is_dropdown: true });
      // API returns paginated: { data: { items: [...] } } or dropdown: { data: [...] }
      const raw = res.data?.data;
      return Array.isArray(raw) ? raw : (raw?.items ?? []);
    },
    staleTime: Infinity,
  });

  const unitKerjaOptions = useMemo(() => {
    if (!unitKerjaList || !Array.isArray(unitKerjaList)) return [{ value: "", label: "Semua Unit Kerja" }];
    const allUnitsOption = { value: "", label: "Semua Unit Kerja" };
    const options = unitKerjaList.map((unit: any) => ({
      value: String(unit.id),
      label: `${unit.kode} - ${unit.nama}`,
    }));
    return [allUnitsOption, ...options];
  }, [unitKerjaList]);

  // --- Form & Mutasi untuk Generate Gaji ---
  const form = useForm<z.infer<typeof generateGajiSchema>>({
    resolver: zodResolver(generateGajiSchema),
    defaultValues: {
      bulan: "",
      tahun: new Date().getFullYear().toString(),
    },
  });

  const { mutate: mutateGenerateGaji, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof generateGajiSchema>) =>
      potsReferensiServices.generatePayroll({
        periode_bulan: Number(data.bulan),
        periode_tahun: Number(data.tahun),
      }),
    onSuccess: (_response, variables) => {
      const monthName =
        months.find((m) => m.value === variables.bulan)?.name ||
        variables.bulan;
      toast.success(
        `Proses generate gaji untuk ${monthName} ${variables.tahun} berhasil dimulai.`
      );
      queryClient.invalidateQueries({ queryKey: ["dasboard-admin"] });
      form.reset();
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Terjadi kesalahan";
      toast.error(`Gagal memulai proses: ${errorMessage}`);
    },
  });

  const handleSubmitData = (values: z.infer<typeof generateGajiSchema>) => {
    mutateGenerateGaji(values);
  };

  // --- Data & Fungsi Helper ---
  const months = [
    { value: "1", name: "Januari" },
    { value: "2", name: "Februari" },
    { value: "3", name: "Maret" },
    { value: "4", name: "April" },
    { value: "5", name: "Mei" },
    { value: "6", name: "Juni" },
    { value: "7", name: "Juli" },
    { value: "8", name: "Agustus" },
    { value: "9", name: "September" },
    { value: "10", name: "Oktober" },
    { value: "11", name: "November" },
    { value: "12", name: "Desember" },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
    });
  };

  const displayData = dashboardData || dummyDashboardData;

  // Pagination calculations
  const totalPages = Math.ceil((displayData.birthdays?.length || 0) / itemsPerPage);
  const currentBirthdays = displayData.birthdays?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];

  // --- Render JSX ---
  return (
    <div className="mt-10 mb-20">
      <div className="flex justify-between items-center mb-4">
        <Title title="Dasboard" />
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1C8C88] hover:bg-[#156a66] flex items-center gap-2">
              <FaFileInvoiceDollar />
              Generate Gaji
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitData)}>
                <DialogHeader>
                  <DialogTitle>Generate Gaji Pegawai</DialogTitle>
                  <DialogDescription>
                    Pilih periode bulan dan tahun untuk memulai proses generate
                    gaji.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="bulan"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">Bulan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Pilih Bulan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={month.value} value={month.value}>
                                {month.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="col-span-3 col-start-2" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tahun"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">Tahun</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Contoh: 2025"
                            className="col-span-3"
                          />
                        </FormControl>
                        <FormMessage className="col-span-3 col-start-2" />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#1C8C88] hover:bg-[#156a66]"
                    disabled={isPending}
                  >
                    {isPending ? "Memproses..." : "Generate"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <CustomCard
        actions={
          <div className="h-0 flex gap-5 lg:gap-30 md:gap-10 sm:gap-5 sm:h-0 items-center">
            <Label className="text-[#FFAC07] sm:text-sm">Unit Kerja</Label>
            {/* 🚨 NOTE: For the `disabled` prop to work here, you must update your
              `SelectFilter` component to accept it. 
              
              Example `SelectFilter` props interface:
              interface SelectFilterProps {
                // ... your other props
                disabled?: boolean;
              }
            */}
            <SelectFilter
              options={unitKerjaOptions}
              value={selectedUnit}
              onValueChange={setSelectedUnit}
              classname="w-40 sm:w-80 md:w-80 lg:w-80 xl:w-80 2xl:w-80 hidden md:flex"
              placeholder="Pilih Unit Kerja"
            />
            {selectedUnit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedUnit("")}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 hidden md:flex"
              >
                Reset Filter
              </Button>
            )}
          </div>
        }
      />

      {isDashboardLoading ? (
        <LoadingStateDasbordAdmin />
      ) : displayData ? (
        <>
          <div className="grid grid-rows-4 sm:grid-rows-1 md:grid-rows-1 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 md:gap-2 lg:gap-10 mt-6 sm:gap-3 xl:gap-10 2xl:gap-10">
            <div className="bg-gradient-to-r from-[#1C8C88] to-[#28BCB7] h-20 xl:h-40 2xl:h-40 lg:h-40 rounded-xl text-white flex items-center justify-center relative sm:h-30 md:h-35">
              <div className="relative w-full h-full flex items-center justify-center">
                <h1 className="text-xs lg:text-lg font-semibold text-center flex flex-col items-center sm:text-xs md:text-sm md:mx-1 xl:text-lg 2xl:text-lg">
                  Jumlah Pegawai Aktif
                  <p className="xl:text-4xl 2xl:text-4xl lg:text-4xl font-semibold mt-3 sm:text-lg md:text-2xl">
                    {displayData.staff_summary.active_employees}
                  </p>
                </h1>
                <IoPersonOutline className="xl:w-14 xl:h-14 2xl:w-14 2xl:h-14 lg:w-14 lg:h-14 absolute bottom-0 left-1 sm:w-6 sm:h-7 md:w-8 md:h-8" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#5abd1d] to-[#66D820] h-20 xl:h-40 2xl:h-40 lg:h-40 rounded-xl text-white flex items-center justify-center relative sm:h-30 md:h-35">
              <div className="relative w-full h-full flex items-center justify-center">
                <h1 className="text-xs lg:text-lg text-center font-semibold flex flex-col items-center sm:text-xs sm:mx-1 md:text-sm xl:text-lg 2xl:text-lg">
                  Jumlah Pegawai Pendidik (Akademik)
                  <p className="lg:text-4xl font-semibold mt-1 sm:text-lg md:text-2xl">
                    {displayData.staff_summary.academic_staff}
                  </p>
                </h1>
                <FaGraduationCap className="lg:w-14 lg:h-14 absolute bottom-0 left-1 sm:w-6 sm:h-7" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#e09808] to-[#FFAC07] h-20 xl:h-40 2xl:h-40 lg:h-40 rounded-xl text-white flex items-center justify-center relative sm:h-30 md:h-35">
              <div className="relative w-full h-full flex items-center justify-center sm:flex sm:items-center sm:justify-center sm:relative">
                <h1 className="text-xs lg:text-lg text-center font-semibold flex flex-col items-center sm:text-xs sm:items-center sm:flex sm:flex-col md:text-sm xl:text-lg 2xl:text-lg">
                  Jumlah Pegawai Kependidikan (Non Akademik)
                  <p className="lg:text-4xl font-semibold mt-1 sm:text-lg md:text-2xl">
                    {displayData.staff_summary.non_academic_staff}
                  </p>
                </h1>
                <FaUserGroup className="lg:w-14 lg:h-14 absolute bottom-0 left-1 sm:w-6 sm:h-7" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#b92916] to-[#D22D17] h-20 xl:h-40 2xl:h-40 lg:h-40 rounded-xl text-white flex items-center justify-center relative sm:h-30 sm:flex sm:items-center sm:justify-center sm:relative md:h-35">
              <div className="relative w-full h-full flex items-center justify-center sm:flex sm:items-center sm:justify-center sm:relative">
                <h1 className="text-xs lg:text-lg text-center font-semibold flex flex-col items-center sm:text-xs sm:items-center sm:flex sm:flex-col md:text-sm xl:text-lg 2xl:text-lg">
                  Jumlah Pegawai Pensiun
                  <p className="lg:text-4xl font-semibold mt-1 sm:text-lg md:text-2xl">
                    {displayData.staff_summary.inactive_employees}
                  </p>
                </h1>
                <MdOutlinePersonRemove className="lg:w-14 lg:h-14 absolute bottom-0 left-1 sm:w-6 sm:h-7" />
              </div>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-2 2xl:grid grid-cols-1 md:2xl:grid-cols-2 gap-5 mt-10">
            <div className="min-w-0">
              <CardStatistikPegawai
                academicEducation={displayData.academic_education}
                nonAcademicEducation={displayData.non_academic_education}
                jabatanFungsionalDistribution={displayData.jabatan_fungsional_distribution}
                workRelationships={displayData.work_relationships}
              />
            </div>

            <div className="flex flex-col gap-5 min-w-0">
              <CustomCard
                actions={
                  <h1 className="flex gap-3 items-center text-[#DA2A21]">
                    <RiErrorWarningLine className="w-5 h-5" />{" "}
                    <span className="text-lg font-semibold">Pensiun Bulan Ini</span>
                  </h1>
                }
                cardStyle="border-t-[#DA2A21] border-t-2"
              >
                {displayData.pensiun_bulan_ini.total === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">Tidak ada pegawai yang pensiun bulan ini.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {displayData.pensiun_bulan_ini.data.map((item) => (
                      <div key={item.id} className="min-w-0 border-b pb-2 last:border-b-0">
                        <h1 className="truncate font-semibold">{item.nama}</h1>
                        <p className="text-xs text-muted-foreground">
                          {item.jabatan_fungsional} &bull; Pensiun: {formatDate(item.tanggal_pensiun)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CustomCard>
              <CustomCard
                actions={
                  <h1 className="flex gap-3 items-center">
                    <FaBirthdayCake />{" "}
                    <span className="text-lg font-semibold text-black">
                      Daftar Ulang Tahun
                    </span>
                  </h1>
                }
                cardStyle="border-t-[#FFF3A7] border-t-2"
              >
                <div className="overflow-x-auto">
                  <Table className="mt-3 table-auto">
                    <TableHeader>
                      <TableRow className="bg-[#FFF3A7] hover:bg-[#FFF3A7]">
                        <TableHead className="text-center text-black rounded-tl-lg">
                          Tgl Lahir
                        </TableHead>
                        <TableHead className="text-center text-black">
                          NIP
                        </TableHead>
                        <TableHead className="text-center text-black">
                          Nama Pegawai
                        </TableHead>
                        <TableHead className="text-center text-black rounded-tr-lg">
                          Unit Kerja
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200">
                      {currentBirthdays.map((birthday) => (
                        <TableRow
                          key={birthday.id}
                          className="even:bg-gray-100"
                        >
                          <TableCell className="text-center">
                            {formatDate(birthday.tanggal_lahir)}
                          </TableCell>
                          <TableCell className="text-center">
                            {birthday.nip}
                          </TableCell>
                          <TableCell className="text-left">
                            {birthday.nama}
                          </TableCell>
                          <TableCell className="text-left">
                            {birthday.unit_kerja_nama}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pb-2 px-4">
                    <span className="text-sm text-gray-500">
                      Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, displayData.birthdays.length)} dari {displayData.birthdays.length}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Sebelumnya
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Selanjutnya
                      </Button>
                    </div>
                  </div>
                )}
              </CustomCard>
            </div>
          </div>
        </>
      ) : (
        // Ditampilkan jika tidak ada data sama sekali (setelah loading selesai)
        <div>Data tidak ditemukan.</div>
      )}
    </div>
  );
};

export default Dasboard;

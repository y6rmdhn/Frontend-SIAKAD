// File: Dasboard.tsx

import CustomCard from "@/components/blocks/Card";
import {
  FaGraduationCap,
  FaBirthdayCake,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlinePersonRemove } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { RiErrorWarningLine } from "react-icons/ri";
import { HiSpeakerphone } from "react-icons/hi";
import Title from "@/components/blocks/Title";
import CardStatistikPegawai from "@/components/blocks/CardStatistikPegawai/CardStatistikPegawai";
import SelectFilter from "@/components/blocks/SelectFilter";
import unitKerjaOptions from "@/constant/dummyFilter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import adminServices from "@/services/admin.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingStateDasbordAdmin from "@/components/blocks/LoadingStateDasboradAdmin/LoadingStateDasbordAdmin.tsx";

// --- START: Impor untuk Modal, Form, dan Validasi ---
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import potsReferensiServices from "@/services/create.admin.referensi"; // Pastikan path ini benar
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// --- END: Impor ---

// --- START: Definisi Tipe Data ---
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
  id: number;
  nip: string;
  nama: string;
  tanggal_lahir: string;
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
  work_relationships: { chart_data: ChartData; table_data: TableData<any> };
  news: NewsItem[];
  birthdays: BirthdayItem[];
}
const generateGajiSchema = z.object({
  bulan: z
    .string({ required_error: "Bulan wajib dipilih." })
    .min(1, "Bulan wajib dipilih."),
  tahun: z.string().min(4, { message: "Tahun harus terdiri dari 4 digit." }),
});

const Dasboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof generateGajiSchema>>({
    resolver: zodResolver(generateGajiSchema),
    defaultValues: {
      bulan: "",
      tahun: new Date().getFullYear().toString(),
    },
  });

  const { data } = useQuery<DashboardData>({
    queryKey: ["dasboard-admin"],
    queryFn: async () => {
      const response = await adminServices.getDasboardAdmin();
      return response.data.data;
    },
  });

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
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
    });
  };

  const { mutate: mutateGenerateGaji, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof generateGajiSchema>) => {
      return potsReferensiServices.generatePayroll(data);
    },
    // --- START: FIX ---
    // The first parameter is the response from the server ('_response' - unused).
    // The second parameter is the variables submitted to the mutation ('variables').
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
    // --- END: FIX ---
  });

  const handleSubmitData = (values: z.infer<typeof generateGajiSchema>) => {
    mutateGenerateGaji(values);
  };

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
            <SelectFilter
              options={unitKerjaOptions}
              classname="w-40 sm:w-80 md:w-80 lg:w-80 xl:w-80 2xl:w-80 hidden md:flex"
              placeholder="041001 - Universitas Ibn Khaldun"
            />
          </div>
        }
      />

      {data ? (
        <>
          <div className="grid grid-rows-4 sm:grid-rows-1 md:grid-rows-1 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 md:gap-2 lg:gap-10 mt-6 sm:gap-3 xl:gap-10 2xl:gap-10">
            <div className="bg-gradient-to-r from-[#1C8C88] to-[#28BCB7] h-20 xl:h-40 2xl:h-40 lg:h-40 rounded-xl text-white flex items-center justify-center relative sm:h-30 md:h-35">
              <div className="relative w-full h-full flex items-center justify-center">
                <h1 className="text-xs lg:text-lg font-semibold text-center flex flex-col items-center sm:text-xs md:text-sm md:mx-1 xl:text-lg 2xl:text-lg">
                  Jumlah Pegawai Aktif
                  <p className="xl:text-4xl 2xl:text-4xl lg:text-4xl font-semibold mt-3 sm:text-lg md:text-2xl">
                    {data.staff_summary.active_employees}
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
                    {data.staff_summary.academic_staff}
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
                    {data.staff_summary.non_academic_staff}
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
                    {data.staff_summary.inactive_employees}
                  </p>
                </h1>
                <MdOutlinePersonRemove className="lg:w-14 lg:h-14 absolute bottom-0 left-1 sm:w-6 sm:h-7" />
              </div>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-2 2xl:grid grid-cols-1 md:2xl:grid-cols-2 gap-5 mt-10">
            <div className="min-w-0">
              <CardStatistikPegawai
                academicEducation={data.academic_education}
                nonAcademicEducation={data.non_academic_education}
                staffDistribution={data.staff_distribution}
                workRelationships={data.work_relationships}
              />
            </div>

            <div className="flex flex-col gap-5 min-w-0">
              <CustomCard
                actions={
                  <h1 className="flex gap-3 items-center text-[#DA2A21]">
                    <RiErrorWarningLine className="w-5 h-5" />{" "}
                    <span className="text-lg font-semibold">Pemberitahuan</span>
                  </h1>
                }
                cardStyle="border-t-[#DA2A21] border-t-2"
              >
                {data.news.length > 0 && (
                  <div className="min-w-0">
                    <h1 className="truncate font-semibold">
                      {data.news[0].judul}
                    </h1>
                    <p className="text-xs text-muted-foreground truncate">
                      {data.news[0].ringkasan}
                    </p>
                  </div>
                )}
              </CustomCard>
              <CustomCard
                actions={
                  <h1 className="flex gap-3 items-center">
                    <HiSpeakerphone />{" "}
                    <span className="text-lg font-semibold text-[#106D63]">
                      Berita
                    </span>
                  </h1>
                }
                cardStyle="border-t-[#106D63] border-t-2"
              >
                <div className="flex flex-col gap-5 overflow-hidden">
                  {data.news.map((item) => (
                    <div key={item.id} className="min-w-0">
                      <h1 className="truncate font-semibold">{item.judul}</h1>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.ringkasan}
                      </p>
                    </div>
                  ))}
                </div>
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
                      {data.birthdays.map((birthday) => (
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
              </CustomCard>
            </div>
          </div>
        </>
      ) : (
        <LoadingStateDasbordAdmin />
      )}
    </div>
  );
};

export default Dasboard;

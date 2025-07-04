import { useEffect, useState, MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query"; // Diperbarui
import { useDebounce } from "use-debounce";
import { toast } from "sonner";

// UI & Custom Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";

// Icons
import { IoMdDownload } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
// Services
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi";
import putReferensiServices from "@/services/put.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import { IoSaveOutline } from "react-icons/io5";

// --- Skema Validasi dan Tipe Data ---
const gelarSchema = z.object({
  id: z.number().optional(),
  gelar: z.string().min(1, "Gelar tidak boleh kosong"),
  nama_gelar: z.string().min(1, "Nama Gelar tidak boleh kosong"),
});

type GelarFormValues = z.infer<typeof gelarSchema>;

interface GelarItem {
  id: number;
  gelar: string;
  nama_gelar: string;
}

// PERBAIKAN: Tipe ini sekarang mencerminkan seluruh objek response
interface GelarApiResponse {
  data: {
    data: GelarItem[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
}

// --- Komponen Utama ---
const GelarAkademik = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  // --- State Management ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 500);
  const [isAddData, setIsAddData] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const currentPage = searchParam.get("page") || "1";

  const form = useForm<GelarFormValues>({
    resolver: zodResolver(gelarSchema),
    defaultValues: { gelar: "", nama_gelar: "" },
  });

  // --- Data Fetching ---
  const { data, isLoading, isError, error } = useQuery<GelarApiResponse>({
    queryKey: ["gelar-akademik", currentPage, debouncedSearch],
    queryFn: async () => {
      const response = await adminServices.getGelarAkademik({
        page: currentPage,
        search: debouncedSearch,
      });
      // PERBAIKAN: Mengembalikan seluruh objek `response.data`
      return response.data;
    },
    // PERBAIKAN: Menggunakan `placeholderData` untuk TanStack Query v5
    placeholderData: keepPreviousData,
  });

  // --- Data Mutations ---
  const { mutate: postData, isPending: isPosting } = useMutation({
    mutationFn: (data: GelarFormValues) =>
      potsReferensiServices.postGelarAkademik(data),
    onSuccess: () => {
      toast.success("Berhasil menambahkan data");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["gelar-akademik"] });
    },
    onError: (err: any) =>
      toast.error(
        `Gagal: ${err.response?.data?.message || "Terjadi kesalahan"}`
      ),
  });

  const { mutate: putData, isPending: isPutting } = useMutation({
    mutationFn: (data: GelarFormValues) =>
      putReferensiServices.putGelarAkademik(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["gelar-akademik"] });
    },
    onError: (err: any) =>
      toast.error(
        `Gagal: ${err.response?.data?.message || "Terjadi kesalahan"}`
      ),
  });

  const { mutate: deleteData } = useMutation({
    mutationFn: (id: number) => deleteReferensiServices.deleteGelarAkademik(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["gelar-akademik"] });
    },
    onError: (err: any) =>
      toast.error(
        `Gagal: ${err.response?.data?.message || "Terjadi kesalahan"}`
      ),
  });

  // --- Event Handlers ---
  const handleUrlChange = (paramName: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParam);
    if (value) newSearchParams.set(paramName, value);
    else newSearchParams.delete(paramName);
    if (paramName !== "page") newSearchParams.set("page", "1");
    setSearchParam(newSearchParams);
  };

  useEffect(() => {
    handleUrlChange("search", debouncedSearch);
  }, [debouncedSearch]);

  const handleCancel = () => {
    form.reset({ gelar: "", nama_gelar: "" });
    setIsEditMode(false);
    setEditingItemId(null);
    setIsAddData(false);
  };

  const handleEditItem = (
    e: MouseEvent<HTMLButtonElement>,
    item: GelarItem
  ) => {
    e.preventDefault();
    form.reset(item);
    setIsEditMode(true);
    setEditingItemId(item.id);
    setIsAddData(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitData = (values: GelarFormValues) => {
    isEditMode ? putData(values) : postData(values);
  };

  if (isError)
    return (
      <div className="text-center mt-20 text-red-500">
        Gagal memuat data: {(error as Error).message}
      </div>
    );

  // PERBAIKAN: Mengakses data dari `data.data`
  const tableData = data?.data;

  return (
    <div className="mt-10 mb-20">
      <Title title="Gelar Akademik" subTitle="Daftar Gelar Akademik" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <SearchInput
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                className="w-full md:w-80"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() =>
                    toast.info("Fitur ini sedang dalam pengembangan.")
                  }
                >
                  <IoMdDownload className="mr-2" /> Unduh dari Sister
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (!isEditMode) setIsAddData(true);
                  }}
                  disabled={isEditMode}
                  className="bg-green-light-uika hover:bg-[#329C59]"
                >
                  <FaPlus className="mr-2" /> Tambah
                </Button>
              </div>
            </div>

            <div className="mt-5 border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 hover:bg-gray-100">
                    <TableHead className="w-2/5">Gelar</TableHead>
                    <TableHead className="w-2/5">Nama Gelar</TableHead>
                    <TableHead className="text-center w-1/5">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isAddData && (
                    <TableRow>
                      <TableCell>
                        <FormFieldInput
                          form={form}
                          name="gelar"
                          placeholder="Contoh: S.Kom"
                        />
                      </TableCell>
                      <TableCell>
                        <FormFieldInput
                          form={form}
                          name="nama_gelar"
                          placeholder="Contoh: Sarjana Komputer"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center gap-2">
                          <Button
                            size="icon"
                            type="submit"
                            disabled={isPosting || isPutting}
                          >
                            <IoSaveOutline className="w-5 h-5" />
                          </Button>
                          <Button
                            size="icon"
                            type="button"
                            variant="destructive"
                            onClick={handleCancel}
                          >
                            <RiResetLeftFill />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={3}>
                          <Skeleton className="h-8 w-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : tableData?.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center h-24">
                        Data tidak ditemukan.
                      </TableCell>
                    </TableRow>
                  ) : (
                    tableData?.data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.gelar}</TableCell>
                        <TableCell>{item.nama_gelar}</TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center gap-2">
                            <Button
                              size="icon"
                              type="button"
                              variant="ghost"
                              onClick={(e) => handleEditItem(e, item)}
                              disabled={isEditMode && editingItemId !== item.id}
                            >
                              <MdEdit
                                className={`w-5 h-5 ${
                                  editingItemId === item.id
                                    ? "text-gray-400"
                                    : "text-yellow-500"
                                }`}
                              />
                            </Button>
                            <ConfirmDialog
                              title="Hapus Data?"
                              description={`Yakin ingin menghapus gelar "${item.nama_gelar}"?`}
                              onConfirm={() => deleteData(item.id)}
                            >
                              <Button size="icon" variant="ghost">
                                <FaRegTrashAlt className="text-red-500" />
                              </Button>
                            </ConfirmDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {tableData && tableData.data.length > 0 && (
              <CustomPagination
                currentPage={tableData.current_page}
                totalPages={tableData.last_page}
                onPageChange={(page) => handleUrlChange("page", String(page))}
                hasNextPage={!!tableData.next_page_url}
                hasPrevPage={!!tableData.prev_page_url}
              />
            )}
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default GelarAkademik;

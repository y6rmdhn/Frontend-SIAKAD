import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import unitKerjaOptions from "@/constant/dummyFilter";
import { FaPlus } from "react-icons/fa6";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import RumpunBidangIlmuRow from "@/components/blocks/RumpunBidangIlmuRow/RumpunBidangIlmuRow";
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import putReferensiServices from "@/services/put.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AddRumpunBidangIlmuRow from "@/components/blocks/AddRumpunBidangIlmuRow/AddRumpunBidangIlmuRow";

// Skema validasi Zod
export const rumpunSchema = z.object({
  id: z.number().optional(),
  kode: z.string().min(1, { message: "Kode tidak boleh kosong." }),
  nama_bidang: z
    .string()
    .min(1, { message: "Nama bidang tidak boleh kosong." }),
  parent_category: z.string().optional().nullable(),
  sub_parent_category: z.string().optional().nullable(),
});

// Tipe untuk form dan data
export type RumpunFormValues = z.infer<typeof rumpunSchema>;

interface RumpunItem {
  id: number;
  kode: string;
  nama_bidang: string;
  parent_category: string;
  sub_parent_category: string;
  [key: string]: any;
}

export interface RumpunNode extends RumpunItem {
  children: RumpunNode[];
}

interface RumpunApiResponse {
  success: boolean;
  data: {
    data: RumpunItem[];
    current_page: number;
    last_page: number;
  };
}

// Fungsi untuk membangun struktur pohon dari data flat
function buildTree(items: RumpunItem[]): RumpunNode[] {
  const nodeMap: { [key: string]: RumpunNode } = {};
  const roots: RumpunNode[] = [];

  items.forEach((item) => {
    nodeMap[item.nama_bidang] = {
      ...item,
      children: [],
    };
  });

  items.forEach((item) => {
    if (item.parent_category && nodeMap[item.parent_category]) {
      const parentNode = nodeMap[item.parent_category];
      const childNode = nodeMap[item.nama_bidang];
      if (parentNode && childNode && parentNode.id !== childNode.id) {
        parentNode.children.push(childNode);
      }
    } else {
      const rootNode = nodeMap[item.nama_bidang];
      if (rootNode) {
        roots.push(rootNode);
      }
    }
  });

  return roots;
}

const RumpunBidangIlmu = () => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const form = useForm<RumpunFormValues>({
    resolver: zodResolver(rumpunSchema),
    defaultValues: {
      kode: "",
      nama_bidang: "",
      parent_category: "",
      sub_parent_category: "",
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<RumpunApiResponse>({
      queryKey: ["rumpun-bidang-ilmu-all"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await adminServices.getRumpunBidangIlmu(pageParam);
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.data.current_page;
        const totalPages = lastPage.data.last_page;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  const queryKey = ["rumpun-bidang-ilmu-all"];

  const { mutate: postData, isPending: isPosting } = useMutation({
    mutationFn: (data: RumpunFormValues) =>
      potsReferensiServices.rumpunBidangIlmu(data),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan");
      handleCancel();
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      toast.error("Gagal menambahkan data: " + error.message);
    },
  });

  const { mutate: putData, isPending: isPutting } = useMutation({
    mutationFn: (data: RumpunFormValues) =>
      putReferensiServices.rumpunBidangIlmu(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");
      handleCancel();
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      toast.error("Gagal mengedit data: " + error.message);
    },
  });

  const { mutate: deleteData } = useMutation({
    mutationFn: (id: number) =>
      deleteReferensiServices.deleteRumpunBidangIlmu(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey });
      handleCancel();
    },
    onError: (error) => {
      toast.error("Gagal menghapus data: " + error.message);
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      deleteData(id);
    }
  };

  const onSubmit: SubmitHandler<RumpunFormValues> = (values) => {
    if (editingItemId) {
      putData({ ...values, id: editingItemId });
    } else {
      postData(values);
    }
  };

  const handleEditItem = (item: RumpunNode) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      nama_bidang: item.nama_bidang,
      parent_category: item.parent_category,
      sub_parent_category: item.sub_parent_category,
    });
    setEditingItemId(item.id);
    setIsAddData(false);
  };

  const handleCancel = () => {
    form.reset({
      kode: "",
      nama_bidang: "",
      parent_category: "",
      sub_parent_category: "",
    });
    setEditingItemId(null);
    setIsAddData(false);
  };

  const allRumpunData = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.data) ?? [];
  }, [data]);

  const treeData = useMemo(() => {
    return allRumpunData.length > 0 ? buildTree(allRumpunData) : [];
  }, [allRumpunData]);

  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const toggleRow = (kode: string) => {
    setOpenRows((prev) => ({ ...prev, [kode]: !prev[kode] }));
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Rumpun Bidang Ilmu" subTitle="Daftar Rumpun Bidang Ilmu" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CustomCard
            actions={
              <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
                <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
                  <SelectFilter
                    options={unitKerjaOptions}
                    classname="lg:w-32"
                  />
                  <SearchInput className="w-full lg:w-80" />
                </div>
                <div className="w-full flex gap-3 justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      handleCancel();
                      setIsAddData(true);
                    }}
                    className={`cursor-pointer ${
                      editingItemId
                        ? "bg-gray-400"
                        : "bg-green-light-uika hover:bg-[#329C59]"
                    }`}
                    disabled={editingItemId !== null}
                  >
                    <FaPlus /> Tambah
                  </Button>
                </div>
              </div>
            }
          >
            <Table className="table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-left text-xs sm:text-sm w-20"></TableHead>
                  <TableHead className="text-left text-xs sm:text-sm w-1/4">
                    Kode
                  </TableHead>
                  <TableHead className="text-left text-xs sm:text-sm w-1/3">
                    Nama Bidang
                  </TableHead>
                  <TableHead className="text-left text-xs sm:text-sm w-1/4">
                    Parent Bidang
                  </TableHead>
                  <TableHead className="text-left text-xs sm:text-sm w-1/4">
                    Sub Parent
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {isAddData && (
                  <AddRumpunBidangIlmuRow
                    form={form}
                    handleCancel={handleCancel}
                    isPending={isPosting}
                  />
                )}
                {isFetching && allRumpunData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : (
                  treeData.map((node) => (
                    <RumpunBidangIlmuRow
                      key={node.id}
                      node={node}
                      level={0}
                      form={form}
                      openRows={openRows}
                      toggleRow={toggleRow}
                      editingItemId={editingItemId}
                      handleEdit={handleEditItem}
                      handleDelete={handleDelete}
                      handleCancel={handleCancel}
                      isPending={isPutting}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default RumpunBidangIlmu;

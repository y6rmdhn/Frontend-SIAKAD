import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
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
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import adminServices from "@/services/admin.services";
import CustomPagination from "@/components/blocks/CustomPagination";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import putReferensiServices from "@/services/put.admin.referensi";
import { toast } from "sonner";

interface statusPernikahanItem {
  id: string;
  kode_status: string;
  nama_status: string;
  // Add other properties as needed
}

// Define interface for the API response
interface statusPernikahanResponse {
  data: statusPernikahanItem[];
  links: any[]; // You might want to define a more specific type
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const statusPernikahanSchema = z.object({
  id: z.number().optional(),
  kode_status: z.string().min(1, "Kode status tidak boleh kosong"),
  nama_status: z.string().min(1, "Nama status tidak boleh kosong"),
});

type statusPernikahanFormvalue = z.infer<typeof statusPernikahanSchema>;

const StatusPernikahan = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [currentPage] = useState<number>(Number(searchParam.get("page") || 1));

  const form = useForm({
    defaultValues: {
      kode_status: "",
      nama_status: "",
    },
    resolver: zodResolver(statusPernikahanSchema),
  });

  // get data
  const { data } = useQuery<statusPernikahanResponse>({
    queryKey: ["status-pernikahan", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getStatusPernikahan(
        searchParam.get("page")
      );

      return response.data.data;
    },
  });

  // edit data
  const { mutate: putData } = useMutation({
    mutationFn: (data: statusPernikahanFormvalue) =>
      putReferensiServices.statusPernikahan(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");

      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["status-pernikahan"] });
    },
  });

  const handleSubmitData = (values: statusPernikahanFormvalue) => {
    putData(values);
  };

  const handleEditItem = (item: statusPernikahanItem) => {
    form.reset({
      id: item.id,
      kode_status: item.kode_status,
      nama_status: item.nama_status,
    });

    setIsEditMode(true);
    setEditingItemId(item.id);
    setIsAddData(true);

    if (Number(searchParam.get("page")) !== 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
    setIsAddData(false);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Status Pernikahan" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard>
            <Table className="table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">
                    Kode
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Status
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {isEditMode && currentPage === 1 && (
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="kode_status"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="nama_status"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex justify-center items-center w-full h-full">
                        <Button
                          type="submit"
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <IoSaveOutline className="w-5! h-5!" />
                        </Button>
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={handleCancel}
                        >
                          <RiResetLeftFill className="text-yellow-uika" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {data?.data.map((item) => (
                  <TableRow key={item.id} className=" even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.kode_status}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.nama_status}
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex justify-center items-center w-full h-full">
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => handleEditItem(item)}
                          disabled={isEditMode && editingItemId !== item.id}
                        >
                          <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <CustomPagination
              currentPage={Number(searchParam.get("page") || 1)}
              links={data?.links || []}
              onPageChange={(page) => {
                searchParam.set("page", page.toString());
                setSearchParam(searchParam);
              }}
              hasNextPage={!!data?.next_page_url}
              hasPrevPage={!!data?.prev_page_url}
              totalPages={data?.last_page}
            />
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default StatusPernikahan;

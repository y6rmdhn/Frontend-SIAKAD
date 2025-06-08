import CustomCard from "@/components/blocks/Card";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {useForm} from "react-hook-form";
import {FaPlus, FaRegTrashAlt} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import CustomPagination from "@/components/blocks/CustomPagination";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput.tsx";
import {IoSaveOutline} from "react-icons/io5";
import {RiResetLeftFill} from "react-icons/ri";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import {ConfirmDialog} from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";


// Define interface for the data item
interface JenisPelanggaranItem {
    id: number;
    kode: string;
    nama_pelanggaran: string;
    // Add other properties as needed
}

// Define interface for the API response
interface JenisPelanggaranResponse {
    data: JenisPelanggaranItem[];
    links: any[]; // You might want to define a more specific type
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page: number;
}

const jenisPelanggaranSchema = z.object({
    id: z.number().optional(),
    kode: z.string().min(1, "Kode tidak boleh kosong"),
    nama_pelanggaran: z.string().min(1, "Nama Pelanggran tidak boleh kosong"),
});

type jenisPelanggaranFormvalue = z.infer<typeof jenisPelanggaranSchema>;


const JenisPelanggaran = () => {
    const form = useForm({
        defaultValues: {
            kode: "",
            nama_pelanggaran: "",
        }, resolver: zodResolver(jenisPelanggaranSchema)
    });

    const [searchParam, setSearchParam] = useSearchParams();
    const [isAddData, setIsAddData] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParam.get("page") || 1));
    const queryClient = useQueryClient();

    // get data
    const {data} = useQuery<JenisPelanggaranResponse>({
        queryKey: ["jenis-pelanggaran", searchParam.get("page")],
        queryFn: async () => {
            const response = await adminServices.getJenisPelanggaran(
                searchParam.get("page")
            );

            return response.data.data;
        },
    });

    // tambah
    const {mutate: postData} = useMutation({
        mutationFn: (data) =>
            potsReferensiServices.jenisPelanggaran(data),
        onSuccess: () => {
            form.reset();
            toast.success("Data berhasil ditambahkan");
            setIsAddData(false);
            queryClient.invalidateQueries({queryKey: ["jenis-pelanggaran"]});
        },
    });

    // edit
    const {mutate: updateData} = useMutation({
        mutationFn: (data: jenisPelanggaranFormvalue) => putReferensiServices.jenisPelanggaran(data.id!, data),
        onSuccess: () => {
            form.reset();
            toast.success("Data berhasil diedit");
            setIsAddData(false);
            setIsEditMode(false);

            queryClient.invalidateQueries({queryKey: ["jenis-pelanggaran"]});
        }
    })

    // hapus data
    const {mutate: deleteData} = useMutation({
        mutationFn: (id: number) => deleteReferensiServices.deteleJenisPelanggaran(id),
        onSuccess: () => {
            toast.success("Data berhasil dihapus");
            queryClient.invalidateQueries({queryKey: ["jenis-pelanggaran"]});

            if (editingItemId) {
                form.reset();
                setEditingItemId(null);
                setIsEditMode(false);
                setIsAddData(false);
            }
        }
    })

    const handleDelete = (id: number) => {
        deleteData(id)
    };

    const handleSubmitData = (values: jenisPelanggaranFormvalue) => {
        if (isEditMode && editingItemId) {
            updateData(values)
        } else {
            postData(values)
        }
    }

    const handleEditItem = (item: JenisPelanggaranItem) => {
        form.reset({
            id: item.id,
            kode: item.kode,
            nama_pelanggaran: item.nama_pelanggaran,
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
        form.reset()
        setIsEditMode(false);
        setEditingItemId(null);
        setIsAddData(false);
    };

    useEffect(() => {
        const page = Number(searchParam.get("page") || 1);
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    }, [searchParam]);

    useEffect(() => {
        if (!searchParam.get("page")) {
            searchParam.set("page", "1");
            setSearchParam(searchParam);
        }
    }, [searchParam, setSearchParam]);

    useEffect(() => {
        if (Number(searchParam.get("page")) < 1) {
            searchParam.set("page", "1");
            setSearchParam(searchParam);
        }
    }, [searchParam, setSearchParam]);

    useEffect(() => {
        if (
            data?.last_page &&
            Number(searchParam.get("page")) > data.last_page &&
            data.last_page > 0
        ) {
            searchParam.set("page", data.last_page.toString());
            setSearchParam(searchParam);
        }
    }, [searchParam, data, setSearchParam]);

    return (
        <div className="mt-10 mb-20">
            <h1 className="text-lg sm:text-2xl font-normal">Jenis Pelanggaran</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitData)}>
                    <CustomCard
                        actions={
                            <div className="flex justify-end">
                                <div className="flex gap-4">
                                    <Button type="button" onClick={() => {
                                        if (!isEditMode) {
                                            form.reset({
                                                kode: "",
                                                nama_pelanggaran: "",
                                            })

                                            setIsAddData(true);
                                            searchParam.set("page", "1");
                                            setSearchParam(searchParam);
                                        }
                                    }} className={`cursor-pointer ${
                                        isEditMode
                                            ? "bg-gray-400"
                                            : "bg-green-light-uika hover:bg-[#329C59]"
                                    }`}
                                            disabled={isEditMode}>
                                        <FaPlus className="w-4! h-4! text-white"/>
                                        Tambah
                                    </Button>
                                </div>
                            </div>
                        }
                    >
                        <Table className="mt-5 table-auto">
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
                                    <TableHead className="text-center text-xs sm:text-sm">
                                        Nama Pelanggaran
                                    </TableHead>
                                    <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-200">
                                {(isAddData || isEditMode) && currentPage === 1 && (
                                    <TableRow className=" even:bg-gray-100">
                                        <TableCell className="text-center text-xs sm:text-sm">
                                            <FormFieldInput
                                                inputStyle="w-full"
                                                position={true}
                                                form={form}
                                                name="kode"
                                                required={false}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center text-xs sm:text-sm">
                                            <FormFieldInput
                                                inputStyle="w-full"
                                                position={true}
                                                form={form}
                                                name="nama_pelanggaran"
                                                required={false}
                                            />
                                        </TableCell>
                                        <TableCell className="h-full ">
                                            <div className="flex justify-center items-center w-full h-full">
                                                <Button
                                                    type="submit"
                                                    size="icon"
                                                    variant="ghost"
                                                    className="cursor-pointer"
                                                >
                                                    <IoSaveOutline className="w-5! h-5!"/>
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    type="button"
                                                    variant="ghost"
                                                    className="cursor-pointer"
                                                    onClick={handleCancel}
                                                >
                                                    <RiResetLeftFill className="text-yellow-uika"/>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {data?.data.map((item) => (
                                    <TableRow className=" even:bg-gray-100">
                                        <TableCell className="text-center text-xs sm:text-sm">{item.kode}</TableCell>
                                        <TableCell
                                            className="text-center text-xs sm:text-sm">{item.nama_pelanggaran}</TableCell>
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
                                                    <MdEdit className="w-5! h-5! text-[#26A1F4]"/>
                                                </Button>
                                                <ConfirmDialog
                                                    title="Hapus Data?"
                                                    description="Apakah Anda yakin ingin menghapus data ini?"
                                                    onConfirm={() => handleDelete(item.id)}
                                                >
                                                    <Button
                                                        size="icon"
                                                        type="button"
                                                        variant="ghost"
                                                        className="cursor-pointer"
                                                    >
                                                        <FaRegTrashAlt className="text-red-500"/>
                                                    </Button>
                                                </ConfirmDialog>
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

                                if (isEditMode) {
                                    toast.warning("Selesaikan edit data terlebih dahulu");
                                    return;
                                }

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

export default JenisPelanggaran;

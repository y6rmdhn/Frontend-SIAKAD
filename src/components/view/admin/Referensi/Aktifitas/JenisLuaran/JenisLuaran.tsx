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
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {MdEdit} from "react-icons/md";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import adminServices from "@/services/admin.services.ts";
import {toast} from "sonner";
import CustomPagination from "@/components/blocks/CustomPagination";
import {z} from "zod";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import {IJenisLuaran} from "@/types/create.referensi.ts";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput.tsx";
import {IoSaveOutline} from "react-icons/io5";
import {RiResetLeftFill} from "react-icons/ri";
import {zodResolver} from "@hookform/resolvers/zod";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import {ConfirmDialog} from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";

// Define interface for the data item
interface JenisLuaranItem {
    id: string;
    kode: string;
    jenis_luaran: string;
    // Add other properties as needed
}

// Define interface for the API response
interface JenisLuaranResponse {
    data: JenisLuaranItem[];
    links: any[]; // You might want to define a more specific type
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page: number;
}

const jenisLuaranSchema = z.object({
    id: z.number().optional(),
    kode: z.string().min(1, "Kode tidak boleh kosong"),
    jenis_luaran: z.string().min(1, "Jenis Luaran tidak boleh kosong"),
});

type jenisLuaranFormvalue = z.infer<typeof jenisLuaranSchema>;

const JenisLuaran = () => {
    const form = useForm({
        defaultValues: {
            kode: "",
            jenis_luaran: "",
        }, resolver: zodResolver(jenisLuaranSchema)
    });

    const [searchParam, setSearchParam] = useSearchParams();
    const [isAddData, setIsAddData] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParam.get("page") || 1));
    const queryClient = useQueryClient();

    // get data
    const {data} = useQuery<JenisLuaranResponse>({
        queryKey: ["jenis-luaran", searchParam.get("page")],
        queryFn: async () => {
            const response = await adminServices.getJenisLuaran(
                searchParam.get("page")
            );

            return response.data.data;
        },
    });

    // tambah
    const {mutate: postJenisLuaran} = useMutation({
        mutationFn: (data: IJenisLuaran) =>
            potsReferensiServices.jenisLuaran(data),
        onSuccess: () => {
            form.reset();
            toast.success("Data berhasil ditambahkan");
            setIsAddData(false);
            queryClient.invalidateQueries({queryKey: ["jenis-luaran"]});
        },
    });

    // edit
    const {mutate: putJenisLuaran} = useMutation({
        mutationFn: (data: jenisLuaranFormvalue) => putReferensiServices.jenisLuaran(data.id!, data),
        onSuccess: () => {
            form.reset();
            toast.success("Data berhasil diedit");
            setIsAddData(false);
            setIsEditMode(false);

            queryClient.invalidateQueries({queryKey: ["jenis-luaran"]});
        }
    })

    // hapus data
    const {mutate: deleteStatusAktif} = useMutation({
        mutationFn: (id: number) => deleteReferensiServices.deteleJenisLuaran(id),
        onSuccess: () => {
            toast.success("Data berhasil dihapus");
            queryClient.invalidateQueries({queryKey: ["jenis-luaran"]});

            if (editingItemId) {
                form.reset();
                setEditingItemId(null);
                setIsEditMode(false);
                setIsAddData(false);
            }
        }
    })

    const handleDelete = (id: number) => {
        deleteStatusAktif(id)

    };

    const handleSubmitJenisLuaran = (values: jenisLuaranFormvalue) => {
        if (isEditMode && editingItemId) {
            putJenisLuaran(values)
        } else {
            postJenisLuaran(values)
        }
    }

    const handleEditItem = (item: JenisLuaranItem) => {
        form.reset({
            id: item.id,
            kode: item.kode,
            jenis_luaran: item.jenis_luaran,
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
            <h1 className="text-lg sm:text-2xl font-normal">Jenis Luaran</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitJenisLuaran)}>
                    <CustomCard
                        actions={
                            <div className="flex justify-end">
                                <div className="flex gap-4">
                                    <Button type="button" onClick={() => {
                                        if (!isEditMode) {
                                            form.reset({
                                                kode: "",
                                                jenis_luaran: "",
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
                                    <TableHead className="text-center text-xs sm:text-sm">Jenis Luaran</TableHead>
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
                                                name="jenis_luaran"
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
                                {data?.data.map(item => (
                                    <TableRow key={item.id} className=" even:bg-gray-100">
                                        <TableCell className="text-center text-xs sm:text-sm">{item.kode}</TableCell>
                                        <TableCell className="text-center text-xs sm:text-sm">{item.jenis_luaran}</TableCell>
                                        <TableCell className="h-full">
                                            <div className="flex justify-center items-center w-full h-full">
                                                <Button
                                                    size="icon"
                                                    type="button"
                                                    variant="ghost"
                                                    className="cursor-pointer"
                                                    onClick={ ()=> handleEditItem(item)}
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

export default JenisLuaran;

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
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {IPengabdian} from "@/types/create.referensi.ts";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput.tsx";
import {IoSaveOutline} from "react-icons/io5";
import {RiResetLeftFill} from "react-icons/ri";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import {ConfirmDialog} from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";

// Define interface for the data item
interface JenisPengabdianItem {
    id: number;
    kode: string;
    nama_pkm: string;
    // Add other properties as needed
}

// Define interface for the API response
interface JenisPengabdianResponse {
    data: JenisPengabdianItem[];
    links: any[]; // You might want to define a more specific type
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page: number;
}

const jenisPengabdianSchema = z.object({
    id: z.number().optional(),
    kode: z.string().min(1, "Kode tidak boleh kosong"),
    nama_pkm: z.string().min(1, "Nama Pkn tidak boleh kosong"),
});

type jenisPengabdianFormvalue = z.infer<typeof jenisPengabdianSchema>;

const JenisPengabdian = () => {
    const form = useForm({
        defaultValues: {
            kode: "",
            nama_pkm: "",
        },
        resolver: zodResolver(jenisPengabdianSchema)
    });

    const [searchParam, setSearchParam] = useSearchParams();
    const [isAddData, setIsAddData] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParam.get("page") || 1));
    const queryClient = useQueryClient();

    // get data
    const {data} = useQuery<JenisPengabdianResponse>({
        queryKey: ["jenis-pengabdian", searchParam.get("page")],
        queryFn: async () => {
            const response = await adminServices.getJenisPengabdian(
                searchParam.get("page")
            );

            return response.data.data;
        },
    });

    // tambah
    const {mutate: postJenisPengabdian} = useMutation({
        mutationFn: (data: IPengabdian) =>
            potsReferensiServices.jenisPengabdian(data),
        onSuccess: () => {
            form.reset();
            toast.success("Data berhasil ditambahkan");
            setIsAddData(false);
            queryClient.invalidateQueries({queryKey: ["jenis-pengabdian"]});
        },
    });

    // edit
    const {mutate: putJenisPengabdian} = useMutation({
        mutationFn: (data: jenisPengabdianFormvalue) => putReferensiServices.jenisPengabdian(data.id!, data),
        onSuccess: () => {
            form.reset();
            toast.success("Data berhasil diedit");
            setIsAddData(false);
            setIsEditMode(false);

            queryClient.invalidateQueries({queryKey: ["jenis-pengabdian"]});
        }
    })

    // hapus data
    const {mutate: deleteJenisPengabdian} = useMutation({
        mutationFn: (id: number) => deleteReferensiServices.deteleJenisPengabdian(id),
        onSuccess: () => {
            toast.success("Data berhasil dihapus");
            queryClient.invalidateQueries({queryKey: ["jenis-pengabdian"]});

            if (editingItemId) {
                form.reset();
                setEditingItemId(null);
                setIsEditMode(false);
                setIsAddData(false);
            }
        }
    })

    const handleDelete = (id: number) => {
        deleteJenisPengabdian(id)

    };

    const handleSubmitJenisPengabdian = (values: jenisPengabdianFormvalue) => {
        if (isEditMode && editingItemId) {
            putJenisPengabdian(values)
        } else {
            postJenisPengabdian(values)
        }
    }

    const handleEditItem = (item: JenisPengabdianItem) => {
        form.reset({
            id: item.id,
            kode: item.kode,
            nama_pkm: item.nama_pkm,
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
            <h1 className="text-2xl font-normal">Jenis Pengabdian</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitJenisPengabdian)}>
                    <CustomCard
                        actions={
                            <div className="flex justify-end">
                                <div className="flex gap-4">
                                    <Button type="button" onClick={() => {
                                        if (!isEditMode) {
                                            form.reset({
                                                kode: "",
                                                nama_pkm: "",
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
                                    <TableHead className="text-center">Kode</TableHead>
                                    <TableHead className="text-center">Nama PKM</TableHead>
                                    <TableHead className="text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-200">
                                {(isAddData || isEditMode) && currentPage === 1 && (
                                    <TableRow className=" even:bg-gray-100">
                                        <TableCell className="text-center">
                                            <FormFieldInput
                                                inputStyle="w-full"
                                                position={true}
                                                form={form}
                                                name="kode"
                                                required={false}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <FormFieldInput
                                                inputStyle="w-full"
                                                position={true}
                                                form={form}
                                                name="nama_pkm"
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
                                        <TableCell className="text-center">{item.kode}</TableCell>
                                        <TableCell className="text-center">{item.nama_pkm}</TableCell>
                                        <TableCell className="h-full">
                                            <div className="flex justify-center items-center w-full h-full">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    type="button"
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

export default JenisPengabdian;

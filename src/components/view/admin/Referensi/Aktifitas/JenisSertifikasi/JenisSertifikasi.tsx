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
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import CustomPagination from "@/components/blocks/CustomPagination";
import {IJenisLuaran} from "@/types/create.referensi.ts";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import {toast} from "sonner";
import {z} from "zod";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput.tsx";
import {IoSaveOutline} from "react-icons/io5";
import {RiResetLeftFill} from "react-icons/ri";
import {zodResolver} from "@hookform/resolvers/zod";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import {ConfirmDialog} from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";

interface jenisSertifikasiItem {
    id: number;
    kode: string,
    nama_sertifikasi: string,
    jenis_sertifikasi: string,
    // Add other properties as needed
}

// Define interface for the API response
interface jamKerjaResponse {
    data: jenisSertifikasiItem[];
    links: any[]; // You might want to define a more specific type
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page: number;
}

const jenisSertifikasiSchema = z.object({
    id: z.number().optional(),
    kode: z.string().min(1, "Kode tidak boleh kosong"),
    nama_sertifikasi: z.string().min(1, "Nama Sertifikasi tidak boleh kosong"),
    jenis_sertifikasi: z.string().min(1, "Jenis Sertifikasi tidak boleh kosong"),
});

type jenisSertifikasiFormvalue = z.infer<typeof jenisSertifikasiSchema>;

const JenisSertifikasi = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const queryClient = useQueryClient();
    const [isAddData, setIsAddData] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParam.get("page") || 1));

    const form = useForm({
        defaultValues: {
            kode: "",
            nama_sertifikasi: "",
            jenis_sertifikasi: "",
        },
        resolver: zodResolver(jenisSertifikasiSchema)
    });

    // get data
    const {data} = useQuery<jamKerjaResponse>({
        queryKey: ["jenis-sertifikasi", searchParam.get("page")],
        queryFn: async () => {
            const response = await adminServices.getJenisSertifikasiReferensi(
                searchParam.get("page")
            );

            console.log(response.data.data)

            return response.data.data;
        },
    });

    // tambah data
    const {mutate: postJenisSertifikasi} = useMutation({
        mutationFn: (data: IJenisLuaran) => potsReferensiServices.jenisSertifikasi(data),
        onSuccess: () => {
            form.reset();
            toast.success("Berhasil menambahkan data");
            setIsAddData(false);
            queryClient.invalidateQueries({queryKey: ["jenis-sertifikasi"]});
        }
    })

    // edit data
    const {mutate: putJenisSertifikasi} = useMutation({
        mutationFn: (data: jenisSertifikasiFormvalue) => putReferensiServices.jenisSertifikasi(data.id!, data),
        onSuccess: () => {
            toast.success("Data berhasil diedit");

            setIsEditMode(false);
            setIsAddData(false);
            setEditingItemId(null);

            form.reset();

            queryClient.invalidateQueries({queryKey: ["jenis-sertifikasi"]});
        }
    })

    // hapus data
    const {mutate: deleteJenisSertifikasi} = useMutation({
        mutationFn: (id: number) => deleteReferensiServices.deteleJenisSertifikasi(id),
        onSuccess: () => {
            toast.success("Data berhasil dihapus");
            queryClient.invalidateQueries({queryKey: ["jenis-sertifikasi"]});

            if (editingItemId) {
                form.reset();
                setEditingItemId(null);
                setIsEditMode(false);
                setIsAddData(false);
            }

        }
    })

    const handleSubmitJenisSertifikasi = (values: jenisSertifikasiFormvalue) => {
        if (isEditMode && editingItemId) {
            putJenisSertifikasi(values)
        } else {
            postJenisSertifikasi(values)
        }
    }

    const handleDelete = (id: number) => {
        deleteJenisSertifikasi(id)
    }

    const handleEditItem = (item: jenisSertifikasiItem) => {
        form.reset({
            id: item.id,
            kode: item.kode,
            nama_sertifikasi: item.nama_sertifikasi,
            jenis_sertifikasi: item.jenis_sertifikasi,
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
            <h1 className="text-2xl font-normal">Jenis Sertifikasi</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitJenisSertifikasi)}>
                    <CustomCard
                        actions={
                            <div className="flex justify-end">
                                <div className="flex gap-4">
                                    <Button type="button" onClick={() => {
                                        if (!isEditMode) {

                                            form.reset({
                                                id: 0,
                                                kode: "",
                                                nama_sertifikasi: "",
                                                jenis_sertifikasi: "",
                                            });

                                            setSearchParam(searchParam);
                                            setIsAddData(true);
                                            searchParam.set("page", "1");
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
                                    <TableHead className="text-center">
                                        Nama Sertifikasi
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Jenis Sertifikasi
                                    </TableHead>
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
                                                name="nama_sertifikasi"
                                                required={false}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <FormFieldInput
                                                inputStyle="w-full"
                                                position={true}
                                                form={form}
                                                name="jenis_sertifikasi"
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
                                {data?.data.map((item, index) => (
                                    <TableRow key={index} className=" even:bg-gray-100">
                                        <TableCell className="text-center">{item.kode}</TableCell>
                                        <TableCell className="text-center">{item.nama_sertifikasi}</TableCell>
                                        <TableCell className="text-center">{item.jenis_sertifikasi}</TableCell>
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

export default JenisSertifikasi;

import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import {Button} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {FaPlus, FaRegTrashAlt} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {FaCheck} from "react-icons/fa6";
import adminServices from "@/services/admin.services.ts";
import {IoClose, IoSaveOutline} from "react-icons/io5";
import {toast} from "sonner";
import CustomPagination from "@/components/blocks/CustomPagination";
import {useEffect, useState} from "react";
import {IStatusEselon} from "@/types/create.referensi.ts";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput.tsx";
import {RiResetLeftFill} from "react-icons/ri";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import {ConfirmDialog} from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";


interface elesonItem {
    id: number;
    kode: string;
    nama_eselon: string;
    status: boolean;
    // Add other properties as needed
}

// Define interface for the API response
interface eselonResponse {
    data: elesonItem[];
    links: any[]; // You might want to define a more specific type
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page: number;
}

const eselonSchema = z.object({
    id: z.number().optional(),
    kode: z.string().min(1, "Pangkat tidak boleh kosong"),
    nama_eselon: z.string().min(1, "Nama Golongan tidak boleh kosong"),
    status: z.boolean(),
});

type eselonFormvalue = z.infer<typeof eselonSchema>;

const Eleson = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const queryClient = useQueryClient();
    const [isAddData, setIsAddData] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParam.get("page") || 1));

    const form = useForm({
        defaultValues: {
            kode: "",
            nama_eselon: "",
            status: false,
        },
        resolver: zodResolver(eselonSchema)
    })

    // get data
    const {data} = useQuery<eselonResponse>({
        queryKey: ["eselon", searchParam.get("page")],
        queryFn: async () => {
            const response = await adminServices.getEselonReferensi(
                searchParam.get("page")
            );

            return response.data.data;
        },
    });

    // tambah data
    const {mutate: postEselon} = useMutation({
        mutationFn: (data: IStatusEselon) => potsReferensiServices.eselon(data),
        onSuccess: () => {
            form.reset();
            toast.success("Berhasil menambahkan data");
            setIsAddData(false);
            queryClient.invalidateQueries({queryKey: ["eselon"]});
        }
    })

    // edit data
    const {mutate: putEselon} = useMutation({
        mutationFn: (data: eselonFormvalue) => putReferensiServices.eselon(data.id!, data),
        onSuccess: () => {
            toast.success("Data berhasil diedit");

            setIsEditMode(false);
            setIsAddData(false);
            setEditingItemId(null);

            form.reset();

            queryClient.invalidateQueries({queryKey: ["eselon"]});
        }
    })

    // hapus data
    const {mutate: deleteEselon} = useMutation({
        mutationFn: (id: number) => deleteReferensiServices.deteleEselon(id),
        onSuccess: () => {
            toast.success("Data berhasil dihapus");
            queryClient.invalidateQueries({ queryKey: ["eselon"] });

            if (editingItemId) {
                form.reset();
                setEditingItemId(null);
                setIsEditMode(false);
                setIsAddData(false);
            }
        }
    })

    const handleDelete = (id: number) => {
        deleteEselon(id)
    };

    const handleEditItem = (item: elesonItem) => {
        form.reset({
            id: item.id,
            kode: item.kode,
            nama_eselon: item.nama_eselon,
            status: item.status,
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

    const handleSubmitEselon = (values: eselonFormvalue) => {
        if (isEditMode && editingItemId) {
            putEselon(values)
        } else {
            postEselon(values);
        }
    }

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
            <Title title="Daftar Eselon"/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitEselon)}>
                    <CustomCard
                        actions={
                            <div className="flex justify-end">
                                <div className="flex gap-4">
                                    <Button type="button" onClick={() => {
                                        if (!isEditMode) {

                                            form.reset({
                                                id: 0,
                                                kode: "",
                                                nama_eselon: "",
                                                status: false,
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
                                    <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
                                    <TableHead className="text-center text-xs sm:text-sm">Nama Eleson</TableHead>
                                    <TableHead className="text-center text-xs sm:text-sm">Aktif</TableHead>
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
                                                name="nama_eselon"
                                                required={false}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <FormFieldInput
                                                inputStyle="w-full"
                                                position={true}
                                                type="checkbox"
                                                form={form}
                                                name="status"
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
                                        <TableCell className="text-center text-xs sm:text-sm">{item.kode}</TableCell>
                                        <TableCell className="text-center text-xs sm:text-sm">{item.nama_eselon}</TableCell>
                                        <TableCell
                                            className="flex text-center justify-center items-center w-full h-full">{item.status ? (
                                            <FaCheck className="text-green-500 w-4 h-4 mt-2"/>
                                        ) : (
                                            <IoClose className="text-red-500 w-5 h-5 mt-2"/>
                                        )}</TableCell>
                                        <TableCell className="text-center">
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

export default Eleson;

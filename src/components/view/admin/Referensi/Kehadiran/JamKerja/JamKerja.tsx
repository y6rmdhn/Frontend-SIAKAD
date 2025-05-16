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
import {z} from "zod";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import adminServices from "@/services/admin.services.ts";
import {FaCheck} from "react-icons/fa6";
import {IoClose, IoSaveOutline} from "react-icons/io5";
import {zodResolver} from "@hookform/resolvers/zod";
import {IJamKerja} from "@/types/create.referensi.ts";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import {toast} from "sonner";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput.tsx";
import {RiResetLeftFill} from "react-icons/ri";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import CustomPagination from "@/components/blocks/CustomPagination";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import {ConfirmDialog} from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";

interface jamKerjaItem {
    id: number;
    jenis_jam_kerja: string;
    jam_normal: boolean;
    jam_datang: string;
    jam_pulang: string
    // Add other properties as needed
}

// Define interface for the API response
interface jamKerjaResponse {
    data: jamKerjaItem[];
    links: any[]; // You might want to define a more specific type
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page: number;
}

const jamKerjaSchema = z.object({
    id: z.number().optional(),
    jenis_jam_kerja: z.string().min(1, "Jenis jam kerja tidak boleh kosong"),
    jam_normal: z.boolean(),
    jam_datang: z.string().min(1, "jam datang tidak boleh kosong"),
    jam_pulang: z.string().min(1, "jam pulang tidak boleh kosong"),
});

type jamKerjaFormvalue = z.infer<typeof jamKerjaSchema>;

const JamKerja = () => {

    const [searchParam, setSearchParam] = useSearchParams();
    const queryClient = useQueryClient();
    const [isAddData, setIsAddData] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParam.get("page") || 1));

    const form = useForm({
        defaultValues: {
            jenis_jam_kerja: "",
            jam_normal: false,
            jam_datang: "",
            jam_pulang: "",
        },
        resolver: zodResolver(jamKerjaSchema)
    });

    // get data
    const {data} = useQuery<jamKerjaResponse>({
        queryKey: ["jam-kerja", searchParam.get("page")],
        queryFn: async () => {
            const response = await adminServices.getJamKerjaReferensi(
                searchParam.get("page")
            );

            return response.data.data;
        },
    });

    // tambah data
    const {mutate: postTambahData} = useMutation({
        mutationFn: (data: IJamKerja) => potsReferensiServices.jamKerja(data),
        onSuccess: () => {
            form.reset();
            toast.success("Berhasil menambahkan data");
            setIsAddData(false);
            queryClient.invalidateQueries({queryKey: ["jam-kerja"]});
        }
    })

    // edit data
    const {mutate: putJamKerja} = useMutation({
        mutationFn: (data: jamKerjaFormvalue) => putReferensiServices.jamKerja(data.id!, data),
        onSuccess: () => {
            toast.success("Data berhasil diedit");

            setIsEditMode(false);
            setIsAddData(false);
            setEditingItemId(null);

            form.reset();

            queryClient.invalidateQueries({queryKey: ["jam-kerja"]});
        }
    })

    // hapus data
    const {mutate: deleteJamKerja} = useMutation({
        mutationFn: (id: number) => deleteReferensiServices.deteleJamKerja(id),
        onSuccess: () => {
            toast.success("Data berhasil dihapus");
            queryClient.invalidateQueries({ queryKey: ["jam-kerja"] });

            if (editingItemId) {
                form.reset();
                setEditingItemId(null);
                setIsEditMode(false);
                setIsAddData(false);
            }
        }
    })

    const handleDelete = (id: number) => {
        deleteJamKerja(id)
    };

    const handleSubmitJamKerja = (values: jamKerjaFormvalue) => {
        if (isEditMode && editingItemId){
            putJamKerja(values)
        }else{
        postTambahData(values)
        }
    }

    const handleEditItem = (item: jamKerjaItem) => {
        form.reset({
            id: item.id,
            jenis_jam_kerja: item.jenis_jam_kerja,
            jam_normal: item.jam_normal,
            jam_datang: item.jam_datang,
            jam_pulang: item.jam_pulang,
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
            <h1 className="text-2xl font-normal">
                Jam Kerja{" "}
                <span className="text-muted-foreground font-normal text-[16px]">
          Daftar Jam Kerja
        </span>
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitJamKerja)}>
                    <CustomCard
                        actions={
                            <div className="flex justify-end">
                                <div className="flex gap-4">
                                    <Button type="button" onClick={() => {
                                        if (!isEditMode) {

                                            form.reset({
                                                id: 0,
                                                jenis_jam_kerja: "",
                                                jam_normal: false,
                                                jam_datang: "",
                                                jam_pulang: "",
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
                                    <TableHead className="text-center">Jenis Jam Kerja</TableHead>
                                    <TableHead className="text-center">Jam Normal</TableHead>
                                    <TableHead className="text-center">Jam Datang</TableHead>
                                    <TableHead className="text-center">Jam Pulang</TableHead>
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
                                                name="jenis_jam_kerja"
                                                required={false}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <FormFieldInput
                                                inputStyle="w-full"
                                                position={true}
                                                type="checkbox"
                                                form={form}
                                                name="jam_normal"
                                                required={false}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <FormFieldInput
                                                inputStyle="w-full"
                                                position={true}
                                                form={form}
                                                name="jam_datang"
                                                required={false}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <FormFieldInput
                                                inputStyle="w-full"
                                                position={true}
                                                form={form}
                                                name="jam_pulang"
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
                                        <TableCell className="text-center">{item.jenis_jam_kerja}</TableCell>
                                        <TableCell
                                            className="flex text-center justify-center items-center w-full h-full">{item.jam_normal ? (
                                            <FaCheck className="text-green-500 w-4 h-4 mt-2"/>
                                        ) : (
                                            <IoClose className="text-red-500 w-5 h-5 mt-2"/>
                                        )}</TableCell>
                                        <TableCell className="text-center">{item.jam_datang}</TableCell>
                                        <TableCell className="text-center">{item.jam_pulang}</TableCell>
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

export default JamKerja;

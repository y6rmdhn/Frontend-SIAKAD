import CustomCard from "@/components/blocks/Card";
import InfoList from "@/components/blocks/InfoList";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
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
import unitKerjaOptions from "@/constant/dummyFilter";
import {FaPlus} from "react-icons/fa";
import {IoEyeOutline} from "react-icons/io5";
import {Link, useSearchParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import dosenServices from "@/services/dosen.services.ts";
import {parseISO, format} from "date-fns";
import CustomPagination from "@/components/blocks/CustomPagination";

const Pangkat = () => {

    const [searchParam, setSearchParam] = useSearchParams();
    const queryClient = useQueryClient();
    const [isAddData, setIsAddData] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(
        Number(searchParam.get("page") || 1)
    );

    // get data
    const {data} = useQuery({
        queryKey: ["anak", searchParam.get("page")],
        queryFn: async () => {
            const response = await dosenServices.getPangkat(searchParam.get("page"));
            console.log(response.data)
            return response.data;
        },
    });


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
            <Title title="Pangkat" subTitle="Daftar Pangkat"/>
            <CustomCard
                actions={
                    <div className="flex justify-end ">
                        <Link to="/data-riwayat/kepegawaian/detail-pangkat">
                            <Button className="bg-yellow-uika hover:bg-hover-yellow-uika text-xs md:text-sm">
                                <FaPlus className="w-3! h-3! md:w-4! h-4!"/> Tambah Baru
                            </Button>
                        </Link>
                    </div>
                }
            />

            <InfoList
                items={[
                    { label: "NIP", value: data?.pegawai_info.nip },
                    { label: "Nama", value: data?.pegawai_info.nama },
                    { label: "Unit Kerja", value: data?.pegawai_info.unit_kerja },
                    { label: "Status", value: data?.pegawai_info.status },
                    { label: "Jab. Akademik", value: data?.pegawai_info.jab_akademik },
                    { label: "Jab. Fungsional", value: data?.pegawai_info.jab_fungsional },
                    { label: "Jab. Struktural", value: data?.pegawai_info.jab_struktural },
                    { label: "Pendidikan", value: data?.pegawai_info.pendidikan },
                ]}
            />

            <div className="lg:gap-5 gap-2 flex flex-col md:flex-row mt-5">
                <SelectFilter classname="md:w-32" options={unitKerjaOptions}/>
                <SearchInput/>
            </div>

            <Table className="mt-10 table-auto text-xs md:text-base">
                <TableHeader>
                    <TableRow className="bg-gray-300 ">
                        <TableHead className="text-center text-black">
                            TMT Pangkas
                        </TableHead>
                        <TableHead className="text-center text-black">Jenis SK</TableHead>
                        <TableHead className="text-center text-black">
                            Nama Pangkat
                        </TableHead>
                        <TableHead className="text-center text-black">Masa Kerja</TableHead>
                        <TableHead className="text-center text-black">
                            Status Pengajuan
                        </TableHead>
                        <TableHead className="text-center text-black">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    {data?.data.data.map((item) => (
                        <TableRow className=" even:bg-gray-100">
                            <TableCell
                                className="text-center">{item.tmt_pangkat ? format(parseISO(item.tmt_pangkat), "dd MMMM yyyy")
                                : "-"}
                            </TableCell>
                            <TableCell className="text-center">{item.jenis_sk}</TableCell>
                            <TableCell className="text-center">{item.nama_golongan}</TableCell>
                            <TableCell className="text-center">{item.masa_kerja}</TableCell>
                            <TableCell className="text-center">
                                <Button
                                    size="sm"
                                    className={`w-full text-xs lg:text-sm text-black
    ${
                                        item.status_pengajuan === "draf"
                                            ? "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65"
                                            : item.status_pengajuan === "diajukan"
                                                ? "bg-[#FFC951]/50 hover:bg-[#FFC951]/50"
                                                : item.status_pengajuan === "disetujui"
                                                    ? "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50"
                                                    : item.status_pengajuan === "ditolak"
                                                        ? "bg-red-500 hover:bg-red-500"
                                                        : "bg-slate-300 hover:bg-slate-300"
                                    }
  `}
                                >
                                    {item.status_pengajuan}
                                </Button>
                            </TableCell>
                            <TableCell className="h-full">
                                <div className="flex justify-center items-center w-full h-full">
                                    <Link to={"/data-riwayat/kepegawaian/detail-data-pangkat/" + item.id }>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="cursor-pointer"
                                        >
                                            <IoEyeOutline className="w-5! h-5! text-[#26A1F4]"/>
                                        </Button>
                                    </Link>
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
        </div>
    );
};

export default Pangkat;

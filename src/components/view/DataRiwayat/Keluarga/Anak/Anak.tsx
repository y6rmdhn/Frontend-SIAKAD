import {Link, useSearchParams} from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {FaPlus} from "react-icons/fa";
import {HiMiniTrash} from "react-icons/hi2";
import {IoEyeOutline} from "react-icons/io5";
import InfoList from "@/components/blocks/InfoList";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import {useQuery} from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import {useEffect} from "react";
import CustomPagination from "@/components/blocks/CustomPagination";


const Anak = () => {

    const [searchParam, setSearchParam] = useSearchParams();

    // get data
    const {data} = useQuery({
        queryKey: ["anak-dosen", searchParam.get("page")],
        queryFn: async () => {
            const response = await dosenServices.getDataAnak(searchParam.get("page"));
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
            <Title title="Anak" subTitle="Daftar Anak"/>
            <CustomCard
                actions={
                    <div className="h-0 flex justify-end">
                        <Link to="/data-riwayat/keluarga/detail-anak">
                            <Button className="bg-yellow-uika text-xs md:text-auto hover:bg-hover-yellow-uika">
                                <FaPlus/> Tambah Baru
                            </Button>
                        </Link>
                    </div>
                }
            />

            <InfoList
                items={[
                    {label: "NIP", value: data?.pegawai_info.nip},
                    {label: "Nama", value: data?.pegawai_info.nama},
                    {label: "Unit Kerja", value: data?.pegawai_info.unit_kerja},
                    {label: "Status", value: data?.pegawai_info.status},
                    {label: "Jab. Akademik", value: data?.pegawai_info.jab_akademik},
                    {label: "Jab. Fungsional", value: data?.pegawai_info.jab_fungsional},
                    {label: "Jab. Struktural", value: data?.pegawai_info.jab_struktural},
                    {label: "Pendidikan", value: data?.pegawai_info.pendidikan},
                ]}
            />

            <CustomCard
                actions={
                    <div className="flex flex-col md:flex-row gap-4">
                        <Label className="text-[#FDA31A] md:pr-20">Status Pengajuan</Label>
                        <SelectFilter
                            classname="w-full md:w-64"
                            placeholder="--Semua Pengajuan--"
                            options={[
                                {label: "Admin", value: "admin"},
                                {label: "User", value: "user"},
                                {label: "Guest", value: "guest"},
                            ]}
                        />
                    </div>
                }
            />

            <div className="md:gap-5 gap-2 flex mt-5 flex-col sm:flex-row ">
                <SelectFilter
                    placeholder="--Semua--"
                    classname="w-full sm:w-32"
                    options={[
                        {label: "Admin", value: "admin"},
                        {label: "User", value: "user"},
                        {label: "Guest", value: "guest"},
                    ]}
                />

                <SearchInput/>
            </div>

            <Table className="mt-10 table-auto text-xs lg:text-sm">
                <TableHeader>
                    <TableRow className="bg-[#002E5A] ">
                        {data?.table_columns.map((item) => (
                            <TableHead className="text-center text-white border">
                                {item.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    {data?.data.data.map((item) => (
                        <TableRow className=" even:bg-gray-100">
                            <TableCell className="text-center">{item.nama}</TableCell>
                            <TableCell className="text-center">{item.jenis_kelamin}</TableCell>
                            <TableCell className="text-center">{item.anak_ke}</TableCell>
                            <TableCell className="text-center">{item.umur}</TableCell>
                            <TableCell className="text-center">{item.tempat_lahir}</TableCell>
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
                                    <Link to={"/data-riwayat/keluarga/detail-data-anak/" + item.id}>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="cursor-pointer"
                                        >
                                            <IoEyeOutline className="w-5! h-5! text-[#26A1F4]"/>
                                        </Button>
                                    </Link>
                                    <Link to="">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="cursor-pointer"
                                        >
                                            <HiMiniTrash className="w-5! h-5! text-[#FDA31A]"/>
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

export default Anak;

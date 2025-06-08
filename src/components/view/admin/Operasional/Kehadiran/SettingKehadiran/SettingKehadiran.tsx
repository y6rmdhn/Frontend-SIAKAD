import CustomCard from "@/components/blocks/Card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {HiMiniXMark} from "react-icons/hi2";
import {MdEdit} from "react-icons/md";
import {FaCheck} from "react-icons/fa6";
import dataConstant from "../../../../../../constant/settingKehadiran/index";
import {useQuery} from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

interface StatusItemProps {
    label: string;
    status: string;
}

const StatusItem = ({label, status}: StatusItemProps) => {
    const isCheck = status === "check";

    return (
        <div className="flex justify-between items-center bg-white p-2 rounded-md shadow">
            <Label className="text-xs sm:text-sm">{label}</Label>
            <div
                className={`${
                    isCheck ? "bg-green-100" : "bg-red-100"
                } rounded-md px-2 py-1`}
            >
                {isCheck ? (
                    <FaCheck className="w-4 h-4 text-green-500"/>
                ) : (
                    <HiMiniXMark className="w-4 h-4 text-[#FF0000]"/>
                )}
            </div>
        </div>
    );
};

const SettingKehadiran = () => {

    const [searchParam, setSearchParam] = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParam.get("page") || 1));

    // get data
    const {data} = useQuery({
        queryKey: ["setting-kehadiran", searchParam.get("page")],
        queryFn: async () => {
            const response = await adminServices.getSettingKehadiran(
                searchParam.get("page")
            );

            return response.data.data;
        },
    });

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
        <div className="mt-10 mb-10">
            <h1 className="text-2xl sm:text-sm font-normal">Setting Kehadiran</h1>
            <CustomCard
                actions={
                    <div className="w-full flex justify-end">
                        <Button className="bg-green-light-uika cursor-pointer hover:bg-[#329C59]">
                            <MdEdit/> Edit
                        </Button>
                    </div>
                }
            >
                <div className="sm:flex gap-2 w-full">
                    <div className="flex flex-col w-full gap-2">
                        {dataConstant.leftColumnItems.map((item, index) => (
                            <StatusItem key={index} label={item.label} status={item.status}/>
                        ))}
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        {dataConstant.rightColumnItems.map((item, index) => (
                            <StatusItem key={index} label={item.label} status={item.status}/>
                        ))}
                    </div>
                </div>
            </CustomCard>

            <Table className="mt-10 table-auto">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="text-center text-xs sm:text-sm">Nama Gedung</TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Latitude</TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Langtitude</TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">
                            Radius Presensi(Meter)
                        </TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    <TableRow className=" even:bg-gray-100">
                        <TableCell className="text-center text-xs sm:text-sm">{data?.nama_gedung}</TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">{data?.coordinates.latitude}</TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">{data?.coordinates.longitude}</TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">{data?.radius}</TableCell>
                        <TableCell className="h-full">
                            <div className="flex justify-center items-center w-full h-full">
                                <Button size="icon" variant="ghost" className="cursor-pointer">
                                    <MdEdit className="w-5! h-5! text-[#26A1F4]"/>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default SettingKehadiran;

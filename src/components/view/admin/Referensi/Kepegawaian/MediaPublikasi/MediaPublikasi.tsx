import CustomCard from "@/components/blocks/Card";
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
import {IoMdDownload} from "react-icons/io";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import {toast} from "sonner";
import CustomPagination from "@/components/blocks/CustomPagination";

const MediaPubikasi = () => {


    const [searchParam, setSearchParam] = useSearchParams();
    const [isEditMode, ] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParam.get("page") || 1));

    // get data
    const {data} = useQuery({
        queryKey: ["media-publikasi", searchParam.get("page")],
        queryFn: async () => {
            const response = await adminServices.getMediaPublikasi(
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
        <div className="mt-10 mb-20">
            <Title title="Media Publikasi" subTitle="Daftar Media Publikasi"/>
            <CustomCard
                actions={
                    <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
                        <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
                            <SelectFilter options={unitKerjaOptions}/>
                            <SearchInput className="w-full"/>
                        </div>

                        <div className="w-full flex gap-3 justify-end">
                            <Button
                                className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-35 lg:w-auto text-xs sm:text-sm">
                                <IoMdDownload/> Unduh dari Sister
                            </Button>
                        </div>
                    </div>
                }
            >
                <Table className="mt-10 table-auto">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="text-center text-xs sm:text-sm">Nama</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200">
                        {data?.data.map((item: any) => (
                            <TableRow className=" even:bg-gray-100">
                                <TableCell className="text-start text-xs sm:text-sm">{item.nama}</TableCell>
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
        </div>
    );
};

export default MediaPubikasi;

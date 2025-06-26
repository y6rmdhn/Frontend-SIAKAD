import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import unitKerjaOptions from "@/constant/dummyFilter";
import { FaPlus } from "react-icons/fa6";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import RumpunBidangIlmuRow from "@/components/blocks/RumpunBidangIlmuRow/RumpunBidangIlmuRow";
import adminServices from "@/services/admin.services";

// Interface untuk data mentah dari API
interface RumpunItem {
  id: number;
  kode: string;
  nama_bidang: string;
  parent_category: string;
  sub_parent_category: string;
  [key: string]: any;
}

// Interface untuk node yang sudah diproses menjadi pohon
export interface RumpunNode {
  id: number;
  kode: string;
  nama_bidang: string;
  parent_category: string;
  children: RumpunNode[];
}

interface RumpunApiResponse {
  success: boolean;
  data: {
    data: RumpunItem[];
    current_page: number;
    last_page: number;
  };
}

// Fungsi untuk membangun struktur pohon dari data flat
function buildTree(items: RumpunItem[]): RumpunNode[] {
  const nodeMap: { [key: string]: RumpunNode } = {};
  const roots: RumpunNode[] = [];

  items.forEach((item) => {
    nodeMap[item.nama_bidang] = {
      id: item.id,
      kode: item.kode,
      nama_bidang: item.nama_bidang,
      parent_category: item.parent_category,
      children: [],
    };
  });

  items.forEach((item) => {
    if (item.parent_category && nodeMap[item.parent_category]) {
      const parentNode = nodeMap[item.parent_category];
      const childNode = nodeMap[item.nama_bidang];
      if (parentNode && childNode) {
        parentNode.children.push(childNode);
      }
    } else {
      const rootNode = nodeMap[item.nama_bidang];
      if (rootNode) {
        roots.push(rootNode);
      }
    }
  });

  return roots;
}

const RumpunBidangIlmu = () => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<RumpunApiResponse>({
      queryKey: ["rumpun-bidang-ilmu-all"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await adminServices.getRumpunBidangIlmu(pageParam);
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.data.current_page;
        const totalPages = lastPage.data.last_page;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  const allRumpunData = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.data) ?? [];
  }, [data]);

  const treeData = useMemo(() => {
    return allRumpunData.length > 0 ? buildTree(allRumpunData) : [];
  }, [allRumpunData]);

  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const toggleRow = (kode: string) => {
    setOpenRows((prev) => ({ ...prev, [kode]: !prev[kode] }));
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Rumpun Bidang Ilmu" subTitle="Daftar Rumpun Bidang Ilmu" />
      <CustomCard
        actions={
          <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
            <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
              <SelectFilter options={unitKerjaOptions} classname="lg:w-32" />
              <SearchInput className="w-full lg:w-80" />
            </div>
            <div className="w-full flex gap-3 justify-end">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika w-full md:w-auto text-xs sm:text-sm">
                <FaPlus /> Tambah
              </Button>
            </div>
          </div>
        }
      >
        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-left text-xs sm:text-sm w-20"></TableHead>
              <TableHead className="text-left text-xs sm:text-sm w-1/4">
                Kode
              </TableHead>
              <TableHead className="text-left text-xs sm:text-sm w-1/3">
                Nama Bidang
              </TableHead>
              <TableHead className="text-left text-xs sm:text-sm w-1/4">
                Parent Bidang
              </TableHead>
              <TableHead className="text-center text-xs sm:text-sm">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {isFetching && allRumpunData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : (
              treeData.map((node) => (
                <RumpunBidangIlmuRow
                  key={node.kode}
                  node={node}
                  level={0}
                  openRows={openRows}
                  toggleRow={toggleRow}
                />
              ))
            )}
          </TableBody>
        </Table>
      </CustomCard>
    </div>
  );
};

export default RumpunBidangIlmu;

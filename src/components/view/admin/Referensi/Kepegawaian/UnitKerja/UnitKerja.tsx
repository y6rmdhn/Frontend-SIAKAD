import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";

import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import adminServices from "@/services/admin.services";
import unitKerjaOptions from "@/constant/dummyFilter";
import UnitKerjaRow from "@/components/blocks/unitKerjaRow/UnitKerjaRow";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import { toast } from "sonner";

interface UnitKerjaItem {
  id: number;
  kode_unit: string;
  nama_unit: string;
  parent_unit_id: string | null;
  [key: string]: any;
}

interface UnitNode extends UnitKerjaItem {
  children: UnitNode[];
}

interface UnitKerjaResponse {
  data: UnitKerjaItem[];
  current_page: number;
  last_page: number;
}

interface UnitKerjaApiResponse {
  success: boolean;
  data: UnitKerjaResponse;
}

function buildTree(units: UnitKerjaItem[]): UnitNode[] {
  const unitMap: { [key: string]: UnitNode } = {};
  const roots: UnitNode[] = [];

  units.forEach((unit) => {
    unitMap[unit.kode_unit] = { ...unit, children: [] };
  });

  units.forEach((unit) => {
    const node = unitMap[unit.kode_unit];
    if (unit.parent_unit_id && unitMap[unit.parent_unit_id]) {
      unitMap[unit.parent_unit_id].children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

const UnitKerja = () => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});
  const queryClient = useQueryClient();

  // get data
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<UnitKerjaApiResponse>({
      queryKey: ["unit-kerja-all"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await adminServices.getUnitKerja(pageParam);
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.data.current_page;
        const totalPages = lastPage.data.last_page;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  // delete data
  const { mutate: deleteData } = useMutation({
    mutationFn: (id: number) => deleteReferensiServices.deteleUnitKerja(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["unit-kerja-all"] });
    },
  });

  const handleDelete = (id: nnumber) => {
    deleteData(id);
  };

  const allUnitKerja = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.data) ?? [];
  }, [data]);

  const treeData = allUnitKerja.length > 0 ? buildTree(allUnitKerja) : [];

  const toggleRow = (kode_unit: string) => {
    setOpenRows((prev) => ({ ...prev, [kode_unit]: !prev[kode_unit] }));
  };

  const createRefCallback =
    (kode_unit: string) => (el: HTMLTableRowElement | null) => {
      rowRefs.current[kode_unit] = el;
    };

  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Unit Kerja" subTitle="Daftar Unit Kerja" />
      <CustomCard
        actions={
          <div className="w-full md:w-auto flex flex-col md:flex-row justify-between mt-6 gap-4">
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 lg:flex lg:w-full">
              <div className="w-full md:w-32">
                <SelectFilter
                  classname="w-full md:w-32 text-xs sm:text-sm"
                  options={unitKerjaOptions}
                />
              </div>
              <div className="w-full relative md:w-80">
                <SearchInput className="w-full md:w-80" />
              </div>
            </div>
            <div className="w-full flex flex-col md:w-auto lg:flex-row gap-4 lg:mt-0 lg:w-auto">
              <div className="w-full md:w-auto">
                <Link to="/admin/referensi/kepegawaian/unit-kerja/detail-unit-kerja">
                  <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika w-full md:w-auto text-xs sm:text-sm">
                    <FaPlus /> Tambah
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        }
      >
        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="w-24"></TableHead>
              <TableHead className="text-center text-xs sm:text-sm">
                Kode
              </TableHead>
              <TableHead className="text-center text-xs sm:text-sm">
                Unit Kerja
              </TableHead>
              <TableHead className="text-center text-xs sm:text-sm">
                Parent Unit Kerja
              </TableHead>
              <TableHead className="text-center text-xs sm:text-sm">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {treeData.map((node) => (
              <UnitKerjaRow
                key={node.kode_unit}
                node={node}
                level={0}
                openRows={openRows}
                toggleRow={toggleRow}
                handleDelete={handleDelete}
                createRefCallback={createRefCallback}
              />
            ))}
          </TableBody>
        </Table>
      </CustomCard>
    </div>
  );
};

export default UnitKerja;

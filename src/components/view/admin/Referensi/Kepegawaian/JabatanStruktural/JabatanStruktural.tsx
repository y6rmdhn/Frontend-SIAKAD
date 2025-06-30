import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import unitKerjaOptions from "@/constant/dummyFilter";
import { Link, useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import { useEffect, useMemo, useRef, useState } from "react";
import JabatanStrukturalRow from "@/components/blocks/JabatanStrukturalRow/JabatanStrukturalRow";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
// Rename the row component to be more specific to its new purpose

// Interface for the raw data item from the API
interface JabatanStrukturalItem {
  id: number;
  kode: string;
  parent_jabatan: string | null;
  jenis_jabatan_struktural: {
    jenis_jabatan_struktural: string;
  };
  unit_kerja: {
    nama_unit: string;
  };
  // You can add other properties from the API if needed
  [key: string]: any;
}

// This is the clean, flattened node structure we'll use for rendering
// It's what the JabatanStrukturalRow component will expect
export interface JabatanStrukturalNode {
  id: number;
  kode: string;
  nama_jabatan: string;
  parent_jabatan_nama: string | null;
  unit_kerja_nama: string;
  children: JabatanStrukturalNode[];
}

interface JabatanStrukturalResponse {
  data: JabatanStrukturalItem[];
  current_page: number;
  last_page: number;
}

interface JabatanStrukturalApiResponse {
  success: boolean;
  data: JabatanStrukturalResponse;
}

// The core logic to transform API data and build the tree structure
function buildTree(items: JabatanStrukturalItem[]): JabatanStrukturalNode[] {
  const itemMap: { [key: string]: JabatanStrukturalNode } = {};
  const roots: JabatanStrukturalNode[] = [];

  // First pass: Create a map of all items and their names for easy lookup
  const nameMap: { [key: string]: string } = {};
  items.forEach((item) => {
    nameMap[item.kode] = item.jenis_jabatan_struktural.jenis_jabatan_struktural;
  });

  // Second pass: Create the nodes with all necessary data flattened
  items.forEach((item) => {
    itemMap[item.kode] = {
      id: item.id,
      kode: item.kode,
      nama_jabatan: item.jenis_jabatan_struktural.jenis_jabatan_struktural,
      // Look up the parent's name using the map we created
      parent_jabatan_nama: item.parent_jabatan
        ? nameMap[item.parent_jabatan] || item.parent_jabatan
        : "-",
      unit_kerja_nama: item.unit_kerja.nama_unit,
      children: [],
    };
  });

  // Third pass: Structure the items into a tree
  items.forEach((item) => {
    const node = itemMap[item.kode];
    if (item.parent_jabatan && itemMap[item.parent_jabatan]) {
      itemMap[item.parent_jabatan].children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

const JabatanStruktural = () => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const queryClient = useQueryClient();

  // --- React Query and other state management remains the same ---
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<JabatanStrukturalApiResponse>({
      queryKey: ["jabatan-struktural-all", searchParam.get("search")],
      queryFn: async ({ pageParam = 1 }) => {
        const search = searchParam.get("search") || "";
        const response = await adminServices.getJabatanStrukturalReferensi(
          pageParam,
          search
        );
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.data.current_page;
        const totalPages = lastPage.data.last_page;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  const allJabatanStruktural = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.data) ?? [];
  }, [data]);

  const treeData = useMemo(() => {
    return allJabatanStruktural.length > 0
      ? buildTree(allJabatanStruktural)
      : [];
  }, [allJabatanStruktural]);

  const toggleRow = (kode: string) => {
    setOpenRows((prev) => ({ ...prev, [kode]: !prev[kode] }));
  };

  const createRefCallback =
    (kode: string) => (el: HTMLTableRowElement | null) => {
      rowRefs.current[kode] = el;
    };

  const { mutate: deleteData } = useMutation({
    mutationFn: (id: number) =>
      deleteReferensiServices.deleteJabatanStruktural(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["jabatan-struktural-all"] });
    },
  });

  const handleDelete = (id: number) => {
    deleteData(id);
  };

  useEffect(() => {
    const newSearchParam = new URLSearchParams(searchParam);

    if (debouncedInput.length > 3) {
      newSearchParam.set("search", debouncedInput);
      newSearchParam.set("page", "1");
    } else {
      newSearchParam.delete("search");
    }

    if (searchParam.toString() !== newSearchParam.toString()) {
      setSearchParam(newSearchParam);
    }
  }, [debouncedInput, searchParam, setSearchParam]);

  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Struktural" subTitle="Daftar Jabatan Struktural" />
      {/* --- Filtering and Action buttons remain the same --- */}
      <CustomCard
        actions={
          <div className="w-full flex flex-col sm:flex-row gap-3">
            <Label className="w-32 sm:w-45 md:w-60 text-[#FDA31A]">
              Jabatan Struktural
            </Label>
            <SelectFilter
              classname="w-58 md:w-80 lg:w-92"
              options={unitKerjaOptions}
            />
          </div>
        }
      />
      <div className="w-full md:w-auto flex flex-col md:flex-row justify-between mt-6 gap-4">
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 lg:flex lg:w-full">
          <div className="w-full  md:w-32">
            <SelectFilter
              classname="w-full md:w-32 text-xs sm:text-sm"
              options={unitKerjaOptions}
            />
          </div>
          <div className="w-full relative md:w-80">
            <SearchInput
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:w-auto lg:flex-row gap-4 lg:mt-0 lg:w-auto">
          <div className="w-full md:w-auto">
            <Link to="/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika w-full md:w-auto text-xs sm:text-sm">
                <FaPlus /> Tambah
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* --- Table --- */}
      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Kode
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Nama Jabatan Struktural
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Parent Jabatan Struktural
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Unit Kerja
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {treeData.map((node) => (
            <JabatanStrukturalRow
              key={node.kode}
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
    </div>
  );
};

export default JabatanStruktural;

import adminServices from "@/services/admin.services";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UnitKerja {
  id: number;
  nama_unit: string;
  parent_unit_id: string | null;
  // ... properti lainnya
}

interface UnitKerjaPage {
  current_page: number;
  data: UnitKerja[];
  last_page: number;
  // ... properti paginasi lainnya
}

interface UnitKerjaResponse {
  success: boolean;
  data: UnitKerjaPage;
}

export const useAllUnitKerja = () => {
  return useInfiniteQuery<UnitKerjaResponse>({
    queryKey: ["unit-kerja", "all"],

    queryFn: async ({ pageParam }) => {
      const response = await adminServices.getUnitKerja(pageParam);
      return response.data;
    },

    getNextPageParam: (lastPage, allPages) => {
      const currentPage = lastPage.data.current_page;
      const totalPages = lastPage.data.last_page;

      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      return undefined;
    },

    initialPageParam: 1,
  });
};

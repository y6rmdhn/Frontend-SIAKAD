// hooks/useWilayahData.ts
import { useQuery } from "@tanstack/react-query";
import {
  wilayahServices,
  formatProvinces,
  formatRegencies,
  formatDistricts,
} from "@/services/wilayahService";

export const useWilayahData = (
  selectedProvinceId: string,
  selectedRegencyId: string
) => {
  // Query untuk provinces
  const {
    data: provincesData,
    isLoading: isProvincesLoading,
    error: provincesError,
  } = useQuery({
    queryKey: ["provinces"],
    queryFn: async () => {
      try {
        const response = await wilayahServices.getProvinces();
        return formatProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Query untuk regencies (tergantung province yang dipilih)
  const {
    data: regenciesData,
    isLoading: isRegenciesLoading,
    error: regenciesError,
  } = useQuery({
    queryKey: ["regencies", selectedProvinceId],
    queryFn: async () => {
      if (!selectedProvinceId) return [];

      try {
        const response = await wilayahServices.getRegencies(selectedProvinceId);
        return formatRegencies(response.data);
      } catch (error) {
        console.error("Error fetching regencies:", error);
        return [];
      }
    },
    enabled: !!selectedProvinceId, // Hanya fetch jika province dipilih
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Query untuk districts (tergantung regency yang dipilih)
  const {
    data: districtsData,
    isLoading: isDistrictsLoading,
    error: districtsError,
  } = useQuery({
    queryKey: ["districts", selectedRegencyId],
    queryFn: async () => {
      if (!selectedRegencyId) return [];

      try {
        const response = await wilayahServices.getDistricts(selectedRegencyId);
        return formatDistricts(response.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
        return [];
      }
    },
    enabled: !!selectedRegencyId, // Hanya fetch jika regency dipilih
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    provinces: provincesData || [],
    regencies: regenciesData || [],
    districts: districtsData || [],
    isProvincesLoading,
    isRegenciesLoading,
    isDistrictsLoading,
    provincesError,
    regenciesError,
    districtsError,
  };
};

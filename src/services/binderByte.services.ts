import { wilayahApi } from "@/lib/axios/binderByteApiInstance.ts";

const wilayahIdServices = {
    getProvinsi: async () => {
        const response = await wilayahApi.get(`provinces.json`);
        return response.data;
    },

    getKota: async (provinceCode: string) => {
        if (!provinceCode) return []; // Kembalikan array kosong jika tidak ada kode
        const response = await wilayahApi.get(`regencies/${provinceCode}.json`);
        return response.data;
    },

    getKecamatan: async (kotaCode: string) => {
        if (!kotaCode) return []; // Kembalikan array kosong jika tidak ada kode
        const response = await wilayahApi.get(`districts/${kotaCode}.json`);
        return response.data;
    },
};

export default wilayahIdServices;
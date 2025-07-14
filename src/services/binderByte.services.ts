import { wilayahApi } from "@/lib/axios/binderByteApiInstance.ts";

const wilayahIdServices = {
    getProvinsi: async () => {
        const response = await wilayahApi.get(`provinces`);
        return response.data;
    },

    getKota: async (provinceCode: string) => {
        if (!provinceCode) return []; // Kembalikan array kosong jika tidak ada kode
        const response = await wilayahApi.get(`regencies/${provinceCode}`);
        return response.data;
    },

    getKecamatan: async (kotaCode: string) => {
        if (!kotaCode) return []; // Kembalikan array kosong jika tidak ada kode
        const response = await wilayahApi.get(`districts/${kotaCode}`);
        return response.data;
    },
};

export default wilayahIdServices;
import { wilayahApi } from "@/lib/axios/binderByteApiInstance.ts";

const wilayahIdServices = {
    getProvinsi: async () => {
        const response = await wilayahApi.get(`provinsi`);
        return response.data.value || [];
    },

    getKota: async (provinceCode: string) => {
        if (!provinceCode) return []; // Kembalikan array kosong jika tidak ada kode
        const response = await wilayahApi.get('kabupaten',{
            params:{
                id_provinsi: provinceCode
            }
        });
        return response.data.value || [];
    },

    getKecamatan: async (kotaCode: string) => {
        if (!kotaCode) return []; // Kembalikan array kosong jika tidak ada kode
        const response = await wilayahApi.get('kecamatan'{
            params:{
                id_kabupaten: kotaCode
            }
        });
        return response.data.value || [];
    },
};

export default wilayahIdServices;
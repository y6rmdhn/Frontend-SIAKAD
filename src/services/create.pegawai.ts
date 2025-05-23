import axiosInstance from "@/lib/axios/axiosInstance.ts";
import endpoint from "@/services/endpoint.constant.ts";

const postPegawaiServices = {
  dataPegawai: (payload: FormData) =>
    axiosInstance.post(`${endpoint.ADMIN}/pegawai`, payload),
};

export default postPegawaiServices;

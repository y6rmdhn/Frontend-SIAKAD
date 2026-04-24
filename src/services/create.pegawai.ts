import axiosInstance from "@/lib/axios/axiosInstance.ts";
import endpoint from "@/services/endpoint.constant.ts";

const postPegawaiServices = {
  dataPegawai: (payload: FormData) =>
    axiosInstance.post(`${endpoint.PEGAWAI}/`, payload),
};

export default postPegawaiServices;

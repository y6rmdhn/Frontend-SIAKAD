import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "./endpoint.constant";

const captchaServices = {
  generateCaptcha: () => axiosInstance.get(`${endpoint.AUTH}/captcha`),
};

export default captchaServices;

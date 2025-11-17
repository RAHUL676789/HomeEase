import axiosInstance from "../../utils/axios/axiosinstance";

export const loginApi = (payload) => {
  return axiosInstance.post("/api/auth/login", payload);
};

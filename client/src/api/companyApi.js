import axiosClient from "./axiosClient";

const companyApi = {
  getAll: (params) => {
    const url = `/v1/companies`;
    return axiosClient.get(url, { params });
  },
  getOne: (id) => {
    const url = `/v1/companies/${id}`;
    return axiosClient.get(url);
  },
};

export default companyApi;

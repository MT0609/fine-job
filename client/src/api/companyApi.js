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
  follow: (companyID) => {
    const url = `/v1/companies/${companyID}/follow`;
    return axiosClient.post(url);
  },
  unFollow: (companyID) => {
    const url = `/v1/companies/${companyID}/unFollow`;
    return axiosClient.post(url);
  },
};

export default companyApi;

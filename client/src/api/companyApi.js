import axiosClient from "./axiosClient";

const companyApi = {
  getAll: (params) => {
    const url = `/v1/companies/search?q=${params.q}&limit=${params.limit}&page=${params.page}`;
    return axiosClient.post(url, { params });
  },
  getOne: (id) => {
    const url = `/v1/companies/${id}`;
    return axiosClient.get(url);
  },
  updateOne: (id, body) => {
    const url = `/v1/companies/${id}`;
    return axiosClient.patch(url, body);
  },
  deleteOne: (id) => {
    const url = `/v1/companies/${id}`;
    return axiosClient.delete(url);
  },
  createOne: (body) => {
    const url = `/v1/companies`;
    return axiosClient.post(url, body);
  },
  getAllMyCompanies: () => {
    const url = "/v1/companies/mine";
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

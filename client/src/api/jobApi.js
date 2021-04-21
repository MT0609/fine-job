import axiosClient from "./axiosClient";

const jobApi = {
  getAll: (params) => {
    const url = "/v1/jobs";
    return axiosClient.get(url, { params });
  },
  getOne: (id) => {
    const url = `v1/jobs/${id}`;
    return axiosClient.get(url);
  },
};

export default jobApi;

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
  post: (data) => {
    const url = "/v1/jobs";
    return axiosClient.post(url, data);
  },
  update: (id, data) => {
    const url = `/v1/jobs/${id}`;
    return axiosClient.patch(url, data);
  },
  delete: (id) => {
    const url = `/v1/jobs/${id}`;
    return axiosClient.delete(url);
  },
  save: (id) => {
    const url = `/v1/jobs/${id}/save`;
    return axiosClient.post(url);
  },
  unSave: (id) => {
    const url = `/v1/jobs/${id}/unSave`;
    return axiosClient.post(url);
  },
};

export default jobApi;

import axiosClient from "./axiosClient";

const resumeApi = {
  getAll: () => {
    const url = "/v1/cvs";
    return axiosClient.get(url);
  },
  getOne: (cvId) => {
    const url = "/v1/cvs/?cvId=" + cvId;
    return axiosClient.get(url);
  },
  create: (reqBody) => {
    const url = "/v1/cvs";
    return axiosClient.post(url, reqBody);
  },
  update: (cvId, data) => {
    const url = "/v1/cvs/?cvId=" + cvId;
    return axiosClient.patch(url, data);
  },
};

export default resumeApi;

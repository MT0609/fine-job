import axiosClient from "./axiosClient";

const userApi = {
  getOne: (id) => {
    const url = `/v1/users/${id}`;
    return axiosClient.get(url);
  },
  update: (userID, data) => {
    const url = `/v1/users/${userID}`;
    return axiosClient.patch(url, data);
  },
};

export default userApi;

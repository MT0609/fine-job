import axiosClient from "./axiosClient";

const messageApi = {
  getOne: (userID_1, userID_2) => {
    const url = "/v1/messages";
    return axiosClient.get(url, {
      params: { userID_1, userID_2, limit: 10, page: 1 },
    });
  },
  send: (userID_1, userID_2, message) => {
    const url = "/v1/messages";
    return axiosClient.post(url, { userID_1, userID_2, message });
  },
  delete: (userID_1, userID_2, msgID) => {
    const url = "/v1/messages";
    return axiosClient.delete(url, { params: { userID_1, userID_2, msgID } });
  },
};

export default messageApi;

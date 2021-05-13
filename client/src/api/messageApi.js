import axiosClient from "./axiosClient";

const messageApi = {
  getAll: () => {
    const url = "/v1/messages";
    return axiosClient.get(url, { params: { limit: 10, page: 1 } });
  },
  getOne: (partnerID) => {
    const url = `/v1/messages/${partnerID}`;
    return axiosClient.get(url, { params: { partnerID } });
  },
  send: (partnerID, message) => {
    const url = `/v1/messages`;
    return axiosClient.post(url, { partnerID, message });
  },
  delete: (partnerID, msgID) => {
    const url = `/v1/messages/${partnerID}/${msgID}`;
    return axiosClient.delete(url, { params: { partnerID, msgID } });
  },
  deleteConversation: (partnerID) => {
    const url = `/v1/messages/${partnerID}`;
    return axiosClient.delete(url, { params: { partnerID } });
  },
};

export default messageApi;

import axiosClient from "./axiosClient";

const userApi = {
  getOne: (id) => {
    const url = `/v1/users/${id}`;
    return axiosClient.get(url);
  },
  search: (q, limit, page) => {
    const url = `/v1/users/search?q=${q}&limit=${limit}&page=${page}`;
    return axiosClient.post(url);
  },
  update: (userID, data) => {
    const url = `/v1/users/${userID}`;
    return axiosClient.patch(url, data);
  },
  modifyEducation: (userID, data) => {
    const url = `/v1/users/${userID}/modifyEducation`;
    return axiosClient.patch(url, data);
  },
  deleteEducation: (userID, idObject) => {
    const url = `/v1/users/${userID}/modifyEducation`;
    return axiosClient.delete(url, { data: idObject });
  },
  modifyAccomplishment: (userID, data) => {
    const url = `/v1/users/${userID}/modifyAccomplishment`;
    return axiosClient.patch(url, data);
  },
  deleteAccomplishment: (userID, idObject) => {
    const url = `/v1/users/${userID}/modifyAccomplishment`;
    return axiosClient.delete(url, { data: idObject });
  },
  getConnStatus: (userID) => {
    const url = `/v1/users/${userID}/getConnStatus`;
    return axiosClient.get(url);
  },
  sendConnReq: (receiverID, urlBody) => {
    const url = `/v1/users/${receiverID}/sendConnReq`;
    return axiosClient.post(url, urlBody);
  },
  acceptConnReq: (receiverID, notificationID) => {
    const url = `/v1/users/${receiverID}/acceptConnReq?notificationID=${notificationID}`;
    return axiosClient.post(url);
  },
  deleteConnReq: (receiverID, notificationID) => {
    const url = `/v1/users/${receiverID}/deleteConnReq?notificationID=${notificationID}`;
    return axiosClient.post(url);
  },
  deleteFriend: (receiverID) => {
    const url = `/v1/users/${receiverID}/deleteFriend`;
    return axiosClient.post(url);
  },
};

export default userApi;

import axiosClient from "./axiosClient";

const authApi = {
  signIn: (body) => {
    const url = "/v1/auth/login";
    return axiosClient.post(url, body);
  },
  signUp: (body) => {
    const url = "/v1/auth/register";
    return axiosClient.post(url, body);
  },
  getInfo: (id) => {
    const url = `/v1/users/${id}`;
    return axiosClient.get(url);
  },
  deleteSubscription: (userID) => {
    const url = `/v1/subscriptions/${userID}`;
    return axiosClient.delete(url);
  },
};

export default authApi;

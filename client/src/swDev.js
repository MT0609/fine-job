import axios from "axios";
import jwt_decode from "jwt-decode";

export default function swDev() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.log("response", response);

    return response.pushManager.getSubscription().then(function (subscription) {
      response.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY,
      });

      try {
        const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
        const userID = jwt_decode(token)?.sub;

        if (subscription && userID) {
          axios.post(`${process.env.REACT_APP_BASE_URL}/v1/subscriptions`, {
            userID,
            subscription,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}

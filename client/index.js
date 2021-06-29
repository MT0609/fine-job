import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./configs/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./configs/i18n";
import "./index.css";
import io from "socket.io-client";
import swDev from "./swDev";

// Socket
const socket = io.connect(process.env.REACT_APP_BASE_URL, {
  transports: ["websocket", "polling", "flashsocket"],
});

ReactDOM.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https:s//bit.ly/CRA-vitals
reportWebVitals();
swDev();

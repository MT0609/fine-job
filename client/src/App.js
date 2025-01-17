import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUserData } from "./actions/authActions";
import { renderRoutes, routes } from "./configs/routes";
import Header from "./components/header";
import MessageBubbleContainer from "./container/message/bubbleContainer";
import Loading from "./components/loading/circular";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import socket from "./configs/socket";
import swDev from "./swDev";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  try {
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    if (auth.isAuth) {
      // swDev();

      const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
      const userId = jwt_decode(token)?.sub;
      userId && socket?.emit("update-user-id", userId);
    }
  }, [auth.isAuth]);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Header />
          <main className="App__main">
            {renderRoutes(routes)}

            {auth.isAuth && (
              <div className="App__message">
                <MessageBubbleContainer />
              </div>
            )}

            <ToastContainer
              style={{ textAlign: "left" }}
              position="bottom-left"
              autoClose={2000}
              draggable={false}
              pauseOnHover={false}
              limit={4}
            />
          </main>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

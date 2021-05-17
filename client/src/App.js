import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getUserData } from "./actions/authActions";
import { renderRoutes, routes } from "./configs/routes";
import Header from "./components/header";
import MessageBubbleContainer from "./container/message/bubbleContainer";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;

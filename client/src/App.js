import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./actions/authActions";
import Header from "./components/header";
import { renderRoutes, routes } from "./configs/routes";
import MessageBubbleContainer from "./container/message/bubbleContainer";
import "./App.css";

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
      </main>
    </div>
  );
}

export default App;

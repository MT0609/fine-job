import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./actions/authActions";
import Header from "./components/header";
import { renderRoutes, routes } from "./configs/routes";
import MessageBubble from "./container/message/tab/bubble";
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
            <MessageBubble />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

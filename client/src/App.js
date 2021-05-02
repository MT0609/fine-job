import { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./actions/authActions";
import Header from "./components/header";
import { renderRoutes, routes } from "./configs/routes";
import "./App.css";
import MessageBubble from "./container/message/tab/bubble";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="App__main">
          <Switch>{renderRoutes(routes)}</Switch>
          {auth.isAuth && (
            <div className="App__message">
              <MessageBubble />
            </div>
          )}
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

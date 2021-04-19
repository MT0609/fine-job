import { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "./actions/authActions";
import Header from "./components/header";
import { renderRoutes, routes } from "./configs/routes";
import "./App.css";

function App() {
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
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

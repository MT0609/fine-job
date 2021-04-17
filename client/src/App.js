import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import { renderRoutes, routes } from "./configs/routes/routes";

function App() {
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

import { Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import AuthenPage from "../pages/authen";
import Home from "../pages/home";
import Jobs from "../pages/jobs";
import ForgotPassword from "../pages/forgot";
import Companies from "../pages/company/companies";
import Company from "../pages/company/company";

const routes = [
  {
    path: ROUTES.home,
    exact: true,
    main: () => <Home />,
  },
  {
    path: ROUTES.jobs,
    exact: true,
    main: () => <Jobs />,
  },
  {
    path: ROUTES.companies,
    exact: true,
    main: () => <Companies />,
  },
  {
    path: ROUTES.company,
    exact: true,
    main: () => <Company />,
  },
  {
    path: ROUTES.authen,
    exact: true,
    main: () => <AuthenPage />,
  },
  {
    path: ROUTES.forgot,
    exact: true,
    main: () => <ForgotPassword />,
  },
];

const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    const { path, exact, main } = route;
    return <Route key={index} path={path} exact={exact} component={main} />;
  });
};

export { routes, renderRoutes };

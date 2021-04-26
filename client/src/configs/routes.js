import { Route, Redirect } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import AuthenPage from "../pages/authen";
import Home from "../pages/home";
import Jobs from "../pages/jobs";
import ForgotPassword from "../pages/forgot";
import Companies from "../pages/company/companies";
import Company from "../pages/company/company";
import TalentMainPage from "../pages/talent";
import PostJob from "../pages/talent/post";
import UpdateJob from "../pages/talent/update";
import ResumeHomePage from "../pages/resume";
import ResumeUpdate from "../pages/resume/update";
import jwt_decode from "jwt-decode";

const routes = [
  {
    path: ROUTES.home,
    exact: true,
    main: () => <Home />,
  },
  {
    path: ROUTES.authen,
    exact: true,
    authen: false,
    main: () => <AuthenPage />,
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
    path: ROUTES.talent,
    exact: true,
    authen: true,
    main: () => <TalentMainPage />,
  },
  {
    path: ROUTES.talentfind,
    exact: true,
    authen: true,
    main: () => <PostJob />,
  },
  {
    path: ROUTES.jobUpdate,
    exact: true,
    authen: true,
    main: () => <UpdateJob />,
  },
  {
    path: ROUTES.resume,
    exact: true,
    authen: true,
    main: () => <ResumeHomePage />,
  },
  {
    path: ROUTES.resumeUpdate,
    exact: true,
    authen: true,
    main: () => <ResumeUpdate />,
  },
  {
    path: ROUTES.forgot,
    exact: true,
    authen: false,
    main: () => <ForgotPassword />,
  },
];

const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    const { path, exact, main: Component, authen = "none" } = route;
    return (
      <Route
        key={index}
        path={path}
        exact={exact}
        render={(props) => {
          try {
            const token = localStorage.getItem(
              process.env.REACT_APP_ACCESS_TOKEN
            );

            if (!token && authen === false) return <Component {...props} />;

            const user = jwt_decode(token);

            if (authen === false && user.sub) {
              return <Redirect to="/jobs" />;
            }

            if (authen === true && (!user || !user.sub))
              return <Redirect to="/authen" />;
          } catch (error) {
            localStorage.clear();
            return <Redirect to="/authen" />;
          }

          return <Component {...props} />;
        }}
      />
    );
  });
};

export { routes, renderRoutes };

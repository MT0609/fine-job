import React, { Suspense, lazy } from "react";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ROUTES } from "../constants/routes";
import AuthenPage from "../pages/authen";
import Home from "../pages/home";
import Jobs from "../pages/jobs";
import TalentMainPage from "../pages/talent";
import Profile from "../pages/profile";
import Loading from "../components/loading/circular";

const ForgotPassword = lazy(() => import("../pages/forgot"));
const Companies = lazy(() => import("../pages/company/companies"));
const Company = lazy(() => import("../pages/company/company"));
const PostJob = lazy(() => import("../pages/talent/post"));
const UpdateJob = lazy(() => import("../pages/talent/update"));
const ResumeHomePage = lazy(() => import("../pages/resume"));
const ResumeUpdate = lazy(() => import("../pages/resume/update"));
const MessagePage = lazy(() => import("../pages/message"));
const NotFound = lazy(() => import("../pages/notfound"));

const routes = [
  {
    path: ROUTES.home,
    exact: true,
    main: () => <Home />,
  },
  {
    path: ROUTES.profile,
    exact: true,
    authen: true,
    main: () => <Profile />,
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
    path: ROUTES.messages,
    exact: true,
    authen: true,
    main: () => <MessagePage />,
  },
  {
    path: ROUTES.forgot,
    exact: true,
    authen: false,
    main: () => <ForgotPassword />,
  },
];

const renderRoutes = (routes) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes.map((route, index) => {
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

                    if (!token && authen !== true)
                      return <Component {...props} />;

                    const user = jwt_decode(token);

                    if (authen === false && user.sub) {
                      return <Redirect to="/jobs" />;
                    }

                    if (authen === true && (!user || !user.sub))
                      return <Redirect to="/authen" />;

                    return <Component {...props} />;
                  } catch (error) {
                    localStorage.clear();
                    return <Redirect to="/authen" />;
                  }
                }}
              />
            );
          })}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export { routes, renderRoutes };

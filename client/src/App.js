import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { ToastContainer } from "./components/Common/Toast";

import PrivateRoute from "./components/PrivateRoute";
import DefaultLayout from "./layout/DefaultLayout";
import { privateRoutes, publicRoutes } from "./routes";
import Login from "./pages/Auth/Login";
// import { authenticate } from './actions/authActions';

function initLayout(route) {
  const Page = route.component;
  let Layout = DefaultLayout;

  if (route.layout) {
    Layout = route.layout;
  } else if (route.layout === null) {
    Layout = Fragment;
  }
  return { Page, Layout };
}

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authenticate());
  // }, [dispatch]);

  return (
    <div className="main-container" style={{ width: "100%", height: "100%" }}>
      <Switch>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = Fragment;
          return (
            <Route
              key={index}
              path={route.path}
              render={() => (
                <Layout>
                  <Page />
                </Layout>
              )}
            />
          );
        })}
        {/* <Route exact path="/login" component={Login} /> */}
        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} /> */}

        <PrivateRoute
          exact
          path="/"
          component={() => <Redirect to="/dashboard" />}
        />
        {privateRoutes.map((route, index) => {
          const { Layout, Page } = initLayout(route);
          return (
            <PrivateRoute
              key={index}
              path={route.path}
              component={() => (
                <Layout>
                  <Page />
                </Layout>
              )}
            />
          );
        })}
        {/* <PrivateRoute
          exact
          path="/dashboard"
          component={() => (
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          exact
          path="/sensor"
          component={() => (
            <DefaultLayout>
              <Sensor />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          exact
          path="/user"
          component={() => (
            <DefaultLayout>
              <MyTable />
            </DefaultLayout>
          )}
        /> */}

        {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
        {/* <PrivateRoute exact path="/sensors" component={Sensors} /> */}
      </Switch>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange
        pauseOnHover
        className="custom-toast-container"
      />
    </div>
  );
}

export default App;

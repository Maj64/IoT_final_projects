import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const isLoading = useSelector(state => state.auth.isLoading);

  // const isAuthenticated = false
  const isLoading = false;

  if (isLoading) {
    // Render a loading spinner or message while the authentication status is being checked
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

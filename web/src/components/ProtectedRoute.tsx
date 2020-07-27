import React from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const currentLocation = useLocation();
  const redirectPath = "/login";
  const isAuthenticated = !!localStorage.getItem("session");

  if (redirectPath !== currentLocation.pathname) {
    if (!isAuthenticated)
      return (
        <Route
          {...props}
          component={() => <Redirect to={{ pathname: redirectPath }} />}
          render={undefined}
        />
      );
    else return <Route {...props} />;
  } else {
    return <Route {...props} />;
  }
};

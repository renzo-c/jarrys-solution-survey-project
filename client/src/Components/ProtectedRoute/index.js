import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../../Contexts/Auth";

const ProtectedRoute = ({ component: Component, path }) => {
  const { auth } = useContext(Auth);
  return (
    <Route
      path={path}
      render={(props) => {
        if (auth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;

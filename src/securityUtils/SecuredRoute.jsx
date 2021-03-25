import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from "../Store";

const SecuredRoute = ({ component: Component, security, ...otherProps }) => {
  console.log(security);
  return (
    <Route
      {...otherProps}
      render={(props) =>
        security.validToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { referrer: props.location } }}
          />
        )
      }
    />
  );
};

export default SecuredRoute;

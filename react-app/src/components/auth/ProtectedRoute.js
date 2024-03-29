import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  return (
    <Route {...props}>
      {props.loaded ? props.children : <Redirect to="/" />}
    </Route>
  );
};

export default ProtectedRoute;

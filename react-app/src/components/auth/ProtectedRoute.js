import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  // const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {props.loaded ? props.children : <Redirect to="/" />}
    </Route>
  );
};

export default ProtectedRoute;

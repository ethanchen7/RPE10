import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import HomePage from "./components/MainView/Dashboard";
import SplashPage from "./components/SplashPage";
import Program from "./components/MainView/Program";
import BlockCreation from "./components/MainView/Program/BlockCreation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import { setBlocks } from "./store/block";
import { setWeeks } from "./store/week";
import { setDays } from "./store/day";
import { setExercises } from "./store/exercise";

function App() {
  const [loaded, setLoaded] = useState(false);
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (session) {
        const res = await fetch(`/api/users/${session.id}`);
        if (res.ok) {
          const data = await res.json();
          dispatch(setBlocks(data.blocks));
          dispatch(setWeeks(data.weeks));
          dispatch(setDays(data.days));
          dispatch(setExercises(data.exercises));
        }
      }
      setLoaded(true);
    })();
  }, [dispatch, session]);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          {session ? <HomePage /> : <SplashPage />}
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/program" exact={true} loaded={loaded}>
          <Program />
        </ProtectedRoute>
        <ProtectedRoute
          path="/program/block/:blockId"
          exact={true}
          loaded={loaded}
        >
          <BlockCreation />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true} loaded={loaded}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} loaded={loaded}>
          <User />
        </ProtectedRoute>
        {/* <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

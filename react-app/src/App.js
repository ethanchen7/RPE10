import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthPage from "./components/auth/AuthPage";
import HomePage from "./components/MainView/Dashboard";
import SplashPage from "./components/SplashPage";
import Program from "./components/MainView/Program";
import BlockCreation from "./components/MainView/Program/BlockCreation";
import BlockDisplay from "./components/MainView/BlockDisplay";
import Chat from "./components/MainView/Chat";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import About from "./components/About";
import NotFound from "./components/NotFound";
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
        <Route path="/about" exact={true}>
          <About />
        </Route>
        <Route path="/login" exact={true}>
          <AuthPage />
        </Route>
        <Route path="/sign-up" exact={true}>
          <AuthPage />
        </Route>
        <ProtectedRoute path="/block/:blockId" exact={true} loaded={loaded}>
          <BlockDisplay />
        </ProtectedRoute>
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
        <ProtectedRoute path="/chat" exact={true} loaded={loaded}>
          <Chat />
        </ProtectedRoute>
        <ProtectedRoute loaded={loaded}>
          <NotFound />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

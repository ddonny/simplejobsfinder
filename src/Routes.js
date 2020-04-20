import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
// import { PrivateRoute } from "./containers/PrivateRoute";
import {Login} from "./containers/Login";
import { Home } from "./containers/Home";
import {JobDetail} from "./containers/JobDetail";
import * as storage from "./utils/storage";
import { ADMIN_ID, TOKEN } from "./constants";
import { setCurrentUser } from "./actions";

export const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const adminId = parseInt(storage.getStorage(ADMIN_ID), 10);
    const token = storage.getStorage(TOKEN);
    if (adminId && token) {
      dispatch(
        setCurrentUser({
          adminId,
          token
        })
      );
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>

        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/home" component={(props) => <Home {...props}/>} />
          <Route exact path="/jobdetail/:id" component={(props) => <JobDetail {...props}/>} />
        </Switch>
    </Suspense>
  );
};

import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./login/Login";

export default class PrimaryLayout extends Component {
  render() {
    return (
      <div className="primaryLayout">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

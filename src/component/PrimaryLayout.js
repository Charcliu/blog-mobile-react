import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./login/Login";
import List from "./blog/List";
import Detail from "./blog/Detail";

export default class PrimaryLayout extends Component {
  render() {
    return (
      <div className="primaryLayout">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login" component={Login} />
          <Route path="/blogList" component={List} />
          <Route path="/blogDetail/:blogId" component={Detail} />
        </Switch>
      </div>
    );
  }
}

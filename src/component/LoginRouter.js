import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export default class LoginRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false, // 表示是否认证通过
      hasAuthed: false // 表示是否向服务器发送过认证请求
    };
    console.log("contructor");
  }

  componentWillMount() {
    this.get("/blog/isSession", {})
      .then(res => {
        this.setState({ auth: true, hasAuthed: true });
      })
      .catch(err => {
        this.setState({ auth: false, hasAuthed: true });
      });
  }

  componentWillReceiveProps() {
    this.get("/blog/isSession", {})
      .then(res => {
        this.setState({ auth: true, hasAuthed: true });
      })
      .catch(err => {
        this.setState({ auth: false, hasAuthed: true });
      });
  }

  render() {
    // 初始渲染时，尚未向服务器发送认证请求，因此不渲染元素
    if (!this.state.hasAuthed) {
      return null;
    }

    let { component: Component, ...rest } = this.props;

    return this.state.auth ? (
      <Route {...rest} render={props => <Component {...props} />} />
    ) : (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  }
}

import React, { Component } from "react";
import { List, InputItem, Button, Toast } from "antd-mobile";

import "../../css/login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.changeName = this.changeName.bind(this);
    this.changePwd = this.changePwd.bind(this);
    this.login = this.login.bind(this);
  }

  changeName(val) {
    this.setState({
      username: val
    });
  }

  changePwd(val) {
    this.setState({
      password: val
    });
  }

  login() {
    this.postRequestParam("/blog/login", this.state).then(res => {
      if (res) {
        Toast.success("登录成功！");
      } else {
        Toast.fail("用户名密码错误！");
      }
    });
  }

  render() {
    return (
      <div className="login">
        <main>
          <List className="loginForm" renderHeader={() => "登录"}>
            <InputItem
              type="text"
              name="username"
              placeholder="Your Login Name"
              value={this.state.username}
              onChange={this.changeName}
            >
              用户名
            </InputItem>
            <InputItem
              type="password"
              name="password"
              placeholder="****"
              value={this.state.password}
              onChange={this.changePwd}
            >
              密码
            </InputItem>
          </List>
          <Button type="ghost" className="loginBtn" onClick={this.login}>
            登录
          </Button>
        </main>
      </div>
    );
  }
}

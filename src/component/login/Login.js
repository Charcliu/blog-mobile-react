import React, { Component } from "react";
import { Button } from "antd-mobile";

export default class Login extends Component {
  log = name => {
    return value => {
      console.log(`${name}: ${value}`);
    };
  };
  render() {
    return (
      <h1>
        Login
        <Button type="primary">primary</Button>
      </h1>
    );
  }
}

import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import PrimaryLayout from "./component/PrimaryLayout";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.postRequestParam("/blog/login", {
      username: "ChangLau",
      password: "wff1993lc"
    })
      .then(res => {})
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <PrimaryLayout />
      </BrowserRouter>
    );
  }
}

export default App;

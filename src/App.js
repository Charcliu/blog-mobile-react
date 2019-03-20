import React, { Component } from "react";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.postRequestParam("/blog/login", {
      username: "ChangLau",
      password: "wff1993lc"
    })
      .then(res => {
        alert("login success");
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>My Blog</h1>
      </div>
    );
  }
}

export default App;

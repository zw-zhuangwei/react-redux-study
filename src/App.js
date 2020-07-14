import React, { Component } from "react";
import "./index.css";
import "./App.css";

import NavRouter from "./router";

export default class RouterManager extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <NavRouter />
      </>
    );
  }
}

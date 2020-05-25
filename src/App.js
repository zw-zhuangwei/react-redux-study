import React, { Component } from "react";
import "./index.css";

import NavRouter from "./router";

export default class RouterManager extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div>欢迎访问 ****************</div>
        <NavRouter />
      </>
    );
  }
}

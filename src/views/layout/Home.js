import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

export default class Home extends Component {
  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <div>
              <ul className="nav">
                　　　　　　
                <li>
                  <Link to="/">App</Link>
                </li>
                <li>
                  <Link to="/demo1">demo1</Link>
                </li>
                　　　　　　
                <li>
                  <Link to="/demo2">demo2</Link>
                </li>
                　　　　　　
                <li>
                  <Link to="/demo3">demo3</Link>
                </li>
                <li>
                  <Link to="/counter">counter 计数测试</Link>
                </li>
                　　 　　　　
              </ul>
            </div>
          </header>
        </div>
      </>
    );
  }
}

import React, { Component } from 'react'
import logo from '@/logo.svg'

export default class Demo3 extends Component {
  render() {
    return (
      <>
        <div className="App">
          <header>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Demo3 <code>src/App.js</code> and save to reload.
            </p>
            <a
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </>
    )
  }
}

import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../../logo.svg'
import '../../App.css'

class Demo1 extends Component {
  render() {
    const { count } = this.props
    return (
      <>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>欢迎访问demo1---count: {count}</p>
            <a
              className="App-link"
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

let mapStateToProps = (state) => {
  return {
    count: state.counter.count,
  }
}

// Connected Component
export default connect(mapStateToProps)(Demo1)

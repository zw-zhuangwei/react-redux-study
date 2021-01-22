import React, { Component } from 'react'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import action from '@redux/action'

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  .count,
  .name {
    color: red;
    padding: 5px 0;
  }
  .name {
    padding-bottom: 20px;
  }
`

// React component
class Counter extends Component {
  constructor() {
    super()
    this.state = {
      name: 'zhuangwei',
      age: 18,
    }
    Counter.self = this
    Counter.timer = 0
  }
  render() {
    const { count, data, increase, reduce, asyncTest } = this.props

    return (
      <Wrapper>
        <center>
          <div className="count">{count}</div>
          <div className="name">{data.email ? data.email : 'zhuangwei'}</div>
          <button onClick={increase}>增加</button>
          <button onClick={reduce}>减少</button>
          <button onClick={asyncTest}>异步测试</button>
          <button onClick={this.innerFun.bind(this, 'hahhahhahah')}>
            组件内自身方法
          </button>
          <button onClick={this.homeClick.bind(this)}>跳转到首页</button>
        </center>
      </Wrapper>
    )
  }

  componentDidMount() {
    Counter.timer = setTimeout(() => {
      this.setState({
        name: 'zhuanghsaohsaohsao',
      })
    }, 3000)
  }

  componentWillUnmount() {
    clearTimeout(Counter.timer)
  }

  innerFun(v) {
    console.log(v)
  }

  homeClick = () => {
    this.props.history.push('/qzhome/home')
  }
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
}

// Map Redux state to component props

let mapStateToProps = (state) => {
  return {
    count: state.counter.count,
    data: state.counter.data,
  }
}

// Map Redux actions to component props
let mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      increase: () => action.counter.increase(),
      reduce: () => action.counter.reduce(),
      asyncTest: () => action.counter.asyncTest(Counter.self.state),
    },
    dispatch
  )

// Connected Component
export default connect(mapStateToProps, mapDispatchToProps)(Counter)

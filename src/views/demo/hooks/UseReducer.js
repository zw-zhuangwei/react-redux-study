import * as React from 'react'
import { useReducer } from 'react'

export default () => {
  const myReducer = (state, action) => {
    switch (action.type) {
      case 'countUp':
        return {
          ...state,
          count: state.count + 1,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(myReducer, { count: 0 })

  return (
    <div>
      <button onClick={() => dispatch({ type: 'countUp' })}>每次加1</button>
      <p>Count: {state.count}</p>
    </div>
  )
}

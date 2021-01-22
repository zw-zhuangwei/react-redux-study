import React from 'react'
import Loadable from 'react-loadable'

const asyncLoader = (loader) => {
  return Loadable({
    loader,
    loading (props) {
      if (props.error) {
        return (
          <div>
            Error! <button onClick={props.retry}>Retry</button>
          </div>
        )
      } else if (props.timedOut) {
        return (
          <div>
            Taking a long time... <button onClick={props.retry}>Retry</button>
          </div>
        )
      } else if (props.pastDelay) {
        return <div>Loading...</div>
      } else {
        return null
      }
    },
  })
}
export default asyncLoader

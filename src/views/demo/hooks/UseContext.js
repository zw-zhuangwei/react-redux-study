import * as React from 'react'
import { useContext } from 'react'

export default () => {
  const AppContext = React.createContext({})

  const Navbar = () => {
    const { username } = useContext(AppContext)
    return (
      <div className="navbar">
        <p>AwesomeSite</p>
        <p>{username}</p>
      </div>
    )
  }

  const Messages = () => {
    const { username } = useContext(AppContext)

    return (
      <div className="messages">
        <h1>Messages</h1>
        <p>1 message for {username}</p>
        <p className="message">useContext is awesome!</p>
      </div>
    )
  }

  // useEffect(() => {

  // },[])

  return (
    <AppContext.Provider
      value={{
        username: 'superawesome',
      }}
    >
      <div className="App">
        <Navbar />
        <Messages />
      </div>
    </AppContext.Provider>
  )
}

import React, { useState, useEffect, useLayoutEffect } from 'react'

export default () => {
  const [show, setShow] = useState('1')

  const Person = ({ personId }) => {
    const [loading, setLoading] = useState(true)
    const [person, setPerson] = useState({})

    useEffect(() => {
      setLoading(true)
      fetch(`https://swapi.co/api/people/${personId}/`)
        .then((response) => response.json())
        .then((data) => {
          setPerson(data)
          setLoading(false)
        })
    }, [personId])

    if (loading === true) {
      return <p>Loading ...</p>
    }

    return (
      <div>
        <p>You're viewing: {person.name}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
      </div>
    )
  }

  useEffect(() => {
    //改变状态都会执行 useEffect
    console.log('后执行useEffect')
    return () => {
      //销毁
      console.log('销毁了')
    }
  }, [])

  useLayoutEffect(() => {
    console.log('执行了useLayoutEffect')
  })

  console.log('先执行render(在useEffect前执行)')

  return (
    <div className="App">
      {console.log(111111)}
      <Person personId={show} />
      <div>
        Show:
        <button onClick={() => setShow('1')}>Luke</button>
        <button onClick={() => setShow('2')}>C-3PO</button>
      </div>
    </div>
  )
}

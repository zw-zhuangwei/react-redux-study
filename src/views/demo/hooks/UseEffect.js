import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
} from 'react'

const HookUseEffect = () => {
  const [show, setShow] = useState('1')

  const Person = ({ personId }) => {
    const [loading, setLoading] = useState(true)
    const [person, setPerson] = useState({})

    useEffect(() => {
      setLoading(true)
      setTimeout(() => {
        setPerson({
          name: 'zhuangwei',
          height: 300,
          mass: 'hahahahahah',
        })
        setLoading(false)
      }, 200)
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
    //真实dom生成 再次回流 绘制
    //改变状态都会执行 useEffect
    console.log('后执行useEffect')
    return () => {
      //销毁
      console.log('销毁了')
    }
  }, [])

  useLayoutEffect(() => {
    //操作虚拟dom 回流 绘制前
    console.log('执行了useLayoutEffect')
  })

  console.log('先执行render(在useEffect前执行)')

  const testFun = useCallback(() => {
    console.log('s1111222334455666s' + show)
  }, [show])

  useMemo(() => {
    console.log('useMemouseMemouseMemouseMemo' + show)
  }, [show])

  return (
    <div className="App">
      <Person personId={show} />
      <div>
        Show:
        <button onClick={() => setShow('1')}>Luke</button>
        <button onClick={() => setShow('2')}>C-3PO</button>
        <button onClick={() => setShow('3')}>P-40</button>
        <button onClick={() => setShow('4')}>P-50</button>
        <button onClick={testFun}>P-60</button>
      </div>
    </div>
  )
}
export default HookUseEffect

import React, { useState, useRef, useImperativeHandle } from 'react'

// 借鉴文档 https://blog.csdn.net/qq_24724109/article/details/103817607

export default () => {
  // 通过useRef hook 获得相应的ref节点
  const myRef = useRef()

  const InputWithLabel = (props) => {
    const { label, myRef } = props // 这里的myRef为通过外部打入的父级ref节点
    const [value, setValue] = useState('')
    const _innerRef = useRef(null)

    const handleChange = (e) => {
      const value = e.target.value
      setValue(value)
    }

    useImperativeHandle(myRef, () => ({
      getValue() {
        return value
      },
      focus() {
        const node = _innerRef.current
        console.log(22222, node)
        node.focus()
      },
    }))

    return (
      <div>
        <span>{label}:</span>
        <input
          type="text"
          ref={_innerRef}
          value={value}
          onChange={handleChange}
        />
      </div>
    )
  }

  // 这里用forwardRef来承接得到父级传入的ref节点，并将其以参数的形式传给字节点
  const RefInput = React.forwardRef((props, ref) => (
    <InputWithLabel {...props} myRef={ref} />
  ))

  // 调用该RefInput的过程
  const handleFocus = () => {
    const node = myRef.current
    console.log(1111, node, node.getValue())
    node.focus()
  }

  return (
    <div className="App">
      <RefInput label={'姓名'} ref={myRef} />
      <button onClick={handleFocus}>focus</button>
    </div>
  )
}

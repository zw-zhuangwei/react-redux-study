import React, { useState } from 'react'

export default () => {
  //写法一
  const [count1, setCount1] = useState(10000)
  //写法二
  const [count2, setCount2] = useState((x) => 10000)
  console.log(1212)
  return (
    <div>
      <h2>初始值count1： {count1} </h2>
      <h2>初始值count2： {count2} </h2>
      <button
        onClick={() => {
          setCount1(count1 + 1)
        }}
      >
        写法1
      </button>
      <button
        onClick={() => {
          setCount2((x) => x + 1)
        }}
      >
        写法2
      </button>
    </div>
  )
}

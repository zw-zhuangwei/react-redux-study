import React, { useState, useMemo, useCallback } from 'react'
const set = new Set()

const HookUseMemo = () => {
  const [count, setCount] = useState(1)
  const [val, setValue] = useState('')
  const expensive = useMemo(() => {
    console.log('compute')
    let sum = 0
    for (let i = 0; i < count * 100; i++) {
      sum += i
    }
    return sum
  }, [count])

  const callback = useCallback(() => {
    console.log(count)
  }, [count])

  set.add(callback)

  console.log(set)

  return (
    <div>
      <h4>
        {count}-{expensive}
      </h4>
      <h4>val: {val}</h4>
      <h4>{set.size}</h4>

      <div>
        <button onClick={() => setCount(count + 1)}>+c1</button>
        <input value={val} onChange={(event) => setValue(event.target.value)} />
      </div>
    </div>
  )
}

export default HookUseMemo

// 文档出处 https://blog.csdn.net/sinat_17775997/article/details/94453167

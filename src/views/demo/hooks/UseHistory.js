import React, {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";

export default ()=>{
  const history = useHistory()
  const [count, setCount] = useState(10000)

  useEffect(()=>{  //改变状态都会执行 useEffect
    console.log('后执行useEffect')

   let timer = setTimeout(()=>{
      setCount(x=>x+1)
    },1000)

    return ()=>{ //销毁
      console.log('销毁了')
      clearTimeout(timer)
    }
  },[])

  console.log('先执行render(在useEffect前执行)')

  return (
      <div>
          <h2>初始值count： {count} </h2>

          <p><button onClick={()=>{setCount(x=>x+1)}}>添加</button></p>

          <p><button onClick={()=> history.push("/login")}>跳转</button></p>
      </div>
    )
}

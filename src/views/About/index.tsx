import Comp1, { ChildRefType } from "@/components/Comp1"
import { useEffect, useRef } from "react"

function View() {
  const comp1 = useRef<ChildRefType>(null)

  useEffect(() => {
    console.log('子组件comp1', comp1);
  }, [])

  const handleClick = () => {
    comp1.current?.childFun()
  }
  
  return (
    <div>
      About组件
      <button onClick={handleClick}>调用子组件的方法</button>
      <br></br>
      -------子组件👇---------
      <Comp1 ref={comp1}/>
    </div>
  )
}

export default View

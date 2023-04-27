import { startTransition, useEffect, useState } from "react"

function View() {
  console.log('render');
  const [value, setValue] = useState('')
  
  useEffect(() => {
    console.log("set state", value)
  }, [value])

  const onClick = () => {
    setValue("1")
    startTransition(() => {
      console.log('startTransition', value);
      // setValue((v) => v + "2")
      setValue("4")
    })
    setValue((v) => v + "3")
    setValue((v) => v + "6")
    // startTransition(() => {
    //   setValue((v) => v + "4")
    // })
  }

  const [inputValue, setInputValue] = useState('')
  const onChange = (e) => {
    setInputValue(e.target.value)
    startTransition(() => {
      console.log('startTransition', inputValue);
      // setValue((v) => v + "2")
    })
  }
  useEffect(() => {
    console.log("set state", inputValue)
  }, [inputValue])

  return (
    <div>
      Page3-1
      <button onClick={onClick}>{value}</button>
      <input type="text" value={inputValue} onChange={onChange}/>
    </div>
  )
}

export default View

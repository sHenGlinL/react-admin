import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"

function View() {
  // 获取redux数据
  const { num } = useSelector((state:RootState) => state.NumReducer)
  // 修改redux数据
  const dispatch = useDispatch()
  const changeNum = () => {
    dispatch({ type: 'add1' })
  }
  const changeNum2 = () => {
    dispatch({ type: 'add2', value: 10 })
  }

  const { arr } = useSelector((state:RootState) => state.UserReducer)
  const changeArr = () => {
    dispatch({ type: 'arrPush', value: 40 })
  }

  return (
    <div>
      <h1>redux-demo</h1>
      <div>
        <span>redux中的数据num: {num}</span>
        <button onClick={changeNum}>+1</button>
        <button onClick={changeNum2}>+10</button>
        <span>redux中的数据arr: {arr}</span>
        <button onClick={changeArr}>arr添加</button>
      </div>
    </div>
  )
}

export default View

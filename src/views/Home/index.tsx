import UserStore from "@/store/UserStore"
import { useAppDispatch, useAppSelector } from "@/store"

function View() {
  // 获取redux数据
  const { num } = useAppSelector(state => state.NumReducer)
  // 修改redux数据
  const dispatch = useAppDispatch()
  const changeNum = () => {
    dispatch({ type: 'add1' })
  }
  const changeNum2 = () => {
    dispatch({ type: 'add2', payload: 10 })
  }

  const { arr } = useAppSelector(state => state.UserReducer)
  const changeArr = () => {
    dispatch({ type: 'arrPush', payload: 40 })
  }
  const handleAsync = () => {
    dispatch(UserStore.asyncActions.asyncArrPush as any)
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
        <button onClick={handleAsync}>异步按钮</button>
      </div>
    </div>
  )
}

export default View

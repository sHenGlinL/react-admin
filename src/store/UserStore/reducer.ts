import UserStore from "./index";

const reducer = (state = UserStore.state, action ) => {
  const newState = JSON.parse(JSON.stringify(state))

  // 调用dispatch会执行此方法
  const { type, value } = action
  const dispatchFun = UserStore.actions[type]
  dispatchFun && dispatchFun(newState, value)

  return newState
}; 

export default reducer;

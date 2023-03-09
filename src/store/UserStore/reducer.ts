import { ActionType } from "..";
import UserStore from "./index";

const reducer = (state = UserStore.state, action: ActionType ) => {
  const newState = JSON.parse(JSON.stringify(state))

  // 调用dispatch会执行此方法
  const { type, payload } = action
  const dispatchFun = UserStore.actions[type]
  dispatchFun && dispatchFun(newState, payload)

  return newState
}; 

export default reducer;

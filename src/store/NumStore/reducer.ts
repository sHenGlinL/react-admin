import { ActionType } from "..";
import NumStore from "./index";

const reducer = (state = NumStore.state, action:ActionType ) => {
  const newState = JSON.parse(JSON.stringify(state))

  // 调用dispatch会执行此方法
  const { type, payload } = action
  const dispatchFun = NumStore.actions[type]
  dispatchFun && dispatchFun(newState, payload)

  return newState
}; 

export default reducer;

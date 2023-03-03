const defaultState = {
  num: 20,
};

const reducer = (state = defaultState, action ) => {
  const newState = JSON.parse(JSON.stringify(state))
  // 调用dispatch会执行此方法
  switch (action.type) {
    case "add1":
      newState.num ++
      break
    case "add2":
      newState.num += action.value
    default:
      break;
  }

  return newState
}; 

export default reducer;

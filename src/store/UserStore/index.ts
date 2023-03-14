interface StateType {
  arr: number[]
}

const UserStore = {
  state: {
    arr: [10, 20, 30]
  },
  actions: {
    arrPush(state:StateType, payload:any) {
      state.arr.push(payload)
    }
  },
  asyncActions: {
    asyncArrPush(dispatch:Function) {
      setTimeout(() => {
        dispatch({ type: 'arrPush', payload: '异步添加' })
      }, 1000);
    }
  }
}

export default UserStore
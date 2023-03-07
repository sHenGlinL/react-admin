const UserStore = {
  state: {
    arr: [10, 20, 30]
  },
  actions: {
    arrPush(state, value) {
      state.arr.push(value)
    }
  },
  asyncActions: {
    asyncArrPush(dispatch:Function) {
      setTimeout(() => {
        dispatch({ type: 'arrPush', value: '异步添加' })
      }, 1000);
    }
  }
}

export default UserStore
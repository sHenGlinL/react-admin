const UserStore = {
  state: {
    arr: [10, 20, 30]
  },
  actions: {
    arrPush(state, value) {
      state.arr.push(value)
    }
  }
}

export default UserStore
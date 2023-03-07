// @todo typescript完善

const NumStore = {
  state: {
    num: 20
  },
  actions: {
    add1(state) {
      state.num ++
    },
    add2(state, value) {
      state.num += value
    }
  }
}

export default NumStore
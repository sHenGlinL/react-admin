// @todo typescript完善

const NumStore = {
  state: {
    num: 20
  },
  actions: {
    add1(state) {
      state.num ++
    },
    add2(state, payload:any) {
      state.num += payload
    }
  }
}

export default NumStore
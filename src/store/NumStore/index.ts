// @todo typescript完善
interface StateType {
  num: number
}

const NumStore = {
  state: {
    num: 20
  },
  actions: {
    add1(state:StateType) {
      state.num ++
    },
    add2(state:StateType, payload:any) {
      state.num += payload
    }
  }
}

export default NumStore
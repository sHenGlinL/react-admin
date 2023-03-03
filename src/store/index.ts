import { legacy_createStore } from 'redux'
import reducer from './reducer'

const store = legacy_createStore(reducer)

export type RootState = ReturnType<typeof store.getState>

export default store
import { legacy_createStore, combineReducers } from 'redux'
import NumReducer from './NumStore/reducer'
import UserReducer from './UserStore/reducer'

const reducers = combineReducers({
  NumReducer,
  UserReducer
})

const store = legacy_createStore(reducers)

export type RootState = ReturnType<typeof store.getState>

export default store
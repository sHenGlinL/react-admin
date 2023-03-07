import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import NumReducer from './NumStore/reducer'
import UserReducer from './UserStore/reducer'

const reducers = combineReducers({
  NumReducer,
  UserReducer
})

const store = legacy_createStore(reducers, applyMiddleware(reduxThunk))

export type RootState = ReturnType<typeof store.getState>

export default store
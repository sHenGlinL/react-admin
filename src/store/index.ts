import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import NumReducer from './NumStore/reducer'
import UserReducer from './UserStore/reducer'

const reducers = combineReducers({
  NumReducer,
  UserReducer
})

const store = legacy_createStore(reducers, applyMiddleware(reduxThunk))

export type ActionType = {
  type: string,
  payload?: any
}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
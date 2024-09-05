import {createStore, combineReducers} from 'redux'
import { userReducer } from './UserReducers.js'

const rootReducer = combineReducers({
  user: userReducer,
})

export const store = createStore(rootReducer)
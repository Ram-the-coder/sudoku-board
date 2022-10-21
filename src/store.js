import { combineReducers, configureStore } from '@reduxjs/toolkit'
import boardReducer from './reducers/boardSlice'

const rootReducer = combineReducers({
  board: boardReducer
})

export function setupStore(preloadedState={}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
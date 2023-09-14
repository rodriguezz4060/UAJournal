import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { userReducer } from './slices/user'
import { createWrapper } from 'next-redux-wrapper'

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  })
}

export const store = makeStore()

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStore,
  unknown,
  Action<string>
>

export const wrapper = createWrapper<RootStore>(makeStore, { debug: true })

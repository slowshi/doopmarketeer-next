import { doopmarketeerApi } from '@/services/api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
    [doopmarketeerApi.reducerPath]: doopmarketeerApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(doopmarketeerApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

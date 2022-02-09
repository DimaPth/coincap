import { configureStore } from '@reduxjs/toolkit'
import { coinCapApi } from './coinCapApi'

export const store = configureStore({
  reducer: {
    [coinCapApi.reducerPath]: coinCapApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinCapApi.middleware),
})
import { configureStore } from '@reduxjs/toolkit'
import { coinCapApi } from './coinCapApi'
import { localstoreSlice } from './localstoreSlice'

export const store = configureStore({
  reducer: {
    [coinCapApi.reducerPath]: coinCapApi.reducer,
    local: localstoreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinCapApi.middleware),
})
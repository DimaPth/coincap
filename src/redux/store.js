import { configureStore } from '@reduxjs/toolkit'
import { coinCapApi } from './coinCapApi'
import { localStoreSlice } from './localStoreSlice'

export const store = configureStore({
  reducer: {
    [coinCapApi.reducerPath]: coinCapApi.reducer,
    local: localStoreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinCapApi.middleware),
})
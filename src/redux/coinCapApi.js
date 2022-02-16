import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const coinCapApi = createApi({
  reducerPath: 'coinCapApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2/' }),
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: (limit = '20') => `assets?limit=${limit}`,
    }),
    getCurrency: builder.query({
      query: (id) => `assets/${id}`,
    }),
    getCurrencyHistory: builder.query({
      query: (id, interval = 'd1') => `assets/${id}/history?interval=${interval}&start=1642291200000&end=1644883200000`,
    }),
  }),
})

export const { useGetAssetsQuery, useGetCurrencyQuery, useGetCurrencyHistoryQuery } = coinCapApi
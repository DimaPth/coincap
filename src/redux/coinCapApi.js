import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const coinCapApi = createApi({
  reducerPath: 'coinCapApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2/' }),
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: (limit = '20') => `assets?limit=${limit}`,
    }),
    getAssetsByIds: builder.query({
      query: (ids) => `assets?ids=${ids}`
    }),
    getCurrency: builder.query({
      query: (id) => `assets/${id}`,
    }),
    getCurrencyHistory: builder.query({
      query: (id, interval = 'd1') => `assets/${id}/history?interval=${interval}`,
    }),
  }),
})

export const { useGetAssetsQuery, useGetAssetsByIdsQuery, useGetCurrencyQuery, useGetCurrencyHistoryQuery } = coinCapApi
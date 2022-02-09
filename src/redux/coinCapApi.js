import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const coinCapApi = createApi({
  reducerPath: 'coinCapApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2/' }),
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => `assets`,
    }),
  }),
})

export const { useGetAssetsQuery } = coinCapApi
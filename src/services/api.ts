import { Doodle, DoodleMetadata } from '@/interfaces/Doodle'
import { DoopmarketListing } from '@/interfaces/DoopMarket'
import { DoopTransactionInfo, LeaderboardUser } from '@/interfaces/DoopTransactions'
import { GemResponse } from '@/interfaces/Gem'
import { UndoopedDoodle } from '@/interfaces/Undooped'
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
// import { fetchWithRetry } from './fetchWithRetry'

const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: 'api/' }), { maxRetries: 5 })

type Pagination = {
  page: number
  limit: number
}

export const doopmarketeerApi = createApi({
  reducerPath: 'doopmarketeer',
  baseQuery: staggeredBaseQuery,
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getHistory: builder.query<DoopTransactionInfo[], Pagination>({
      query: ({ page, limit }) => `history?page=${page}&limit=${limit}`,
    }),
    getFeed: builder.query<DoopTransactionInfo[], number>({
      query: (startBlock) => `feed?startBlock=${startBlock}`,
    }),
    getUserDoops: builder.query<DoopTransactionInfo[], string>({
      query: (address) => `doops?address=${address}`,
    }),
    getDoopmarket: builder.query<DoopmarketListing[], void>({
      query: () => `doopmarket`,
    }),
    getLeaderboard: builder.query<LeaderboardUser[], void>({
      query: () => `leaderboard`,
    }),
    getUndoopedDoodles: builder.query<UndoopedDoodle[], Pagination>({
      query: ({ page, limit }) => `doodleFloor?page=${page}&limit=${limit}`,
    }),
    getUndoopedDooplicators: builder.query<GemResponse[], number>({
      query: (rarity) => `doopFloor?rarity=${rarity}`,
    }),
    getDoodleAssets: builder.query<Doodle[], number>({
      query: (tokenId) => `doodle/${tokenId}`,
    }),
    getDooplicatiorAssets: builder.query<DoodleMetadata[], number>({
      query: (tokenId) => `dooplicator/${tokenId}`,
    }),
  }),
})

export const {
  useGetDoopmarketQuery,
  useGetHistoryQuery,
  useGetDoodleAssetsQuery,
  useLazyGetUserDoopsQuery,
  useLazyGetDooplicatiorAssetsQuery,
  useLazyGetHistoryQuery,
  useLazyGetFeedQuery,
  useGetDooplicatiorAssetsQuery,
  useGetFeedQuery,
  useGetUserDoopsQuery,
  useGetLeaderboardQuery,
  useGetUndoopedDoodlesQuery,
  useLazyGetUndoopedDooplicatorsQuery,
  useLazyGetUndoopedDoodlesQuery,
  useGetUndoopedDooplicatorsQuery,
} = doopmarketeerApi

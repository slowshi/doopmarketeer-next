import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './appStore'
import { doopmarketeerApi } from '@/services/api'
import { getCurrencyConversion } from '@/utils/ethersUtils'
import { DoopmarketListing } from '@/interfaces/DoopMarket'
import { Doodle, DoodleMetadata } from '@/interfaces/Doodle'
import { DoopTransactionInfo, LeaderboardUser } from '@/interfaces/DoopTransactions'
import { searchTypes } from '@/utils/constants'
import { UndoopedDoodle } from '@/interfaces/Undooped'
import { GemResponse } from '@/interfaces/Gem'

interface AppState {
  ethPrice: number
  flowPrice: number
  address: string
  searchValue: string
  searchType: string
  searchLoading: boolean
  dooplications: DoopTransactionInfo[]
  doopMarket: DoopmarketListing[]
  assets: Record<string, Doodle>
  dooplicatorAssets: Record<string, DoodleMetadata>
  leaderboard: LeaderboardUser[]
  undoopedDoodles: UndoopedDoodle[]
  undoopedDooplicators: GemResponse[]
  feed: DoopTransactionInfo[]
  activeMarketTab: string
  leaderboardSort: string
}

const initialState: AppState = {
  ethPrice: 0,
  flowPrice: 0,
  address: '',
  searchValue: '',
  searchType: searchTypes.ADDRESS,
  searchLoading: false,
  dooplications: [],
  doopMarket: [],
  assets: {},
  dooplicatorAssets: {},
  leaderboard: [],
  undoopedDoodles: [],
  undoopedDooplicators: [],
  feed: [],
  activeMarketTab: '',
  leaderboardSort: 'totalDoops',
}
const getUniqueFeed = (feed: DoopTransactionInfo[]): DoopTransactionInfo[] => {
  const uniqueIds = Array.from(new Set(feed.map((item) => item.tokenId)))
  const result: DoopTransactionInfo[] = uniqueIds.reduce((acc, tokenId) => {
    const item = feed.find((item) => item.tokenId === tokenId)
    if (item) {
      acc.push(item)
    }
    return acc
  }, [] as DoopTransactionInfo[])
  return result
}
export const getCurrencies = createAsyncThunk('app/getCurrencies', async () => {
  const eth = await getCurrencyConversion('eth')
  const flow = await getCurrencyConversion('flow')
  return { eth, flow }
})

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetUndoopedDoodles: (state) => {
      state.undoopedDoodles = []
    },
    resetUndoopedDooplicators: (state) => {
      state.undoopedDooplicators = []
    },
    resetDooplications: (state) => {
      state.dooplications = []
    },
    resetFeed: (state) => {
      state.feed = []
    },
    setSearchType: (state, action: { payload: string }) => {
      state.searchType = action.payload
    },
    setSearchValue: (state, action: { payload: string }) => {
      state.searchValue = action.payload
    },
    setActiveMarketTab: (state, action: { payload: string }) => {
      state.activeMarketTab = action.payload
    },
    setSearchLoading: (state, action: { payload: boolean }) => {
      state.searchLoading = action.payload
    },
    setSortLeaderboard: (state, action: { payload: string }) => {
      state.leaderboardSort = action.payload
    },
    setSearchParams: (state) => {
      const searchParams = new URL(document.location.toString()).searchParams
      let type = ''
      let value = ''
      if (searchParams.has(searchTypes.ADDRESS)) {
        type = searchTypes.ADDRESS
        value = searchParams.get(searchTypes.ADDRESS) || ''
      } else if (searchParams.has(searchTypes.DOOPLICATOR)) {
        type = searchTypes.DOOPLICATOR
        value = searchParams.get(searchTypes.DOOPLICATOR) || ''
      } else if (searchParams.has(searchTypes.DOODLE)) {
        type = searchTypes.DOODLE
        value = searchParams.get(searchTypes.DOODLE) || ''
      } else if (searchParams.has(searchTypes.GENESIS_BOX)) {
        type = searchTypes.GENESIS_BOX
        value = searchParams.get(searchTypes.GENESIS_BOX) || ''
      }
      if (type !== '' && value !== '') {
        state.searchLoading = true
        state.searchType = type
        state.searchValue = value
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
      state.flowPrice = action.payload.flow
      state.ethPrice = action.payload.eth
    })
    builder.addMatcher(doopmarketeerApi.endpoints.getDoopmarket.matchFulfilled, (state, action) => {
      state.doopMarket = action.payload
    })
    builder.addMatcher(doopmarketeerApi.endpoints.getDoodleAssets.matchFulfilled, (state, action) => {
      const tokenId = action.meta.arg.originalArgs
      state.assets = {
        ...state.assets,
        [tokenId]: action.payload,
      }
    })
    builder.addMatcher(doopmarketeerApi.endpoints.getDooplicatiorAssets.matchFulfilled, (state, action) => {
      const tokenId = action.meta.arg.originalArgs
      state.dooplicatorAssets = {
        ...state.dooplicatorAssets,
        [tokenId]: action.payload,
      }
    })
    builder.addMatcher(doopmarketeerApi.endpoints.getUserDoops.matchFulfilled, (state, action) => {
      state.dooplications = action.payload
    })
    builder.addMatcher(doopmarketeerApi.endpoints.getUndoopedDooplicators.matchFulfilled, (state, action) => {
      state.undoopedDooplicators = action.payload
    })
    builder.addMatcher(doopmarketeerApi.endpoints.getUndoopedDoodles.matchFulfilled, (state, action) => {
      state.undoopedDoodles = [...state.undoopedDoodles, ...action.payload]
    })
    builder.addMatcher(doopmarketeerApi.endpoints.getLeaderboard.matchFulfilled, (state, action) => {
      state.leaderboard = action.payload
    })
    builder.addMatcher(doopmarketeerApi.endpoints.getFeed.matchFulfilled, (state, action) => {
      state.feed = getUniqueFeed([...action.payload, ...state.feed])
    })
    builder.addMatcher(doopmarketeerApi.endpoints.getHistory.matchFulfilled, (state, action) => {
      state.feed = getUniqueFeed([...state.feed, ...action.payload])
    })
  },
})

export const {
  setActiveMarketTab,
  setSearchParams,
  setSearchLoading,
  resetUndoopedDoodles,
  resetUndoopedDooplicators,
  setSearchType,
  setSearchValue,
  resetDooplications,
  setSortLeaderboard,
  resetFeed,
} = appSlice.actions

export const selectFeed = (state: RootState) => state.app.feed
export const selectLatestBlockNumber = (state: RootState) => {
  let blockNumber = 0
  if (state.app.feed.length > 0) {
    blockNumber = state.app.feed[0].blockNumber
  }
  return blockNumber
}
export const selectEthPrice = (state: RootState) => state.app.ethPrice
export const selectActiveMarketTab = (state: RootState) => state.app.activeMarketTab
export const selectTotalDoopmarket = (state: RootState) => state.app.doopMarket.length
export const selectSearchLoading = (state: RootState) => state.app.searchLoading
export const selectTotalDooplications = (state: RootState) => state.app.dooplications.length
export const selectDoodlesToLoad = (state: RootState) => [...state.app.dooplications.slice(5)]
export const selectSearchValue = (state: RootState) => state.app.searchValue
export const selectSearchType = (state: RootState) => state.app.searchType
export const selectLeaderboardLength = (state: RootState) => state.app.leaderboard.length
export const selectUndoopedDooplicators = (state: RootState) => state.app.undoopedDooplicators
export const selectLeaderboardTotals = (state: RootState) =>
  state.app.leaderboard.reduce(
    (acc, user) => {
      return {
        all: acc.all + user.dooplicate + user.dooplicateItem,
        dooplicator: acc.dooplicator + user.dooplicate,
        market: acc.market + user.dooplicateItem,
        volume: acc.volume + user.value,
      }
    },
    { all: 0, dooplicator: 0, market: 0, volume: 0 },
  )
export const selectLeaderboard = (state: RootState) => {
  const leaderboardSort: string = state.app.leaderboardSort
  const data = state.app.leaderboard
    .map((user: LeaderboardUser) => {
      const shortAddress = user.address.substring(0, 4) + '...' + user.address.substring(user.address.length - 4)

      return {
        ...user,
        totalDoops: user.dooplicate + user.dooplicateItem,
        shortAddress,
      }
    })
    .sort((a: LeaderboardUser | undefined, b: LeaderboardUser | undefined) => {
      if (!a || !b) {
        return 0
      }
      const propA = a[leaderboardSort as keyof LeaderboardUser]
      const propB = b[leaderboardSort as keyof LeaderboardUser]
      if (propA === undefined || propB === undefined) {
        return 0
      }
      if (propA > propB) {
        return -1
      }
      if (propA < propB) {
        return 1
      }
      return 0
    })

  return data.slice(0, 20)
}
export const selectTotalDoopCost = (state: RootState) =>
  state.app.dooplications.reduce((acc, item) => acc + Number(item.value), 0)

// type UserDoopAsset = { doop: DoopTransactionInfo; asset: Doodle }
// export const selectAllUserAssets = (state: RootState): UserDoopAsset[] => {
//   const data = state.app.dooplications
//   const assets = state.app.assets
//   const allAssets: UserDoopAsset[] = data.map((doop) => {
//     if (typeof assets[doop.tokenId] === 'undefined')
//       return {
//         doop: {} as DoopTransactionInfo,
//         asset: {} as Doodle,
//       }
//     return {
//       doop,
//       asset: assets[doop.tokenId],
//     }
//   })
//   return allAssets
// }
// export const getRarity = (state: RootState, dooplicatorId: string): number => {
//   let multiple = 1
//   if (dooplicatorId !== '') {
//     const doopData = state.app.dooplicatorAssets[dooplicatorId]
//     if (typeof doopData !== 'undefined') {
//       const trait = doopData.attributes.find((item) => item.trait_type === 'Rarity')
//       if (trait?.value === 'Rare') {
//         multiple = 3
//       } else if (trait?.value === 'Common') {
//         multiple = 2
//       } else if (trait?.value === 'Very Common') {
//         multiple = 1
//       }
//     }
//   }
//   return multiple
// }
// export const selectAllUserWearables = (state: RootState) => {
//   const allAssets = selectAllUserAssets(state)
//   const totalWearables = allAssets.reduce((acc: number, item: UserDoopAsset) => {
//     let multiple = 1
//     if (typeof item.doop.dooplicatorId !== 'undefined') {
//       multiple = getRarity(state, item.doop.dooplicatorId)
//     }
//     if (typeof item.asset.wearables !== 'undefined') {
//       acc += item.asset.wearables.length * multiple
//     }
//     return acc
//   }, 0)
//   return totalWearables
// }
export default appSlice.reducer

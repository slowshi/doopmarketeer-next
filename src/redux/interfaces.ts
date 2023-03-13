interface SetActiveMarketTabAction {
  payload: string
}

interface SetEthPriceAction {
  payload: number
}

interface SetFlowPriceAction {
  payload: number
}

interface SetSearchLoadingAction {
  payload: boolean
}

interface SetSearchTypeAction {
  payload: string
}

interface SetSearchValueAction {
  payload: string
}

interface SetAddressAction {
  payload: string
}

interface SetDoopMarketAction {
  payload: any[]
}

interface SetDooplicationsAction {
  payload: any[]
}

interface SetLeaderboardAction {
  payload: any[]
}

interface SortLeaderboardAction {
  payload: string
}

interface AddAssetsAction {
  payload: {
    tokenId: string
    data: any
  }
}

interface AddDooplicatorAssetsAction {
  payload: {
    tokenId: string
    data: any
  }
}

interface SetUndoopedDoodlesAction {
  payload: any[]
}

interface AppendUndoopedDoodlesAction {
  payload: any[]
}

interface SetUndoopedDooplicatorsAction {
  payload: any[]
}

interface SetFeedAction {
  payload: any[]
}

interface AppendFeedAction {
  payload: any[]
}

interface PrependFeedAction {
  payload: any[]
}

export type AppActions =
  | SetActiveMarketTabAction
  | SetEthPriceAction
  | SetFlowPriceAction
  | SetSearchLoadingAction
  | SetSearchTypeAction
  | SetSearchValueAction
  | SetAddressAction
  | SetDoopMarketAction
  | SetDooplicationsAction
  | SetLeaderboardAction
  | SortLeaderboardAction
  | AddAssetsAction
  | AddDooplicatorAssetsAction
  | SetUndoopedDoodlesAction
  | AppendUndoopedDoodlesAction
  | SetUndoopedDooplicatorsAction
  | SetFeedAction
  | AppendFeedAction
  | PrependFeedAction

export interface AppState {
  ethPrice: number
  flowPrice: number
  address: string
  searchValue: string
  searchType: string
  searchLoading: boolean
  dooplications: any[]
  doopMarket: any[]
  assets: Record<string, any>
  dooplicatorAssets: Record<string, any>
  leaderboard: any[]
  undoopedDoodles: any[]
  undoopedDooplicators: any[]
  feed: any[]
  activeMarketTab: string
  leaderboardSort: string
}

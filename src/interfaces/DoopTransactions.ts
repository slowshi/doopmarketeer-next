interface DecodedInfo {
  tokenId: number
  dooplicatorId: string
  addressOnTheOtherSide: string
  _data: string
}

interface DoopTransactionInfo {
  blockNumber: number
  timeStamp: number
  from: string
  hash: string
  to: string
  value: number
  gas: string
  gasPrice: string
  cumulativeGasUsed: string
  functionName: string
  tokenId: number
  dooplicatorId: string
  addressOnTheOtherSide?: string
}

interface DoopResponse {
  transactions: DoopTransactionInfo[]
  error?: string
}

interface LeaderboardUser {
  timeStamp: number
  address: string
  dooplicate: number
  dooplicateItem: number
  value: number
  totalDoops?: number
  shortAddress?: string
}
type LeaderboardMap = {
  [key: string]: LeaderboardUser
}
interface GenesisBoxHistoryResponse {
  results: DoopTransactionInfo[]
  total: number
}

export type {
  DecodedInfo,
  DoopTransactionInfo,
  DoopResponse,
  LeaderboardUser,
  LeaderboardMap,
  GenesisBoxHistoryResponse,
}

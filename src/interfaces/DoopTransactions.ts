interface DecodedInfo {
  tokenId: string
  dooplicatorId: string
  addressOnTheOtherSide: string
}

interface DoopTransactionInfo {
  blockNumber: number
  timeStamp: number
  from: string
  hash: string
  to: string
  value: string
  gas: string
  gasPrice: string
  cumulativeGasUsed: string
  functionName: string
  tokenId: string
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
}
type LeaderboardMap = {
  [key: string]: LeaderboardUser
}
export { DecodedInfo, DoopTransactionInfo, DoopResponse, LeaderboardUser, LeaderboardMap }

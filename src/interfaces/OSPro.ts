export interface OSData {
  address: string
  id: string
  collectionName: string
  imageUrl: string
  lastSale: {
    market: string
    from: string
    to: string
    basePrice: number
    baseAsset: {
      symbol: string
      decimals: number
      address: string
    }
    transactionHash: string
    timestamp: string
  }
  name: string
  standard: string
  rarityScore: number
  slug: string
  supportsWyvern: boolean
  pendingTrxs: any[]
  openRarityRank: number
  lastTransfer: {
    from: string
    to: string
    transactionHash: string
    timestamp: string
  }
  currentBasePrice: number
  currentEthPrice: number
  maker: string
  market: string
  orderCreatedAt: number
  paymentToken: {
    symbol: string
    decimals: number
    address: string
  }
  quantity: number
  duration: number
  expirationTime: number
  tokenId: string
  priceInfo: {
    price: string
    asset: string
    quantity: string
    pricePerItem: string
    decimals: number
  }
  url: string
}
export interface OSResponse {
  hasNext: boolean
  total: number
  data: OSData[]
}

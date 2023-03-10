interface GemResponse {
  _id: string
  id: string
  supportsWyvern: boolean
  currentBasePrice: number
  marketUrl: string
  paymentToken: {
    symbol: string
    decimals: number
    address: string
  }
  collectionName: string
  tokenId: number
  priceInfo: {
    price: string
    asset: string
    quantity: string
    pricePerItem: string
    decimals: number
  }
  url: string
}
interface BodyFilter {
  slug: string
  traits?: { [key: string]: string[] }
}
export type { GemResponse, BodyFilter }

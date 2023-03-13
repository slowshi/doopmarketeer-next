interface ActiveListing {
  vaultType: string
  price: number
}

interface MarketplaceNFT {
  editionID: string
  name: string
  description: string
  activeListing: ActiveListing | null
}

interface SearchMarketplaceNFTsResult {
  marketplaceNFTs: MarketplaceNFT[]
  totalResults: number
}

interface SearchMarketplaceNFTsResponse {
  searchMarketplaceNFTsV2: SearchMarketplaceNFTsResult
}
export type { SearchMarketplaceNFTsResponse }

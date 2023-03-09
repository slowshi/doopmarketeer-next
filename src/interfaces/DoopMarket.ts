interface DoopmarketListing {
  tokenId: string
  value: number
  timeStamp: number
  from: string
  dooplicatorId: string
  to: string
  functionName: string
}
type Listing = [string, [string, string, string], boolean]

export { DoopmarketListing, Listing }

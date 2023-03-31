import type { NextApiRequest, NextApiResponse } from 'next'
import { gql, request } from 'graphql-request'
import {
  DOODLE_METADATA_URL,
  DOOPLICATOR_WEARABLES_URL,
  assumedWearablesMap,
  UNKNOWN_WEARABLE,
} from '@/utils/constants'
import {
  DoodleAttribute,
  DoodleMetadata,
  Wearable,
  DooplicatorWearables,
  AssumedWearableInfo,
  Doodle,
  WearableCost,
} from '@/interfaces/Doodle'
import fetchGetWithRetry from '@/utils/fetchGetWithRetry'
import { SearchMarketplaceNFTsResponse } from '@/interfaces/OnGaia'

export default async function userHandler(req: NextApiRequest, res: NextApiResponse<Doodle | { error: string }>) {
  const { query } = req
  const tokenId = (query.id as string) || ''

  if (tokenId === '') {
    res.json({ error: 'No tokenId found' })
    return
  }

  const doodleResponse = (await fetchGetWithRetry(`${DOODLE_METADATA_URL}/${tokenId}`)) as DoodleMetadata
  const wearablesResponse = (await fetchGetWithRetry(`${DOOPLICATOR_WEARABLES_URL}/${tokenId}`)) as DooplicatorWearables
  const assumed = doodleResponse.attributes.reduce((acc: AssumedWearableInfo[], item: DoodleAttribute) => {
    let ids = assumedWearablesMap[item.value]
    if (typeof ids === 'undefined') ids = []
    return [...acc, ...ids]
  }, [])
  let assumedIndex = 0
  const wearables = wearablesResponse.wearables.map((wearable: Wearable) => {
    if (typeof wearable.id === 'undefined') {
      if (assumedIndex < assumed.length) {
        const assumedWearable = assumed[assumedIndex]
        assumedIndex++
        return {
          ...assumedWearable,
        }
      } else {
        return {
          image_uri: UNKNOWN_WEARABLE,
        }
      }
    }
    return wearable
  })

  const gq = gql`
    query SearchMarketplaceNFTs($input: SearchMarketplaceNFTsInputV2!) {
      searchMarketplaceNFTsV2(input: $input) {
        marketplaceNFTs {
          editionID
          name
          description
          activeListing {
            vaultType
            price
          }
        }
        totalResults
      }
    }
  `
  const costPromises: Promise<SearchMarketplaceNFTsResponse>[] = wearables.reduce((acc, item) => {
    if (typeof item.id !== 'undefined') {
      const collectionId = item.id !== 244 ? 'doodleswearables' : 'doodlesbetapass'
      const variables = {
        input: {
          collectionID: collectionId,
          editionID: item.id.toString(),
          forSale: true,
          limit: 1,
          orderBy: 'price_asc',
        },
      }
      acc.push(request('https://api-v2.ongaia.com/graphql/', gq, variables))
    }
    return acc
  }, [] as Promise<SearchMarketplaceNFTsResponse>[])

  const costs: SearchMarketplaceNFTsResponse[] = await Promise.all(costPromises)

  // console.log(costs)
  const costResponse: WearableCost[] = costs.map(
    (cost: SearchMarketplaceNFTsResponse) => cost.searchMarketplaceNFTsV2.marketplaceNFTs[0] as WearableCost,
  )

  res.status(200).json({
    ...doodleResponse,
    wearables,
    costs: costResponse,
  })
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { gql, request } from 'graphql-request'
import { UNKNOWN_WEARABLE, GENESIS_BOX_WEARABLES_URL } from '@/utils/constants'
import { GenesisBox, GenesisBoxMetadata, Wearable, WearableCost } from '@/interfaces/Doodle'
import fetchGetWithRetry from '@/utils/fetchGetWithRetry'
import { SearchMarketplaceNFTsResponse } from '@/interfaces/OnGaia'

export default async function userHandler(req: NextApiRequest, res: NextApiResponse<GenesisBox | { error: string }>) {
  const { query } = req
  const tokenId = (query.id as string) || ''

  if (tokenId === '') {
    res.json({ error: 'No tokenId found' })
    return
  }
  const wearablesResponse = (await fetchGetWithRetry(`${GENESIS_BOX_WEARABLES_URL}/${tokenId}`)) as GenesisBoxMetadata
  let wearables = wearablesResponse.data.wearables as Wearable[]
  if (wearables.length === 0) {
    wearables = [
      {
        id: 244,
        name: 'beta pass',
        trim: '',
        set: 'Doodlebot',
        set_type: 'Utility',
        body_position: '',
        layer: '',
        plurality: 'FALSE',
        ipfs_hash_svg: 'Qmdsq27zMFJiZiertMg5nAJp9mbS9sRKhDYo1kPgfFwhdM',
        image_uri:
          'https://core-storage.dev.doodles.app/wearables/final/Qmdsq27zMFJiZiertMg5nAJp9mbS9sRKhDYo1kPgfFwhdM.svg',
      },
      {
        image_uri: UNKNOWN_WEARABLE,
      },
      {
        image_uri: UNKNOWN_WEARABLE,
      },
      {
        image_uri: UNKNOWN_WEARABLE,
      },
      {
        image_uri: UNKNOWN_WEARABLE,
      },
    ]
  }
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
  const costResponse: WearableCost[] = costs.map(
    (cost: SearchMarketplaceNFTsResponse) => cost.searchMarketplaceNFTsV2.marketplaceNFTs[0] as WearableCost,
  )

  res.status(200).json({
    wearables,
    costs: costResponse,
  })
}

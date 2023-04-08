import type { NextApiRequest, NextApiResponse } from 'next'
import { OSData, OSResponse } from '@/interfaces/OSPro'
import fetchGetWithRetry from '@/utils/fetchGetWithRetry'

export default async function handler(req: NextApiRequest, res: NextApiResponse<OSData[]>) {
  let rarity: number = Number(req.query['rarity']) || 0

  if (rarity < 0) {
    rarity = 0
  } else if (rarity > 2) {
    rarity = 2
  }
  const rarityMap = ['very common', 'common', 'rare']

  const baseUrl = 'https://api.pro.opensea.io/collections/the-dooplicator/assets'

  const queryParams = new URLSearchParams({
    offset: '0',
    limit: '5',
    'filters[traits][Rarity][]': rarityMap[rarity],
    'filters[traits][OG Wearables charge][]': 'available',
    [`sort[currentEthPrice]`]: 'asc',
    'status[]': 'buy_now',
  })

  const url = `${baseUrl}?${queryParams.toString()}`
  const response = (await fetchGetWithRetry(url)) as OSResponse
  res.status(200).json(response.data)
}

import type { NextApiRequest, NextApiResponse } from 'next'
import getGemAssets from '@/utils/getGemAssets'
import { GemResponse } from '@/interfaces/Gem'

export default async function handler(req: NextApiRequest, res: NextApiResponse<GemResponse[]>) {
  let rarity: number = Number(req.query['rarity']) || 0

  if (rarity < 0) {
    rarity = 0
  } else if (rarity > 2) {
    rarity = 2
  }
  const rarityMap = ['very common', 'common', 'rare']
  const filters = {
    slug: 'the-dooplicator',
    traits: {
      Rarity: [`${rarityMap[rarity]}`],
      'OG Wearables charge': ['available'],
    },
  }
  const response = await getGemAssets(filters)

  res.status(200).json(response)
}

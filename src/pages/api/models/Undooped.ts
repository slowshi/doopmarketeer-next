import { UndoopedDoodle } from '@/interfaces/Undooped'
import { GemResponse } from '@/interfaces/Gem'
import { Wearable, DooplicatorWearables } from '@/interfaces/Doodle'
import { cacheFetch } from '@/utils/cacheFetch'
import { DOOPLICATOR_WEARABLES_URL } from '@/utils/constants'
import { getGemAssets } from './Gem'

const getUndoopedDoodles = async (page: number, limit = 20): Promise<UndoopedDoodle[]> => {
  const filters = {
    slug: 'doodles-official',
  }
  const response = await getGemAssets(filters, page, limit)
  let undooped: UndoopedDoodle[] = []
  for (let i = 0; i < response.length; i++) {
    const { tokenId, marketUrl, currentBasePrice, supportsWyvern } = response[i]
    const wearablesResponse = (await cacheFetch(`${DOOPLICATOR_WEARABLES_URL}/${tokenId}`)) as DooplicatorWearables
    const isDooplicated =
      wearablesResponse.wearables.filter((wearable: Wearable) => typeof wearable.wearable_id === 'undefined').length ===
      0
    if (!isDooplicated) {
      undooped = [...undooped, { tokenId, marketUrl, currentBasePrice, supportsWyvern }]
    }
  }
  return undooped
}

const getUndoopedDooplicator = async (rarity: number): Promise<GemResponse[]> => {
  const rarityMap = ['very common', 'common', 'rare']
  const filters = {
    slug: 'the-dooplicator',
    traits: {
      Rarity: [`${rarityMap[rarity]}`],
      'OG Wearables charge': ['available'],
    },
  }
  const response = await getGemAssets(filters)
  return response
}

export { getUndoopedDoodles, getUndoopedDooplicator }

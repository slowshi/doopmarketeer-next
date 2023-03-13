import type { NextApiRequest, NextApiResponse } from 'next'
import getGemAssets from '@/utils/getGemAssets'
import { UndoopedDoodle } from '@/interfaces/Undooped'
import { Wearable, DooplicatorWearables } from '@/interfaces/Doodle'
import { DOOPLICATOR_WEARABLES_URL } from '@/utils/constants'
import fetchGetWithRetry from '@/utils/fetchGetWithRetry'

export default async function handler(req: NextApiRequest, res: NextApiResponse<UndoopedDoodle[]>) {
  const limit: number = Number(req.query['limit']) || 20
  let page: number = Number(req.query['page']) || 1
  if (page < 1) {
    page = 1
  }

  const filters = {
    slug: 'doodles-official',
  }
  const response = await getGemAssets(filters, page, limit)
  let undooped: UndoopedDoodle[] = []
  for (let i = 0; i < response.length; i++) {
    const { tokenId, marketUrl, currentBasePrice, supportsWyvern } = response[i]
    const wearablesResponse = (await fetchGetWithRetry(
      `${DOOPLICATOR_WEARABLES_URL}/${tokenId}`,
    )) as DooplicatorWearables
    const isDooplicated =
      wearablesResponse.wearables.filter((wearable: Wearable) => typeof wearable.wearable_id === 'undefined').length ===
      0
    if (!isDooplicated) {
      undooped = [...undooped, { tokenId, marketUrl, currentBasePrice, supportsWyvern }]
    }
  }
  res.status(200).json(undooped)
}

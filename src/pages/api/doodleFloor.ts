import type { NextApiRequest, NextApiResponse } from 'next'
import getGemAssets from '@/utils/getGemAssets'
import { UndoopedDoodle } from '@/interfaces/Undooped'
import { Wearable, DooplicatorWearables } from '@/interfaces/Doodle'
import { DOOPLICATOR_WEARABLES_URL } from '@/utils/constants'
import fetchGetWithRetry from '@/utils/fetchGetWithRetry'
import { OSResponse } from '@/interfaces/OSPro'

export default async function handler(req: NextApiRequest, res: NextApiResponse<UndoopedDoodle[]>) {
  const limit: number = Number(req.query['limit']) || 20
  let page: number = Number(req.query['page']) || 1
  if (page < 1) {
    page = 1
  }

  const response = (await fetchGetWithRetry(
    `https://api.pro.opensea.io/collections/doodles-official/assets?offset=${
      (page - 1) * limit
    }&limit=20&sort%5BcurrentEthPrice%5D=asc&status%5B%5D=buy_now`,
  )) as OSResponse

  let undooped: UndoopedDoodle[] = []
  const data = response.data
  for (let i = 0; i < data.length; i++) {
    const { id, imageUrl, currentBasePrice, supportsWyvern } = data[i]
    const wearablesResponse = (await fetchGetWithRetry(`${DOOPLICATOR_WEARABLES_URL}/${id}`)) as DooplicatorWearables
    const isDooplicated =
      wearablesResponse.wearables.filter((wearable: Wearable) => typeof wearable.id === 'undefined').length === 0
    if (!isDooplicated) {
      undooped = [...undooped, { tokenId: Number(id), marketUrl: imageUrl, currentBasePrice, supportsWyvern }]
    }
  }
  res.status(200).json(undooped)
}

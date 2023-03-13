import type { NextApiRequest, NextApiResponse } from 'next'
import { DOOPLICATOR_URL } from '@/utils/constants'
import { DoodleMetadata } from '@/interfaces/Doodle'
import fetchGetWithRetry from '@/utils/fetchGetWithRetry'

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<DoodleMetadata | { error: string }>,
) {
  const { query } = req
  const tokenId = (query.id as string) || ''

  if (tokenId === '') {
    res.status(400).json({ error: 'No tokenId found' })
    return
  }

  const response = (await fetchGetWithRetry(`${DOOPLICATOR_URL}/${tokenId}`)) as DoodleMetadata

  res.status(200).json(response)
}

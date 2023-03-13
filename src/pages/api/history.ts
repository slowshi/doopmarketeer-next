import type { NextApiRequest, NextApiResponse } from 'next'

import { DOOPLICATOR_ADDRESS, DOOPMARKET_ADDRESS } from '../../utils/constants'
import { contractTransactions } from '../../utils/etherscanUtils'
import { Transaction } from '../../interfaces/Etherscan'
import { DoopTransactionInfo } from '../../interfaces/DoopTransactions'
import formatTransactionResponse from '../../utils/formatTransactionResponse'

export default async function handler(req: NextApiRequest, res: NextApiResponse<DoopTransactionInfo[]>) {
  const { query } = req
  const limit: number = Number(query['limit']) || 5
  let page: number = Number(query['page']) || 1
  if (page < 1) {
    page = 1
  }
  const doopResponse = await contractTransactions(DOOPLICATOR_ADDRESS)
  const marketResponse = await contractTransactions(DOOPMARKET_ADDRESS)
  const doopResults: Transaction[] = doopResponse.result
  const marketResults: Transaction[] = marketResponse.result
  const transactions: DoopTransactionInfo[] = formatTransactionResponse([...doopResults, ...marketResults])
  const results = transactions.slice((page - 1) * limit, limit * page)

  res.status(200).json(results)
}

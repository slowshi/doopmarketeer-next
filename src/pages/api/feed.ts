import type { NextApiRequest, NextApiResponse } from 'next'

import { DOOPLICATION_BLOCK, DOOPLICATOR_ADDRESS, DOOPMARKET_ADDRESS } from '../../utils/constants'
import { contractTransactions } from '../../utils/etherscanUtils'
import { Transaction } from '../../interfaces/Etherscan'
import { DoopTransactionInfo } from '../../interfaces/DoopTransactions'
import formatTransactionResponse from '../../utils/formatTransactionResponse'

export default async function handler(req: NextApiRequest, res: NextApiResponse<DoopTransactionInfo[]>) {
  const { query } = req
  const startBlock: number = Number(query['startBlock']) || DOOPLICATION_BLOCK
  const doopResponse = await contractTransactions(DOOPLICATOR_ADDRESS, 1, 100, startBlock + 1)
  const marketResponse = await contractTransactions(DOOPMARKET_ADDRESS, 1, 100, startBlock + 1)
  const doopResults: Transaction[] = doopResponse.result
  const marketResults: Transaction[] = marketResponse.result
  const transactions: DoopTransactionInfo[] = formatTransactionResponse([...doopResults, ...marketResults])
  res.status(200).json(transactions)
}

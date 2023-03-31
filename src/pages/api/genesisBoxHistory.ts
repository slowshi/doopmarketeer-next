import type { NextApiRequest, NextApiResponse } from 'next'

import { GENESIS_BOX_OPENER_ADDRESS } from '../../utils/constants'
import { contractInternalTransactions } from '../../utils/etherscanUtils'
import { GenesisBoxTransactionEvent } from '../../interfaces/Etherscan'
import { GenesisBoxTransactionInfo } from '../../interfaces/DoopTransactions'
import formatGenesisBoxTransactionResponse from '@/utils/formatGenesisBoxTransactionResponse'

export default async function handler(req: NextApiRequest, res: NextApiResponse<GenesisBoxTransactionInfo[]>) {
  const { query } = req
  const limit: number = Number(query['limit']) || 5
  let page: number = Number(query['page']) || 1
  if (page < 1) {
    page = 1
  }
  const genBoxOpenerResponse = await contractInternalTransactions(GENESIS_BOX_OPENER_ADDRESS)
  const genBoxResults: GenesisBoxTransactionEvent[] = genBoxOpenerResponse.result
  const transactions: GenesisBoxTransactionInfo[] = formatGenesisBoxTransactionResponse(genBoxResults)
  const results = transactions.slice((page - 1) * limit, limit * page)

  res.status(200).json(results)
}

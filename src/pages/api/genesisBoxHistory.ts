import type { NextApiRequest, NextApiResponse } from 'next'

import { GENESIS_BOX_BLOCK, GENESIS_BOX_OPENER_ADDRESS } from '../../utils/constants'
import { contractInternalTransactions } from '../../utils/etherscanUtils'
import { GenesisBoxTransactionEvent } from '../../interfaces/Etherscan'
import { GenesisBoxHistoryResponse, DoopTransactionInfo } from '../../interfaces/DoopTransactions'
import formatGenesisBoxTransactionResponse from '@/utils/formatGenesisBoxTransactionResponse'
const getBoxTransactions = async (): Promise<DoopTransactionInfo[]> => {
  let allResults: GenesisBoxTransactionEvent[] = []
  let newResults: GenesisBoxTransactionEvent[] = []
  let lastBlockNumber = GENESIS_BOX_BLOCK
  while (newResults.length > 0 || lastBlockNumber === GENESIS_BOX_BLOCK) {
    const res = await contractInternalTransactions(GENESIS_BOX_OPENER_ADDRESS, 1, 9999, lastBlockNumber)
    if (Array.isArray(res.result)) {
      if (lastBlockNumber === Number(res.result[res.result.length - 1].blockNumber)) {
        newResults = []
      } else {
        lastBlockNumber = Number(res.result[res.result.length - 1].blockNumber)
        newResults = res.result
        allResults = [...allResults, ...newResults]
      }
    } else {
      newResults = []
    }
  }
  const transactions: DoopTransactionInfo[] = formatGenesisBoxTransactionResponse(allResults)

  return transactions
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<GenesisBoxHistoryResponse>) {
  const { query } = req
  const limit: number = Number(query['limit']) || 5
  let page: number = Number(query['page']) || 1
  if (page < 1) {
    page = 1
  }
  const transactions = await getBoxTransactions()
  const results = transactions.slice((page - 1) * limit, limit * page)

  res.status(200).json({ results, total: transactions.length })
}

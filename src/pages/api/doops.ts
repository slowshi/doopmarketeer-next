import type { NextApiRequest, NextApiResponse } from 'next'

import { Transaction } from '../../interfaces/Etherscan'
import { DoopResponse, DoopTransactionInfo } from '../../interfaces/DoopTransactions'
import formatTransactionResponse from '../../utils/formatTransactionResponse'
import { resolveENS } from '../../utils/ethersUtils'
import { userTransactions } from '../../utils/etherscanUtils'

const getDoops = async (address: string): Promise<DoopResponse> => {
  let allResults: Transaction[] = []
  let newResults: Transaction[] = []
  let page = 1
  while (newResults.length > 0 || page === 1) {
    const res = await userTransactions(address, page)
    newResults = res.result
    allResults = [...allResults, ...newResults]
    page++
  }
  const transactions: DoopTransactionInfo[] = formatTransactionResponse(allResults)

  return { transactions }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DoopTransactionInfo[] | { error: string }>,
) {
  const { query } = req
  const address: string = query['address']?.toString() || ''
  if (address === '') {
    res.status(400).json({ error: 'No address found' })
    return
  }
  if (address.includes('.eth')) {
    const fullAddress: string | null = await resolveENS(address)
    if (fullAddress === null) {
      res.status(400).json({ error: 'No address found' })
      return
    }
    const results = await getDoops(fullAddress)
    res.status(200).json(results.transactions)
  } else {
    const results = await getDoops(address)
    res.status(200).json(results.transactions)
  }
}

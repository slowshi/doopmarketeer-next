import type { NextApiRequest, NextApiResponse } from 'next'

import { GENESIS_BOX_BLOCK, GENESIS_BOX_OPENER_ADDRESS } from '../../utils/constants'
import { contractInternalTransactions } from '../../utils/etherscanUtils'
import { GenesisBoxTransactionEvent } from '../../interfaces/Etherscan'
import { GenesisBoxTransactionInfo } from '../../interfaces/DoopTransactions'
import formatGenesisBoxTransactionResponse from '@/utils/formatGenesisBoxTransactionResponse'

export default async function handler(req: NextApiRequest, res: NextApiResponse<GenesisBoxTransactionInfo[]>) {
  const { query } = req
  const startBlock: number = Number(query['startBlock']) || GENESIS_BOX_BLOCK
  const genBoxOpenerResponse = await contractInternalTransactions(GENESIS_BOX_OPENER_ADDRESS, 1, 200, startBlock + 1)
  const genBoxResults: GenesisBoxTransactionEvent[] = genBoxOpenerResponse.result
  const transactions: GenesisBoxTransactionInfo[] = formatGenesisBoxTransactionResponse(genBoxResults)
  res.status(200).json(transactions)
}

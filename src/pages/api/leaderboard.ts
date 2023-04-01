import type { NextApiRequest, NextApiResponse } from 'next'

import { DOOPLICATOR_ADDRESS, DOOPMARKET_ADDRESS, GENESIS_BOX_OPENER_ADDRESS } from '@/utils/constants'
import { contractInternalTransactions, contractTransactions } from '@/utils/etherscanUtils'
import { GenesisBoxTransactionEvent, Transaction } from '@/interfaces/Etherscan'
import { DoopTransactionInfo, LeaderboardMap, LeaderboardUser } from '@/interfaces/DoopTransactions'
import formatGenesisBoxTransactionResponse from '@/utils/formatGenesisBoxTransactionResponse'
import formatTransactionResponse from '@/utils/formatTransactionResponse'

export default async function handler(req: NextApiRequest, res: NextApiResponse<LeaderboardUser[]>) {
  const doopResponse = await contractTransactions(DOOPLICATOR_ADDRESS)
  const marketResponse = await contractTransactions(DOOPMARKET_ADDRESS)
  const genBoxOpenerResponse = await contractInternalTransactions(GENESIS_BOX_OPENER_ADDRESS)
  const genBoxResults: GenesisBoxTransactionEvent[] = genBoxOpenerResponse.result
  const genesisBoxTransactions: DoopTransactionInfo[] = formatGenesisBoxTransactionResponse(genBoxResults)

  const doopResults: Transaction[] = doopResponse.result
  const marketResults: Transaction[] = marketResponse.result
  const transactions: DoopTransactionInfo[] = formatTransactionResponse([...doopResults, ...marketResults])

  const leaderboard: LeaderboardMap = [...transactions, ...genesisBoxTransactions].reduce(
    (acc: LeaderboardMap, item: DoopTransactionInfo) => {
      let user: LeaderboardUser = {
        timeStamp: 0,
        address: '',
        dooplicate: 0,
        genesisBox: 0,
        dooplicateItem: 0,
        value: 0,
      }
      const isDooplicate = item.functionName === 'dooplicateItem'
      const isDooplicateItem = item.functionName === 'dooplicate'
      const isSafeTransferFrom = item.functionName === 'safeTransferFrom'
      if (typeof acc[item.from] === 'undefined') {
        user = {
          timeStamp: Number(item.timeStamp),
          address: item.from,
          dooplicate: isDooplicate ? 1 : 0,
          dooplicateItem: isDooplicateItem ? 1 : 0,
          genesisBox: isSafeTransferFrom ? 1 : 0,
          value: Number(item.value),
        }
      } else {
        const existingUser: LeaderboardUser = acc[item.from]
        const itemTimestamp = Number(item.timeStamp)
        user = {
          ...existingUser,
          timeStamp: existingUser.timeStamp >= itemTimestamp ? existingUser.timeStamp : itemTimestamp,
          value: Number(existingUser.value) + Number(item.value),
          dooplicate: isDooplicate ? existingUser.dooplicate + 1 : existingUser.dooplicate,
          dooplicateItem: isDooplicateItem ? existingUser.dooplicateItem + 1 : existingUser.dooplicateItem,
          genesisBox: isSafeTransferFrom ? existingUser.genesisBox + 1 : existingUser.genesisBox,
        }
      }
      acc = {
        ...acc,
        [item.from]: user,
      }
      return acc
    },
    {} as LeaderboardMap,
  )
  res.status(200).json(Object.values(leaderboard))
}

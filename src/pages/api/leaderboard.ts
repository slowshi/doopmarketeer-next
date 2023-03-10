import type { NextApiRequest, NextApiResponse } from 'next'

import { DOOPLICATOR_ADDRESS, DOOPMARKET_ADDRESS } from '@/utils/constants'
import { contractTransactions } from '@/utils/etherscanUtils'
import { Transaction } from '@/interfaces/Etherscan'
import { LeaderboardMap, LeaderboardUser } from '@/interfaces/DoopTransactions'

export default async function handler(req: NextApiRequest, res: NextApiResponse<LeaderboardUser[]>) {
  const doopResponse = await contractTransactions(DOOPLICATOR_ADDRESS)
  const marketResponse = await contractTransactions(DOOPMARKET_ADDRESS)
  const doopResults: Transaction[] = doopResponse.result
  const marketResults: Transaction[] = marketResponse.result
  const transactions: LeaderboardMap = [...doopResults, ...marketResults]
    .filter((transaction: Transaction) => {
      return (
        [DOOPMARKET_ADDRESS, DOOPLICATOR_ADDRESS].indexOf(transaction.to) > -1 &&
        transaction.functionName.substring(0, 10) === 'dooplicate' &&
        transaction.isError === '0'
      )
    })
    .reduce((acc: LeaderboardMap, item: Transaction) => {
      let user: LeaderboardUser = {
        timeStamp: 0,
        address: '',
        dooplicate: 0,
        dooplicateItem: 0,
        value: 0,
      }
      const isDoopmarket = item.functionName.substring(0, 14) === 'dooplicateItem'
      if (typeof acc[item.from] === 'undefined') {
        user = {
          timeStamp: Number(item.timeStamp),
          address: item.from,
          dooplicate: !isDoopmarket ? 1 : 0,
          dooplicateItem: isDoopmarket ? 1 : 0,
          value: Number(item.value),
        }
      } else {
        const existingUser: LeaderboardUser = acc[item.from]
        const itemTimestamp = Number(item.timeStamp)
        user = {
          ...existingUser,
          timeStamp: existingUser.timeStamp >= itemTimestamp ? existingUser.timeStamp : itemTimestamp,
          value: Number(existingUser.value) + Number(item.value),
          dooplicate: !isDoopmarket ? existingUser.dooplicate + 1 : existingUser.dooplicate,
          dooplicateItem: isDoopmarket ? existingUser.dooplicateItem + 1 : existingUser.dooplicateItem,
        }
      }
      acc = {
        ...acc,
        [item.from]: user,
      }
      return acc
    }, {} as LeaderboardMap)
  res.status(200).json(Object.values(transactions))
}

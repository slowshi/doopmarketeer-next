import { GenesisBoxTransactionEvent } from '@/interfaces/Etherscan'
import { BURN_ADDRESS } from './constants'
import { DoopTransactionInfo } from '../interfaces/DoopTransactions'
export default function formatGenesisBoxTransactionResponse(
  transactions: GenesisBoxTransactionEvent[],
): DoopTransactionInfo[] {
  return transactions
    .filter((transaction: GenesisBoxTransactionEvent) => {
      return transaction.to !== BURN_ADDRESS && transaction.tokenID !== '0'
    })
    .map((transaction) => {
      return {
        blockNumber: Number(transaction.blockNumber),
        timeStamp: Number(transaction.timeStamp),
        from: transaction.from,
        hash: transaction.hash,
        gas: transaction.gas,
        to: transaction.to,
        gasPrice: transaction.gasPrice,
        value: 0,
        addressOnTheOtherSide: '',
        functionName: 'safeTransferFrom',
        dooplicatorId: '',
        cumulativeGasUsed: transaction.cumulativeGasUsed,
        tokenId: Number(transaction.tokenID),
      }
    })
    .sort((a: { blockNumber: number }, b: { blockNumber: number }) => {
      if (a['blockNumber'] > b['blockNumber']) {
        return -1
      }
      if (a['blockNumber'] < b['blockNumber']) {
        return 1
      }
      return 0
    })
}

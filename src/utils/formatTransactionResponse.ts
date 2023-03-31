import { Decoder } from 'ts-abi-decoder'
import { Transaction } from '@/interfaces/Etherscan'
import { DOOPLICATOR_ADDRESS, DOOPMARKET_ADDRESS, doopContracts, GENESIS_BOX_ADDRESS } from './constants'
import { DecodedInfo, DoopTransactionInfo } from '../interfaces/DoopTransactions'
export default function formatTransactionResponse(transactions: Transaction[]): DoopTransactionInfo[] {
  Decoder.addABI(doopContracts[DOOPMARKET_ADDRESS])
  Decoder.addABI(doopContracts[DOOPLICATOR_ADDRESS])
  Decoder.addABI(doopContracts[GENESIS_BOX_ADDRESS])

  return transactions
    .filter((transaction: Transaction) => {
      return (
        (transaction.isError === '0' &&
          [DOOPMARKET_ADDRESS, DOOPLICATOR_ADDRESS].indexOf(transaction.to) > -1 &&
          transaction.functionName.substring(0, 10) === 'dooplicate') ||
        (transaction.to === GENESIS_BOX_ADDRESS && transaction.functionName.substring(0, 16) === 'safeTransferFrom')
      )
    })
    .map((transaction) => {
      const decodedData = Decoder.decodeData(transaction.input)
      const info = [...decodedData.params].reduce((acc, param): DecodedInfo => {
        const names = ['tokenId', 'dooplicatorId', 'addressOnTheOtherSide', '_data']
        if (names.indexOf(param.name) > -1) {
          acc = {
            ...acc,
            [param.name]: param.value,
          }
        }
        return acc
      }, {} as DecodedInfo)

      return {
        blockNumber: Number(transaction.blockNumber),
        timeStamp: Number(transaction.timeStamp),
        from: transaction.from,
        hash: transaction.hash,
        value: transaction.value,
        gas: transaction.gas,
        to: transaction.to,
        gasPrice: transaction.gasPrice,
        cumulativeGasUsed: transaction.cumulativeGasUsed,
        functionName: decodedData?.name,
        tokenId: info.tokenId,
        dooplicatorId: info.dooplicatorId,
        addressOnTheOtherSide: decodedData?.name === 'safeTransferFrom' ? info._data : info.addressOnTheOtherSide,
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

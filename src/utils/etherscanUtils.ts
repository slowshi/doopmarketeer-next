import { getBlockNumber } from './ethersUtils'
import { DOOPLICATION_BLOCK } from './constants'
import { TransactionResponse } from '@/interfaces/Etherscan'
import fetchGetWithRetry from './fetchGetWithRetry'

const userTransactions = async (address: string, page = 1): Promise<TransactionResponse> => {
  const blockNumber = await getBlockNumber()
  const url = `https://api.etherscan.io/api?${new URLSearchParams({
    module: 'account',
    action: 'txlist',
    address: address,
    startblock: DOOPLICATION_BLOCK.toString(),
    endblock: blockNumber.toString(),
    page: page.toString(),
    offset: '100',
    apikey: process.env.ETHERSCAN_API_KEY || '',
  })}`
  const res = await fetchGetWithRetry(url)

  return res as TransactionResponse
}

const contractTransactions = async (
  address: string,
  page = 1,
  offset = 10000,
  startBlock = DOOPLICATION_BLOCK,
): Promise<TransactionResponse> => {
  const blockNumber = await getBlockNumber()
  const url = `https://api.etherscan.io/api?${new URLSearchParams({
    module: 'account',
    action: 'txlist',
    address: address,
    startblock: startBlock.toString(),
    endblock: blockNumber.toString(),
    page: page.toString(),
    offset: offset.toString(),
    apikey: process.env.ETHERSCAN_API_KEY || '',
  })}`
  const res = await fetchGetWithRetry(url)

  return res as TransactionResponse
}

export { userTransactions, contractTransactions }

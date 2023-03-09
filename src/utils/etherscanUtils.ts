import { getBlockNumber } from './ethersUtils'
import { DOOPLICATION_BLOCK } from './constants'
import { TransactionResponse } from '@/interfaces/Etherscan'
import fetchGetWithRetry from './fetchGetWithRetry'

const userTransactions = async (address: string, page = 1): Promise<TransactionResponse> => {
  const blockNumber = await getBlockNumber()
  const params = {
    module: 'account',
    action: 'txlist',
    address,
    startblock: DOOPLICATION_BLOCK,
    endblock: blockNumber,
    page,
    offset: 100,
    apikey: process.env.ETHERSCAN_API_KEY,
  }
  const paramsObject = Object.fromEntries(Array.from(Object.entries(params)))
  const url = `https://api.etherscan.io/api?${new URLSearchParams(paramsObject)}`
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
  const params = {
    module: 'account',
    action: 'txlist',
    address,
    startblock: startBlock,
    endblock: blockNumber,
    page,
    offset,
    apikey: process.env.ETHERSCAN_API_KEY,
  }
  const paramsObject = Object.fromEntries(Array.from(Object.entries(params)))
  const url = `https://api.etherscan.io/api?${new URLSearchParams(paramsObject)}`
  const res = await fetchGetWithRetry(url)

  return res as TransactionResponse
}

export { userTransactions, contractTransactions }

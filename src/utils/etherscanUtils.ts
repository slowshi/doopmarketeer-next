import { getBlockNumber } from './ethersUtils'
import { BURN_ADDRESS, DOOPLICATION_BLOCK, GENESIS_BOX_ADDRESS, GENESIS_BOX_BLOCK } from './constants'
import { TransactionResponse, GenesisBoxTransactionResponse } from '@/interfaces/Etherscan'
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

const contractInternalTransactions = async (
  address: string,
  page = 1,
  offset = 10000,
  startBlock = GENESIS_BOX_BLOCK,
): Promise<GenesisBoxTransactionResponse> => {
  const blockNumber = await getBlockNumber()
  const url = `https://api.etherscan.io/api?${new URLSearchParams({
    module: 'account',
    address: address,
    constractaddress: GENESIS_BOX_ADDRESS,
    action: 'tokennfttx',
    startblock: startBlock.toString(),
    endblock: blockNumber.toString(),
    page: page.toString(),
    offset: offset.toString(),
    apikey: process.env.ETHERSCAN_API_KEY || '',
  })}`
  const res = await fetchGetWithRetry(url)

  return res as GenesisBoxTransactionResponse
}
export { userTransactions, contractTransactions, contractInternalTransactions }

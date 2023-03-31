interface TransactionResponse {
  status: string
  message: string
  result: Transaction[]
}
interface GenesisBoxTransactionResponse {
  status: string
  message: string
  result: GenesisBoxTransactionEvent[]
}
interface Transaction {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: number
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddress: string
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
  methodId: string
  functionName: string
}
interface GenesisBoxTransactionEvent {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  from: string
  contractAddress: string
  to: string
  tokenID: string
  tokenName: string
  tokenSymbol: string
  tokenDecimal: string
  transactionIndex: string
  gas: string
  gasPrice: string
  gasUsed: string
  cumulativeGasUsed: string
  input: string
  confirmations: string
}
interface UserTransactionParams {
  module: string
  action: string
  address: string
  startblock: number
  endblock: number
  page: number
  offset: number
  apikey: string | undefined
}

export type {
  TransactionResponse,
  Transaction,
  UserTransactionParams,
  GenesisBoxTransactionEvent,
  GenesisBoxTransactionResponse,
}

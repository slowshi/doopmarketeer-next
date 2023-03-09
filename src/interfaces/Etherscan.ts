interface TransactionResponse {
  status: string
  message: string
  result: Transaction[]
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
  value: string
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

export { TransactionResponse, Transaction, UserTransactionParams }

import { ethers, JsonRpcProvider, Contract } from 'ethers'
import { ETHEREUM_RPC_URL } from './constants'

const resolveENS = async (name: string) => {
  const provider = new JsonRpcProvider(ETHEREUM_RPC_URL)
  return await provider.resolveName(name)
}

const getBlockNumber = async () => {
  const provider = new JsonRpcProvider(ETHEREUM_RPC_URL)
  return await provider.getBlockNumber()
}

const getContrat = async (contract: string, abi: ethers.InterfaceAbi) => {
  const provider = new JsonRpcProvider(ETHEREUM_RPC_URL)
  const doopmarketContract = new Contract(contract, abi, provider)
  return doopmarketContract
}
export { resolveENS, getBlockNumber, getContrat }

import { ethers, JsonRpcProvider, Contract, formatUnits } from 'ethers'
import { ETHEREUM_RPC_URL, currencyMap } from './constants'
import CurrencyAbi from '../abis/CurrencyABI.json'
import { cacheServiceInstance } from './CacheService'

const resolveENS = async (name: string) => {
  const provider = new JsonRpcProvider(ETHEREUM_RPC_URL)
  return await provider.resolveName(name)
}

const getBlockNumber = async () => {
  const provider = new JsonRpcProvider(ETHEREUM_RPC_URL)
  return await provider.getBlockNumber()
}

const getContrat = (contract: string, abi: ethers.InterfaceAbi) => {
  const provider = new JsonRpcProvider(ETHEREUM_RPC_URL)
  return new Contract(contract, abi, provider)
}

const getCurrencyConversion = async (currencyKey = 'usd') => {
  if (currencyKey === 'usd') return 1
  if (
    cacheServiceInstance.has(currencyKey) &&
    !cacheServiceInstance.isExpired(currencyKey, 300) &&
    cacheServiceInstance.get(currencyKey)
  ) {
    return cacheServiceInstance.get(currencyKey)
  }
  const currencyAddress = currencyMap[currencyKey].address
  const currencyContract = getContrat(currencyAddress, CurrencyAbi)
  let latestAnswer = await currencyContract.latestAnswer()
  latestAnswer = Number(formatUnits(latestAnswer, 8))
  cacheServiceInstance.set(currencyKey, latestAnswer)

  return latestAnswer
}

export { resolveENS, getBlockNumber, getContrat, getCurrencyConversion }

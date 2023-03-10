import { cacheServiceInstance } from './CacheService'
import fetchGetWithRetry from './fetchGetWithRetry'

export default async function cacheFetch(url: string, clearCache = false): Promise<CacheValue> {
  //we bust cache
  // clearCache = true;
  if (
    cacheServiceInstance.has(url) &&
    !cacheServiceInstance.isExpired(url, 300) &&
    !clearCache &&
    cacheServiceInstance.get(url)
  ) {
    return cacheServiceInstance.get(url)
  }
  const response = await fetchGetWithRetry(url)
  cacheServiceInstance.set(url, response)
  return response
}

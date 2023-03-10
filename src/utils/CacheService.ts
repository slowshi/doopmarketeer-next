import { CacheItem, CacheValue } from '../interface/CacheService'

class CacheService {
  private cache = new Map<string, CacheItem>()

  public has(key: string): boolean {
    return this.cache.has(key)
  }

  public set(key: string, value: CacheValue): Map<string, CacheItem> {
    const setObj = {
      value,
      timestamp: Date.now(),
    }
    return this.cache.set(key, setObj)
  }

  public get(key: string): CacheValue | null {
    const item = this.cache.get(key)
    if (typeof item === 'undefined') {
      return null
    }
    return item.value
  }

  public delete(key: string): boolean {
    return this.cache.delete(key)
  }

  public clear(): void {
    this.cache.clear()
  }

  public isExpired(key: string, seconds: number): boolean {
    const item = this.cache.get(key)
    if (typeof item === 'undefined') {
      return true
    }
    return (Date.now() - item.timestamp) / 1000 > seconds
  }
}

const cacheServiceInstance = new CacheService()

export { CacheService, cacheServiceInstance }

type CacheValue = number | string | null | undefined | unknown

type CacheItem = {
  value: CacheValue
  timestamp: number
}

export type { CacheValue, CacheItem }

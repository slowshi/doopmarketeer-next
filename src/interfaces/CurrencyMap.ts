interface Currency {
  label: string
  address: string
  toLocaleString?: {
    style?: 'currency'
    currency?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  }
}

interface CurrencyMap {
  [key: string]: Currency
}

export type { CurrencyMap, Currency }

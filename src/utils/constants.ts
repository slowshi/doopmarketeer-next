import { AbiItem } from 'web3-utils'
import { AssumedWearablesMap } from '../interfaces/Doodle'
import { CurrencyMap } from '@/interfaces/CurrencyMap'
const dooplicateItem: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'dooplicationAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'dooplicatorId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes8',
        name: 'addressOnTheOtherSide',
        type: 'bytes8',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'dooplicateItem',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
const dooplicate: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dooplicatorId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'dooplicatorVault',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'tokenContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'tokenVault',
        type: 'address',
      },
      {
        internalType: 'bytes8',
        name: 'addressOnTheOtherSide',
        type: 'bytes8',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'dooplicate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const assumedWearablesMap: AssumedWearablesMap = {
  'blue backpack': [
    {
      wearable_id: '141',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/Qmcw4oUMcarsbJUxPUeX2Ye4Tg8ir51fFHPU8xAefEmQRS.svg',
    },
    {
      wearable_id: '142',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmZM8n38utE2kpRZ8zeRfxFwE1Z5c7qsndZhnmQANhKVav.svg',
    },
  ],
  'yellow backpack': [
    {
      wearable_id: '143',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmNgpvNLKh3VWBrvi741NdEbVoMt4q8NYCbbNE5X4kJDbA.svg',
    },
    {
      wearable_id: '144',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmdwUWZf7sVeaUu2UfsjQkhQ5HhdWJevLoReCCAYNsvqx2.svg',
    },
  ],
  'pink backpack': [
    {
      wearable_id: '145',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmcFWt8iqcGuugxVWBDHDnPf3ukeKGCLJCCDh8V8dMgWD4.svg',
    },
    {
      wearable_id: '146',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmQvBxq2wzr2aga1qB99J9MRVEkwKagqmQinUzf8kCNbaD.svg',
    },
  ],
  'purple sweater with satchel': [
    {
      wearable_id: '150',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmaknaftP86RwTHSmMx35pyfVdVxA7GKnY4TKHpu8GYzEP.svg',
    },
    {
      wearable_id: '151',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmdAHcNXJLJnv8e4J7iiwNtgHkjGpf8qp94MKWNtWrjkvD.svg',
    },
  ],
  'pink sweater with satchel': [
    {
      wearable_id: '152',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmXiK8x3w6pJvL34V9snUMdNSEEzhwcDvzguHJbXcBBnQd.svg',
    },
    {
      wearable_id: '153',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmTbowsKDSmjWEawszrcwWuxaPW8TMBpbfxvFzBTixqhW2.svg',
    },
  ],
  'holographic beard': [
    {
      wearable_id: '61',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/Qmcgyb43SopvWd8z112QP1PTaP8qUvX7B1pXNZ98c9GNMg.svg',
    },
  ],
  'holographic bob': [
    {
      wearable_id: '61',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/Qmcgyb43SopvWd8z112QP1PTaP8qUvX7B1pXNZ98c9GNMg.svg',
    },
  ],
  'holographic afro': [
    {
      wearable_id: '61',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/Qmcgyb43SopvWd8z112QP1PTaP8qUvX7B1pXNZ98c9GNMg.svg',
    },
  ],
  'crown with holographic long': [
    {
      wearable_id: '61',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/Qmcgyb43SopvWd8z112QP1PTaP8qUvX7B1pXNZ98c9GNMg.svg',
    },
  ],
  'green blazer': [
    {
      wearable_id: '147',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmbuXX5UmrzaVZSfdk9sVdXNpMHSyfiqQUdYVBukQtUDTb.svg',
    },
    {
      wearable_id: '149',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmWhoP4LF4dthcfcebumLchZRdrGQ271gSPMvhvt1XcYdb.svg',
    },
  ],
  'blue blazer': [
    {
      wearable_id: '147',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmbuXX5UmrzaVZSfdk9sVdXNpMHSyfiqQUdYVBukQtUDTb.svg',
    },
    {
      wearable_id: '148',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmbpUyYGtkvQArDfXr4q3oiNusND1w3ZtMbUfnHg9Vmz1E.svg',
    },
  ],
  'purple chain': [
    {
      wearable_id: '154',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmQeHtyC2oM7cdxhgRNG3WZZmCPxV6EmaZwyewjKQJRmTW.svg',
    },
    {
      wearable_id: '155',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmaDWeeyQFCk4Vj4K5HUhpkACAsDVPKM3w9wrvUZwHmsQ3.svg',
    },
  ],
  'holographic sweater': [
    {
      wearable_id: '156',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmWFBjnZVCVHaM1AKTofEnVKcL6qmdzm29guftpSd7thWu.svg',
    },
    {
      wearable_id: '157',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmVSkBAuQvD9KPLbMcpJCpr4SmrDh9J2SbgXUFQgWhiwNN.svg',
    },
  ],
  pickle: [
    {
      wearable_id: '70',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmWMVYdYZKA3JMRcF3qnZsKhhYPT9yD14k9sfao5pJP2x3.svg',
    },
  ],
  'rainbow puke': [
    {
      wearable_id: '48',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmWamcDPvcttpa7h9cb8QBxdvXT7waxZQ8wCodm16npBEH.svg',
    },
    {
      wearable_id: '49',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmbLvCHahUqrATz2k1mWBGkySsbayAeWPrLzvEKHjL5FMg.svg',
    },
  ],
  flower: [
    {
      wearable_id: '67',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmV9TM6w34Gn2eZWsEQUue9fEQybVbv67Ufb8btcbnyXeK.svg',
    },
  ],
  rainbow: [
    {
      wearable_id: '55',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmeaJTJfuw4bAgxjSXRkiKPmHxQx5PrH3ASy5V3WNGyqTq.svg',
    },
  ],
  devil: [
    {
      wearable_id: '68',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmTCCokbvdXCHW1pGAw5BPR5E1ZtTpF1xL8bncPy1Scao4.svg',
    },
  ],
  coffee: [
    {
      wearable_id: '54',
      image_uri: 'https://d1zu9f2anwwksd.cloudfront.net/QmcbyY8xJ9J5juWoEcoqBfNMwcb7q2j6mNvMDNY7LfP9oU.svg',
    },
  ],
}

const DOOPLICATION_BLOCK = 16508485
const IPFS_URL = 'https://wcnft.mypinata.cloud/ipfs'
const DOODLE_METADATA_URL = `${IPFS_URL}/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS`
const DOOPLICATOR_WEARABLES_URL = 'https://doodles.app/api/dooplicator'
const ETHEREUM_RPC_URL = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
const UNKNOWN_WEARABLE = 'https://doodles.app/images/dooplicator/missingDood.png'
const GEM_ASSETS_URL = 'https://api-v2-1.gemlabs.xyz/assets'

const DOODLE_ADDRESS = '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e'
const DOOPMARKET_ADDRESS = '0xcdef9b7949869cbeddcaeb398445e5972d8f564c'
const DOOPLICATOR_ADDRESS = '0x36c3ec16da484240f74d05c0213186a3248e0e48'
type DoopContracts = {
  [key: string]: AbiItem[]
}
const doopContracts: DoopContracts = {
  [DOOPMARKET_ADDRESS]: dooplicateItem,
  [DOOPLICATOR_ADDRESS]: dooplicate,
}

const API_URL = 'api'
const DOOPLICATOR_URL = 'https://metadata.artlab.xyz/0185fa75-ba04-8156-9fbe-bb39dc263392'
const currencyMap: CurrencyMap = {
  usd: {
    label: 'USD',
    address: '',
    toLocaleString: {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  },
  eth: {
    label: 'ETH',
    address: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
    toLocaleString: {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    },
  },
  flow: {
    label: 'FLOW',
    address: '0xd9bdd9f5ffa7d89c846a5e3231a093ae4b3469d2',
    toLocaleString: {
      style: 'currency',
      currency: 'ETH',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
}

const marketTabs: { [key: string]: string } = {
  LEADERBOARD: 'leaderboard',
  FEED: 'feed',
  DOOPMARKET: 'doopmarket',
  SEARCH: 'search',
  UNDOOPED: 'undooped',
}

const palette: { [key: string]: string } = {
  PINK_100: '#FFD2EA',
  PINK_200: '#FFC2DF',
  PINK_300: '#FFA4D4',
  ORANGE_100: '#FFCC99',
  YELLOW_100: '#FFE98A',
  GREEN_100: '#B3FFC7',
  GREEN_200: '#79E8B3',
  BLUE_100: '#BBEFFF',
  BLUE_200: '#99E2FF',
  BLUE_300: '#80B1FF',
  PURPLE_100: '#C5C5FF',
  PURPLE_200: '#A4A4F4',
  SKIN_100: '#FFF5EB',
  SKIN_200: '#FFEAD2',
  SKIN_300: '#F9E0D7',
  SKIN_400: '#FFD0B8',
  SKIN_500: '#E5CBCA',
  SKIN_600: '#E1A175',
  SKIN_700: '#D1B6B6',
  SKIN_800: '#D18C79',
}

const searchTypes: { [key: string]: string } = {
  ADDRESS: 'address',
  DOOPLICATOR: 'dooplicator',
  DOODLE: 'doodle',
  GENESIS_BOX: 'genesisBox',
}

const undoopedTypes: { [key: string]: string } = {
  DOODLES: 'doodles',
  VERY_COMMON: 'veryCommon',
  COMMON: 'common',
  RARE: 'rare',
}

interface SearchColors {
  [key: string]: {
    light: string
    dark: string
  }
}

const searchColors: SearchColors = {
  [searchTypes.ADDRESS]: {
    light: palette.PURPLE_100,
    dark: palette.PURPLE_200,
  },
  [searchTypes.DOODLE]: {
    light: palette.BLUE_200,
    dark: palette.BLUE_300,
  },
  [searchTypes.DOOPLICATOR]: {
    light: palette.GREEN_100,
    dark: palette.GREEN_200,
  },
  [searchTypes.GENESIS_BOX]: {
    light: palette.PINK_100,
    dark: palette.PINK_200,
  },
}

export {
  DOOPMARKET_ADDRESS,
  DOOPLICATOR_ADDRESS,
  DOOPLICATION_BLOCK,
  DOODLE_ADDRESS,
  ETHEREUM_RPC_URL,
  IPFS_URL,
  DOOPLICATOR_WEARABLES_URL,
  DOODLE_METADATA_URL,
  GEM_ASSETS_URL,
  UNKNOWN_WEARABLE,
  assumedWearablesMap,
  doopContracts,
  API_URL,
  DOOPLICATOR_URL,
  currencyMap,
  marketTabs,
  palette,
  undoopedTypes,
  searchTypes,
  searchColors,
}

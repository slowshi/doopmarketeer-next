interface DoodleAttribute {
  trait_type: string
  value: string
}
interface DoodleMetadata {
  image: string
  name: string
  description: string
  attributes: DoodleAttribute[]
}
interface Wearable {
  id?: number
  ipfs_hash?: string
  name?: string
  trim?: string
  set?: string
  hidden?: boolean
  position?: string
  set_type?: string
  body_position?: string
  layer?: string
  plurality?: string
  ipfs_hash_svg?: string
  cost?: string | number
  image_uri: string
}
interface DooplicatorWearables {
  wearables: Wearable[]
}

interface GenesisBoxMetadata {
  data: {
    opened: boolean
    message: string
    wearables: Wearable[]
  }
}

interface WearableCost {
  editionID: string
  name: string
  description: string
  activeListing: {
    vaultType: string
    price: number
  }
}
interface Doodle {
  image: string
  name: string
  description: string
  attributes: {
    trait_type: string
    value: string
  }[]
  wearables: Wearable[]
  costs: WearableCost[]
}
type AssumedWearableInfo = {
  wearable_id: string
  image_uri: string
}
type AssumedWearablesMap = {
  [key: string]: AssumedWearableInfo[]
}
interface GenesisBox {
  wearables: Wearable[]
  costs: WearableCost[]
}
export type {
  DoodleAttribute,
  DoodleMetadata,
  Wearable,
  WearableCost,
  DooplicatorWearables,
  Doodle,
  AssumedWearableInfo,
  AssumedWearablesMap,
  GenesisBox,
  GenesisBoxMetadata,
}

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
  wearable_id?: string
  ipfs_hash?: string
  name?: string
  trim?: string
  set?: string
  hidden?: boolean
  position?: string
  plurality?: boolean
  ipfs_hash_svg?: string
  cost?: string
  image_uri: string
}
interface DooplicatorWearables {
  wearables: Wearable[]
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
export type {
  DoodleAttribute,
  DoodleMetadata,
  Wearable,
  WearableCost,
  DooplicatorWearables,
  Doodle,
  AssumedWearableInfo,
  AssumedWearablesMap,
}

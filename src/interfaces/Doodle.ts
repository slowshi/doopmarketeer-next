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
  image_uri: string
}
interface DooplicatorWearables {
  wearables: Wearable[]
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
  costs: {
    editionID: string
    name: string
    description: string
    activeListing: {
      vaultType: string
      price: number
    }
  }[]
}
type AssumedWearableInfo = {
  wearable_id: string
  image_uri: string
}
type AssumedWearablesMap = {
  [key: string]: AssumedWearableInfo[]
}
export {
  DoodleAttribute,
  DoodleMetadata,
  Wearable,
  DooplicatorWearables,
  Doodle,
  AssumedWearableInfo,
  AssumedWearablesMap,
}

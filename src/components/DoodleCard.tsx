import {
  Stack,
  Card,
  CardBody,
  Image,
  Text,
  Flex,
  Box,
  Wrap,
  WrapItem,
  Skeleton,
  Center,
  Link,
  useBoolean,
  SkeletonCircle,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import WearbleImage from './WearableImage'
import { shallowEqual } from 'react-redux'
import { currencyMap, IPFS_URL, palette } from '@/utils/constants'
import NextLink from 'next/link'
import { doopmarketeerApi, useGetDoodleAssetsQuery } from '@/services/api'
import { DoopTransactionInfo } from '@/interfaces/DoopTransactions'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { RootState } from '@/redux/appStore'
import { selectEthPrice } from '@/redux/appSlice'
import { UndoopedDoodle } from '@/interfaces/Undooped'
import { DoopmarketListing } from '@/interfaces/DoopMarket'
interface DoodleCardProps {
  doop: UndoopedDoodle | DoopTransactionInfo | DoopmarketListing
}
interface CostMap {
  [key: string]: string
}
function DoodleCard({ doop }: DoodleCardProps) {
  const dispatch = useAppDispatch()
  const [avatarLoaded, setAvatarLoaded] = useBoolean()
  useGetDoodleAssetsQuery(doop.tokenId)
  const ethPrice = useAppSelector(selectEthPrice)

  const image = useAppSelector((state) => {
    const data = state.app.assets[doop.tokenId]
    if (typeof data === 'undefined') return ''
    return `${IPFS_URL}/${data.image.substring(7)}`
  })

  const selectDoopRarity = (state: RootState): number => {
    let multiple = 1
    if ('dooplicatorId' in doop) {
      const doopData = state.app.dooplicatorAssets[doop.dooplicatorId]
      if (typeof doopData !== 'undefined') {
        const trait = doopData.attributes.find((item) => item.trait_type === 'Rarity')
        if (trait !== undefined) {
          if (trait.value === 'Rare') {
            multiple = 3
          } else if (trait.value === 'Common') {
            multiple = 2
          } else if (trait.value === 'Very Common') {
            multiple = 1
          }
        }
      }
    }
    return multiple
  }
  const doopRarity = useAppSelector(selectDoopRarity)

  const totalCost = useAppSelector((state) => {
    const data = state.app.assets[doop.tokenId]
    let multiple = selectDoopRarity(state)
    if (multiple === null) multiple = 1
    if (typeof data === 'undefined') return 0
    const total = data.costs.reduce((acc, cost) => {
      if (cost === null) return acc
      return acc + cost.activeListing.price
    }, 0)
    return multiple * total
  }, shallowEqual)

  const wearables = useAppSelector((state: RootState) => {
    const data = state.app.assets[doop.tokenId]
    const flowPrice = state.app.flowPrice
    if (typeof data === 'undefined') return []
    const costMap: CostMap = data.costs.reduce((acc, cost) => {
      if (cost === null) return acc
      let price = cost.activeListing.price
      if (cost.activeListing?.vaultType !== 'A.ead892083b3e2c6c.DapperUtilityCoin.Vault') {
        price = price / flowPrice
      }
      acc = {
        ...acc,
        [cost.editionID]: price.toLocaleString(undefined, currencyMap.usd.toLocaleString),
      }
      return acc
    }, {} as CostMap)
    return data.wearables.map((wearable) => {
      let wearableCost = '0'
      if (wearable.wearable_id !== undefined && wearable.wearable_id in costMap) {
        wearableCost = costMap[wearable.wearable_id]
      }
      return {
        ...wearable,
        cost: wearableCost,
      }
    })
  })

  const isDooplicated = useAppSelector((state: RootState) => {
    const data = state.app.assets[doop.tokenId]
    if (typeof data === 'undefined') return false
    return data.wearables.filter((wearable) => typeof wearable.wearable_id === 'undefined').length === 0
  })

  function imageLoaded() {
    setAvatarLoaded.on()
  }

  const fetchDooplicator = async () => {
    if ('dooplicatorId' in doop && doop.dooplicatorId !== '') {
      await dispatch(doopmarketeerApi.endpoints.getDooplicatiorAssets.initiate(Number(doop.dooplicatorId)))
    }
  }
  useEffect(() => {
    fetchDooplicator()
    return () => {
      setAvatarLoaded.off()
    }
  }, [doop, setAvatarLoaded])

  return (
    <Card>
      <CardBody>
        <Flex flexWrap="wrap" flexFlow="column">
          <Flex>
            <Box me="6">
              <SkeletonCircle w="90px" h="90px" isLoaded={avatarLoaded}>
                <Image rounded="full" w="90px" src={image} onLoad={imageLoaded} alt="doodle"></Image>
              </SkeletonCircle>
              <Skeleton height="22px" w="full" isLoaded={avatarLoaded}>
                <Center>
                  <Text>#{doop.tokenId}</Text>
                </Center>
              </Skeleton>
            </Box>
            <Box>
              <Stack h="100" justifyContent="space-evenly">
                {'functionName' in doop ? (
                  <Skeleton height="22px" isLoaded={avatarLoaded}>
                    <Text>
                      {'value' in doop && doop.functionName === 'dooplicateItem'
                        ? `DoopMarket - ${Number(doop.value / 10e17).toLocaleString(
                            undefined,
                            currencyMap.eth.toLocaleString,
                          )} Ξ`
                        : 'Dooplicator'}
                    </Text>
                  </Skeleton>
                ) : (
                  <Skeleton height="22px" isLoaded={avatarLoaded}>
                    <Text>{isDooplicated ? 'Dooplicated' : 'Not Dooplicated'}</Text>
                  </Skeleton>
                )}
                {'currentBasePrice' in doop ? (
                  <Skeleton height="22px" isLoaded={avatarLoaded}>
                    <Text>
                      Cost{' '}
                      {Number(doop.currentBasePrice / 10e17).toLocaleString(undefined, currencyMap.eth.toLocaleString)}{' '}
                      Ξ
                    </Text>
                  </Skeleton>
                ) : (
                  ''
                )}
                {'timeStamp' in doop && doop.timeStamp !== 0 ? (
                  <Skeleton height="22px" isLoaded={avatarLoaded}>
                    <Text>{new Date(doop.timeStamp * 1000).toLocaleString()}</Text>
                  </Skeleton>
                ) : (
                  ''
                )}
                {'from' in doop && doop.from !== '' ? (
                  <Skeleton height="22px" isLoaded={avatarLoaded}>
                    <Link
                      fontWeight="bold"
                      color={palette.ORANGE_100}
                      as={NextLink}
                      href={`/search?address=${doop.from}`}
                    >
                      {doop.from.substring(0, 4) + '...' + doop.from.substring(doop.from.length - 4)}
                    </Link>
                  </Skeleton>
                ) : (
                  ''
                )}
                {'marketUrl' in doop ? (
                  <Skeleton height="22px" isLoaded={avatarLoaded}>
                    <Link fontWeight="bold" color={palette.ORANGE_100} href={doop.marketUrl} isExternal>
                      Listing
                    </Link>
                  </Skeleton>
                ) : (
                  ''
                )}
                <Skeleton height="22px" isLoaded={avatarLoaded}>
                  <Text>
                    Total {totalCost.toLocaleString(undefined, currencyMap.usd.toLocaleString)} |{' '}
                    {`${Number(totalCost / ethPrice).toLocaleString(undefined, currencyMap.eth.toLocaleString)} Ξ`}
                  </Text>
                </Skeleton>
              </Stack>
            </Box>
          </Flex>
          <Flex mt="4" ms="2">
            <Wrap spacing="20px">
              {wearables.map((item, index) => (
                <WrapItem key={index}>
                  <WearbleImage item={item} rarity={doopRarity}></WearbleImage>
                </WrapItem>
              ))}
            </Wrap>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default DoodleCard

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
import { useSelector, shallowEqual } from 'react-redux'
import { currencyMap, IPFS_GATEWAY, palette } from '@/utils/constants'
import NextLink from 'next/link'
import { doopmarketeerApi, useGetDoodleAssetsQuery } from '@/services/api'

function DoodleCard({ doop }) {
  const [avatarLoaded, setAvatarLoaded] = useBoolean()
  useGetDoodleAssetsQuery(doop.tokenId)

  const image = useSelector((state) => {
    const data = state.app.assets[doop.tokenId]
    if (typeof data === 'undefined') return ''
    return `${IPFS_GATEWAY}/${data.image.substring(7)}`
  }, shallowEqual)

  const doopRaritySelector = (state) => {
    let multiple = null
    if (doop.dooplicatorId !== '') {
      const doopData = state.app.dooplicatorAssets[doop.dooplicatorId]
      if (typeof doopData !== 'undefined') {
        const trait = doopData.attributes.find((item) => item.trait_type === 'Rarity')
        if (trait.value === 'Rare') {
          multiple = 3
        } else if (trait.value === 'Common') {
          multiple = 2
        } else if (trait.value === 'Very Common') {
          multiple = 1
        }
      }
    }
    return multiple
  }
  const doopRarity = useSelector(doopRaritySelector)

  const totalCost = useSelector((state) => {
    const data = state.app.assets[doop.tokenId]
    let multiple = doopRaritySelector(state)
    if (multiple === null) multiple = 1
    if (typeof data === 'undefined') return 0
    const total = data.costs.reduce((acc, cost) => {
      if (cost === null) return acc
      return acc + cost.activeListing.price
    }, 0)
    return multiple * total
  }, shallowEqual)
  const ethPrice = useSelector((state) => state.app.ethPrice)

  const wearables = useSelector((state) => {
    const data = state.app.assets[doop.tokenId]
    const flowPrice = state.app.flowPrice
    if (typeof data === 'undefined') return []
    const costMap = data.costs.reduce((acc, cost) => {
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
    }, {})
    return data.wearables.map((wearable) => {
      return {
        ...wearable,
        cost: typeof costMap[wearable.wearable_id] !== 'undefined' ? costMap[wearable.wearable_id] : 0,
      }
    })
  }, shallowEqual)

  const isDooplicated = useSelector((state) => {
    const data = state.app.assets[doop.tokenId]
    if (typeof data === 'undefined') return false
    return data.wearables.filter((wearable) => typeof wearable.wearable_id === 'undefined').length === 0
  })

  function imageLoaded() {
    setAvatarLoaded.on()
  }

  useEffect(() => {
    if (doop.dooplicatorId !== '' && typeof doop.dooplicatorId !== 'undefined') {
      doopmarketeerApi.endpoints.getDooplicatiorAssets.initiate(doop.dooplicatorId)
    }
    return () => {
      setAvatarLoaded.off()
    }
  }, [doop.dooplicatorId, setAvatarLoaded])

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
                {doop.functionName ? (
                  <Skeleton height="22px" isLoaded={avatarLoaded}>
                    <Text>
                      {doop.functionName === 'dooplicateItem'
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
                {typeof doop.currentBasePrice !== 'undefined' ? (
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
                {doop.timeStamp !== 0 ? (
                  <Skeleton height="22px" isLoaded={avatarLoaded}>
                    <Text>{new Date(doop.timeStamp * 1000).toLocaleString()}</Text>
                  </Skeleton>
                ) : (
                  ''
                )}
                {doop.from !== '' ? (
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
                {typeof doop.marketUrl !== 'undefined' ? (
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

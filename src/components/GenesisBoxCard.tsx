import { Stack, Card, CardBody, Text, Flex, Box, Wrap, WrapItem, Skeleton, Link } from '@chakra-ui/react'
import WearbleImage from './WearableImage'
import { shallowEqual } from 'react-redux'
import { currencyMap, palette } from '@/utils/constants'
import NextLink from 'next/link'
import { useGetGenesisBoxAssetsQuery } from '@/services/api'
import { useAppSelector } from '@/redux/hooks'
import { RootState } from '@/redux/appStore'
import { selectEthPrice } from '@/redux/appSlice'
import { DoopTransactionInfo } from '@/interfaces/DoopTransactions'
interface GenesisBoxParam {
  genesisBox: DoopTransactionInfo
}
interface CostMap {
  [key: string]: string
}
function GenesisBoxCard({ genesisBox }: GenesisBoxParam) {
  const { isLoading } = useGetGenesisBoxAssetsQuery(genesisBox.tokenId)
  const ethPrice = useAppSelector(selectEthPrice)

  const totalCost = useAppSelector((state) => {
    const data = state.app.genesisBoxAssets[genesisBox.tokenId]
    if (typeof data === 'undefined') return 0
    const total = data.costs.reduce((acc, cost) => {
      if (cost === null) return acc
      return acc + cost.activeListing.price
    }, 0)
    return total
  }, shallowEqual)

  const wearables = useAppSelector((state: RootState) => {
    const data = state.app.genesisBoxAssets[genesisBox.tokenId]
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
      if (wearable.id !== undefined && wearable.id in costMap) {
        wearableCost = costMap[wearable.id.toString()]
      }
      return {
        ...wearable,
        cost: wearableCost,
      }
    })
  })

  return (
    <Card>
      <CardBody>
        <Flex flexWrap="wrap" flexFlow="column">
          <Flex>
            <Stack pl="2" h="100" justifyContent="space-evenly">
              <Skeleton height="22px" w="full" isLoaded={!isLoading}>
                <Text>Genesis Box ID #{genesisBox.tokenId}</Text>
              </Skeleton>
              {'timeStamp' in genesisBox && genesisBox.timeStamp !== 0 ? (
                <Skeleton height="22px" isLoaded={!isLoading}>
                  <Text>{new Date(genesisBox.timeStamp * 1000).toLocaleString()}</Text>
                </Skeleton>
              ) : (
                ''
              )}
              {'from' in genesisBox && genesisBox.from !== '' ? (
                <Skeleton height="22px" isLoaded={!isLoading}>
                  <Link
                    fontWeight="bold"
                    color={palette.ORANGE_100}
                    as={NextLink}
                    href={`/search?address=${genesisBox.from}`}
                  >
                    {genesisBox.from.substring(0, 4) + '...' + genesisBox.from.substring(genesisBox.from.length - 4)}
                  </Link>
                </Skeleton>
              ) : (
                ''
              )}
              <Skeleton height="22px" isLoaded={!isLoading}>
                <Text>
                  Total {totalCost.toLocaleString(undefined, currencyMap.usd.toLocaleString)} |{' '}
                  {`${Number(totalCost / ethPrice).toLocaleString(undefined, currencyMap.eth.toLocaleString)} Ξ`}
                </Text>
              </Skeleton>
            </Stack>
          </Flex>
          <Flex mt="4" ms="2">
            <Wrap spacing="20px">
              {wearables.map((item, index) => (
                <WrapItem key={index}>
                  <WearbleImage item={item} rarity={1}></WearbleImage>
                </WrapItem>
              ))}
            </Wrap>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default GenesisBoxCard

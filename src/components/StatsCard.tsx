import { Card, CardBody, SimpleGrid, Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { currencyMap } from '@/utils/constants'
import DoodleSpinner from './DoodleSpinner'
import { useAppSelector } from '@/redux/hooks'
import { selectTotalDoopCost, selectTotalDooplications } from '@/redux/appSlice'
import { RootState } from '@/redux/appStore'
import { Doodle } from '@/interfaces/Doodle'
import { DoopTransactionInfo } from '@/interfaces/DoopTransactions'

function StatsCard({ loading }: { loading: boolean }) {
  type UserDoopAsset = { doop: DoopTransactionInfo; asset: Doodle }
  const getRarity = (state: RootState, dooplicatorId: string): number => {
    let multiple = 1
    if (dooplicatorId !== '') {
      const doopData = state.app.dooplicatorAssets[dooplicatorId]
      if (typeof doopData !== 'undefined') {
        const trait = doopData.attributes.find((item) => item.trait_type === 'Rarity')
        if (trait?.value === 'Rare') {
          multiple = 3
        } else if (trait?.value === 'Common') {
          multiple = 2
        } else if (trait?.value === 'Very Common') {
          multiple = 1
        }
      }
    }
    return multiple
  }
  const totalWearableCount = (state: RootState, assets: UserDoopAsset[]): number =>
    assets.reduce((acc: number, item: UserDoopAsset) => {
      let multiple = 1
      if (typeof item.doop.dooplicatorId !== 'undefined') {
        multiple = getRarity(state, item.doop.dooplicatorId)
      }
      if (typeof item.asset.wearables !== 'undefined') {
        acc += item.asset.wearables.length * multiple
      }
      return acc
    }, 0)
  const selectAllUserAssets = (state: RootState): UserDoopAsset[] => {
    const data = state.app.dooplications
    const assets = state.app.assets
    const allAssets: UserDoopAsset[] = data.map((doop) => {
      if (typeof assets[doop.tokenId] === 'undefined')
        return {
          doop: {} as DoopTransactionInfo,
          asset: {} as Doodle,
        }
      return {
        doop,
        asset: assets[doop.tokenId],
      }
    })
    return allAssets
  }
  const selectTotalWearables = (state: RootState) => {
    const allAssets = selectAllUserAssets(state)
    const totalWearables = totalWearableCount(state, allAssets)
    return totalWearables
  }

  const selectCostPerWearable = (state: RootState): number => {
    const allAssets = selectAllUserAssets(state).filter((item) => item.doop.functionName === 'dooplicateItem')
    const doopMarketWearables = totalWearableCount(state, allAssets)
    const totalCost = selectTotalDoopCost(state)
    return doopMarketWearables === 0 ? 0 : totalCost / doopMarketWearables
  }
  const costPerWearables = useAppSelector(selectCostPerWearable)
  const totalDoops = useAppSelector(selectTotalDooplications)
  const totalCost = useAppSelector(selectTotalDoopCost)
  const totalWearables = useAppSelector(selectTotalWearables)

  const selectTotalWearableValue = (state: RootState) => {
    const allAssets = selectAllUserAssets(state)
    const ethPrice = state.app.ethPrice
    const flowPrice = state.app.flowPrice

    const totalValue = allAssets.reduce((acc: number, item: UserDoopAsset) => {
      let multiple = 1
      if (typeof item.doop.dooplicatorId !== 'undefined') {
        multiple = getRarity(state, item.doop.dooplicatorId)
      }
      if (typeof item.asset.wearables !== 'undefined') {
        const assetValue = item.asset.costs.reduce((acc, cost) => {
          if (cost === null) return acc
          let price = cost.activeListing.price
          if (cost.activeListing?.vaultType !== 'A.ead892083b3e2c6c.DapperUtilityCoin.Vault') {
            price = price / flowPrice
          }
          return acc + price
        }, 0)
        acc += assetValue * multiple
      }
      return acc
    }, 0)
    return totalValue / ethPrice
  }
  const totalWearableValue = useSelector(selectTotalWearableValue)
  return (
    <Card w="full">
      <CardBody>
        {loading ? (
          <DoodleSpinner />
        ) : (
          <SimpleGrid columns={[2, null, 3]} spacing="2">
            <Box>
              <Stat>
                <StatLabel>Total Doops</StatLabel>
                <StatNumber>{totalDoops}</StatNumber>
              </Stat>
            </Box>
            <Box>
              <Stat>
                <StatLabel>Total Wearables</StatLabel>
                <StatNumber>{totalWearables}</StatNumber>
              </Stat>
            </Box>
            <Box>
              <Stat>
                <StatLabel>Total Spent</StatLabel>
                <StatNumber>{`${totalCost / 10e17} Ξ`}</StatNumber>
              </Stat>
            </Box>
            <Box>
              <Stat>
                <StatLabel>Cost Per Wearable</StatLabel>
                <StatNumber>{`${Math.round((costPerWearables / 10e17) * 10000) / 10000} Ξ`}</StatNumber>
              </Stat>
            </Box>
            <Box>
              <Stat>
                <StatLabel>Wearables Value</StatLabel>
                <StatNumber>
                  {Number(totalWearableValue).toLocaleString(undefined, currencyMap.eth.toLocaleString)} Ξ
                </StatNumber>
              </Stat>
            </Box>
          </SimpleGrid>
        )}
      </CardBody>
    </Card>
  )
}

export default StatsCard

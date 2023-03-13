import { Stack, Text, Center, Button, useBoolean } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import DoodleCard from './DoodleCard'
import StatsCard from './StatsCard'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectDoodlesToLoad, selectSearchLoading, selectTotalDooplications, setSearchLoading } from '@/redux/appSlice'
import { doopmarketeerApi, useLazyGetUserDoopsQuery } from '@/services/api'

function Dooplications({ address }) {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const loading = useAppSelector(selectSearchLoading)
  const [loadingStats, setLoadingStats] = useBoolean()
  const [trigger, { isLoading, isFetching, isUninitialized }] = useLazyGetUserDoopsQuery(address)
  const doodlesToLoad = useAppSelector(selectDoodlesToLoad)
  const dooplications = useAppSelector((state) => {
    return state.app.dooplications.slice(0, page * 5)
  })

  const totalDooplications = useAppSelector(selectTotalDooplications)

  const loadMore = async () => {
    setPage(page + 1)
  }

  const fetchDoops = async () => {
    batchPromise(doodlesToLoad, 5, fetchAssets)
  }

  async function batchPromise(items, batchSize, asyncFunc) {
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize)
      await Promise.all(batch.map(asyncFunc))
    }
    setLoadingStats.off()
  }

  async function fetchAssets(doop) {
    await dispatch(doopmarketeerApi.endpoints.getDoodleAssets.initiate(doop.tokenId))
    const doopId = doop.dooplicatorId
    if (doopId !== '' && typeof doopId !== 'undefined') {
      await dispatch(doopmarketeerApi.endpoints.getDooplicatiorAssets.initiate(doopId))
    }
  }

  useEffect(() => {
    if (address !== '' && loading) {
      setLoadingStats.on()
      trigger(address)
    }
  }, [address, loading, trigger, setLoadingStats])

  useEffect(() => {
    dispatch(setSearchLoading(isFetching))
    if (!isLoading && !isUninitialized) {
      fetchDoops()
    }
  }, [isLoading, isFetching, dispatch, isUninitialized])

  return (
    <>
      {dooplications.length > 0 ? (
        <>
          <Text color="white" fontWeight="bold">
            Stats
          </Text>
          <StatsCard loading={loadingStats} />
          <Text color="white" fontWeight="bold">
            History
          </Text>
          <Stack w="full" spacing="4">
            {dooplications.map((doop) => (
              <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
            ))}
            {dooplications.length < totalDooplications ? (
              <Center>
                <Button colorScheme="whiteAlpha" onClick={loadMore}>
                  Load More
                </Button>
              </Center>
            ) : (
              ''
            )}
          </Stack>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default Dooplications

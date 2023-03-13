import { Box, Stack, Text, Center, Heading, Button, Container } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Nav from '@/components/Nav'
import DoodleCard from '@/components/DoodleCard'
import { marketTabs, palette } from '@/utils/constants'
import ScrollToTop from '@/components/ScrollToTop'
import DoodleSpinner from '@/components/DoodleSpinner'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectFeed, selectLatestBlockNumber, setActiveMarketTab } from '@/redux/appSlice'
import { useGetHistoryQuery } from '@/services/api'

export default function Feed() {
  const dispatch = useAppDispatch()
  const [loadingMore, setLoadingMore] = useState(false)
  const [loading, setLoading] = useState(false)

  const feed = useAppSelector(selectFeed)
  const latestBlockNumber = useAppSelector(selectLatestBlockNumber)
  const [page, setPage] = useState(1)
  const { isLoading } = useGetHistoryQuery({ page, limit: 5 })

  const loadMore = async () => {
    setLoadingMore(true)
    // await dispatch(fetchHistory(page + 1))
    setPage(page + 1)
    setLoadingMore(false)
  }

  useEffect(() => {
    document.title = 'Doopmarketeer | Feed'
    dispatch(setActiveMarketTab(marketTabs.FEED))
    // return () => {
    //   dispatch(resetFeed())
    // }
  }, [dispatch])

  // useEffect(() => {
  //   const feedInterval = setInterval(async () => {
  //     await dispatch(checkFeed(latestBlockNumber))
  //   }, 20000)
  //   return () => clearInterval(feedInterval)
  // }, [latestBlockNumber, dispatch])
  return (
    <>
      <ScrollToTop />
      <Box zIndex="10000" w="100" position="sticky" bg={palette.SKIN_500} top="0">
        <Nav />
        <Container maxW="container.lg" mb="2">
          <Heading color="white" fontFamily="Chalkboard SE,sans-serif" as="h4" size="md">
            Feed
          </Heading>
        </Container>
      </Box>
      <Container maxW="container.lg">
        <Stack w="full" paddingBottom="8">
          {isLoading === true ? (
            <DoodleSpinner />
          ) : (
            <Stack w="full" spacing="4">
              {feed.map((doop) => (
                <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
              ))}
              <Center>
                <Button isLoading={loadingMore} colorScheme="whiteAlpha" onClick={loadMore}>
                  Load More
                </Button>
              </Center>
            </Stack>
          )}
        </Stack>
        <Text
          w="full"
          bg={palette.SKIN_500}
          textAlign="right"
          position="fixed"
          bottom="0"
          right="0"
          color="white"
          fontSize="xs"
        >
          * Not affiliated with Doodles.
        </Text>
      </Container>
    </>
  )
}

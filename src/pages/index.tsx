import { Box, Stack, Text, Center, Heading, Button, Container } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import cacheFetch from '@/utils/cacheFetch'
import Nav from '@/components/Nav'
import DoodleCard from '@/components/DoodleCard'
import { API_URL, marketTabs, palette } from '@/utils/constants'
import ScrollToTop from '@/components/ScrollToTop'
import DoodleSpinner from '@/components/DoodleSpinner'
import { fetchHistory, checkFeed, fetchCurrencies } from '@/redux/actions'

export default function Feed() {
  const dispatch = useDispatch()
  const [loadingMore, setLoadingMore] = useState(false)
  // const loading = useSelector((state) => state.app.feedLoading)
  const [loading, setLoading] = useState(false)

  const feed = useSelector((state) => state.app.feed, shallowEqual)
  const latestBlockNumber = useSelector((state) => {
    let blockNumber = 0
    if (state.app.feed.length > 0) {
      blockNumber = state.app.feed[0].blockNumber
    }
    return blockNumber
  })

  const [page, setPage] = useState(1)

  const loadMore = async () => {
    setLoadingMore(true)
    await dispatch(fetchHistory(page + 1))
    setPage(page + 1)
    setLoadingMore(false)
  }

  useEffect(() => {
    ;(async () => {
      document.title = 'Doopmarketeer | Feed'
      dispatch({
        type: 'setActiveMarketTab',
        payload: marketTabs.FEED,
      })
      dispatch(fetchCurrencies())
      setLoading(true)
      setPage(1)

      dispatch({
        type: 'setFeed',
        payload: [],
      })
      await dispatch(fetchHistory(1))
      setLoading(false)
      return () => {
        dispatch({
          type: 'setFeed',
          payload: [],
        })
      }
    })()
  }, [dispatch])

  useEffect(() => {
    const feedInterval = setInterval(async () => {
      await dispatch(checkFeed(latestBlockNumber))
    }, 20000)
    return () => clearInterval(feedInterval)
  }, [latestBlockNumber, dispatch])
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
          {loading === true ? (
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

import { Box, Stack, Text, Center, Heading, Button, Container } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import DoodleCard from '@/components/DoodleCard'
import { marketTabs, palette } from '@/utils/constants'
import ScrollToTop from '@/components/ScrollToTop'
import DoodleSpinner from '@/components/DoodleSpinner'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  selectGenesisBoxFeed,
  selectGenesisBoxTotal,
  selectLastGenesisBoxBlockNumber,
  setActiveMarketTab,
} from '@/redux/appSlice'
import { useGetGenesisBoxHistoryQuery, useLazyGetGenesisBoxFeedQuery } from '@/services/api'
import GenesisBoxCard from '@/components/GenesisBoxCard'

export default function Feed() {
  const dispatch = useAppDispatch()
  const feed = useAppSelector(selectGenesisBoxFeed)
  const [page, setPage] = useState(1)
  const { isLoading, isFetching } = useGetGenesisBoxHistoryQuery({ page, limit: 5 })
  const lastBlock = useAppSelector(selectLastGenesisBoxBlockNumber)
  const [trigger] = useLazyGetGenesisBoxFeedQuery({
    pollingInterval: 10000,
  })
  const totalBoxesOpened = useAppSelector(selectGenesisBoxTotal)
  const loadMore = async () => {
    setPage(page + 1)
  }

  useEffect(() => {
    document.title = 'Doopmarketeer | Genesis Box Feed'
    dispatch(setActiveMarketTab(marketTabs.GENESIS_BOX_FEED))
    if (lastBlock > 0) {
      if (Math.floor(feed.length / 5) > page) {
        setPage(Math.floor(feed.length / 5))
      }
      trigger(lastBlock)
    }
  }, [lastBlock, dispatch, trigger])
  return (
    <>
      <ScrollToTop />
      <Box zIndex="10000" w="100" position="sticky" bg={palette.SKIN_500} top="0">
        <Nav />
        <Container display="flex" justifyContent="space-between" maxW="container.lg" mb="2" alignItems="center">
          <Heading color="white" fontFamily="Chalkboard SE,sans-serif" as="h4" size="md">
            Genesis Box Feed
          </Heading>
          <Heading color="white" fontFamily="Chalkboard SE,sans-serif" as="h4" size="sm">
            Total Opened: {totalBoxesOpened}
          </Heading>
        </Container>
      </Box>
      <Container maxW="container.lg">
        <Stack w="full" paddingBottom="8">
          {isLoading === true ? (
            <DoodleSpinner />
          ) : (
            <Stack w="full" spacing="4">
              {feed.map((box) => (
                <GenesisBoxCard key={box.tokenId} genesisBox={box}></GenesisBoxCard>
              ))}
              <Center>
                <Button isLoading={isFetching} colorScheme="whiteAlpha" onClick={loadMore}>
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

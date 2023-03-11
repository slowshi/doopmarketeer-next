import { Box, Stack, Text, Center, Heading, Container, Button, HStack, IconButton, useBoolean } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa'
import DoodleCard from '@/components/DoodleCard'
import ScrollToTop from '@/components/ScrollToTop'
import { marketTabs, palette } from '@/utils/constants'
import Nav from '@/components/Nav'
import DoodleSpinner from '@/components/DoodleSpinner'
import { fetchCurrencies, fetchDoopmarket } from '@/redux/actions'
export default function DoopMarket() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [sortKey] = useState('value')
  const [sortDesc, setSortDesc] = useBoolean()

  const totalDoopMarket = useSelector((state) => state.app.doopMarket.length)
  const doopMarket = useSelector((state) =>
    state.app.doopMarket
      .sort((a, b) => {
        if (sortDesc) {
          if (a[sortKey] > b[sortKey]) {
            return -1
          }
          if (a[sortKey] < b[sortKey]) {
            return 1
          }
        } else {
          if (a[sortKey] < b[sortKey]) {
            return -1
          }
          if (a[sortKey] > b[sortKey]) {
            return 1
          }
        }
        return 0
      })
      .slice(0, page * 5),
  )

  const loadMore = async () => {
    setPage(page + 1)
  }

  useEffect(() => {
    ;(async () => {
      document.title = 'Doopmarketeer | Market'
      dispatch({
        type: 'setActiveMarketTab',
        payload: marketTabs.DOOPMARKET,
      })
      dispatch(fetchCurrencies())
      setLoading(true)
      setPage(1)
      await dispatch(fetchDoopmarket())
      setLoading(false)

      return () => {
        dispatch({
          type: 'setDoopMarket',
          payload: [],
        })
      }
    })()
  }, [dispatch])

  return (
    <>
      <ScrollToTop />
      <Box zIndex="10000" w="100" position="sticky" bg={palette.SKIN_500} top="0">
        <Nav />
        <Container maxW="container.lg" mb="2">
          <HStack justifyContent="space-between">
            <Heading color="white" fontFamily="Chalkboard SE,sans-serif" as="h4" size="md">
              DoopMarket
            </Heading>
            <IconButton
              colorScheme="whiteAlpha"
              aria-label="Sort"
              icon={sortDesc ? <FaSortAmountUp /> : <FaSortAmountDownAlt />}
              size="sm"
              onClick={() => setSortDesc.toggle()}
            />
          </HStack>
        </Container>
      </Box>
      <Container maxW="container.lg">
        <Stack w="full" paddingBottom="8">
          {loading === true ? (
            <DoodleSpinner />
          ) : (
            <Stack w="full" spacing="4">
              {doopMarket.map((doop) => (
                <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
              ))}
              {doopMarket.length < totalDoopMarket ? (
                <Center>
                  <Button colorScheme="whiteAlpha" onClick={loadMore}>
                    Load More
                  </Button>
                </Center>
              ) : (
                ''
              )}
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

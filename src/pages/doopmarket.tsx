import { Box, Stack, Text, Center, Heading, Container, Button, HStack, IconButton, useBoolean } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa'
import DoodleCard from '@/components/DoodleCard'
import ScrollToTop from '@/components/ScrollToTop'
import { marketTabs, palette } from '@/utils/constants'
import Nav from '@/components/Nav'
import DoodleSpinner from '@/components/DoodleSpinner'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGetDoopmarketQuery } from '@/services/api'
import { selectTotalDoopmarket, setActiveMarketTab } from '@/redux/appSlice'
export default function DoopMarket() {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [sortDesc, setSortDesc] = useBoolean()
  const totalDoopmarket = useAppSelector(selectTotalDoopmarket)
  const { isLoading } = useGetDoopmarketQuery()
  const doopMarket = useAppSelector((state) =>
    [...state.app.doopMarket]
      .sort((a, b) => {
        if (sortDesc) {
          if (a.value > b.value) {
            return -1
          }
          if (a.value < b.value) {
            return 1
          }
        } else {
          if (a.value < b.value) {
            return -1
          }
          if (a.value > b.value) {
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
    document.title = 'Doopmarketeer | Market'
    dispatch(setActiveMarketTab(marketTabs.DOOPMARKET))
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
          {isLoading === true ? (
            <DoodleSpinner />
          ) : (
            <Stack w="full" spacing="4">
              {doopMarket.map((doop) => (
                <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
              ))}
              {doopMarket.length < totalDoopmarket ? (
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

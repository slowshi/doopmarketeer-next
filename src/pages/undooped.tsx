import {
  Box,
  Stack,
  Text,
  Center,
  Heading,
  Container,
  Button,
  HStack,
  Tabs,
  TabPanels,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import DoodleCard from '@/components/DoodleCard'
import ScrollToTop from '@/components/ScrollToTop'
import { marketTabs, palette, undoopedTypes } from '@/utils/constants'
import Nav from '@/components/Nav'
import DoodleSpinner from '@/components/DoodleSpinner'
import DooplicatorCard from '@/components/DooplicatorCard'
import { useRouter } from 'next/router'

import {
  resetUndoopedDoodles,
  resetUndoopedDooplicators,
  selectUndoopedDoodles,
  selectUndoopedDooplicators,
  setActiveMarketTab,
} from '@/redux/appSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useLazyGetUndoopedDoodlesQuery, useLazyGetUndoopedDooplicatorsQuery } from '@/services/api'

export default function Undooped() {
  const titles = {
    [undoopedTypes.DOODLES]: 'Doodles',
    [undoopedTypes.VERY_COMMON]: 'Very Common',
    [undoopedTypes.COMMON]: 'Common',
    [undoopedTypes.RARE]: 'Rare',
  }
  const limit = 20
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [triggerDoops, { isLoading: doopLoading }] = useLazyGetUndoopedDooplicatorsQuery()
  const [triggerDoodles, { isLoading: loading, isFetching: loadingMore }] = useLazyGetUndoopedDoodlesQuery()

  const [page, setPage] = useState(1)
  const [menuTitle, setMenuTitle] = useState('Doodles')
  const [tabIndex, setTabIndex] = useState(0)
  const undoopedDoodles = useAppSelector(selectUndoopedDoodles)
  const undoopedDooplicators = useAppSelector(selectUndoopedDooplicators)

  const getDoodles = async () => {
    dispatch(resetUndoopedDoodles)
    triggerDoodles({ page: 1, limit })
  }

  const loadMore = async () => {
    triggerDoodles({ page: page + 1, limit })
    setPage(page + 1)
  }

  const getDoops = async (type: string) => {
    dispatch(resetUndoopedDooplicators)
    let index = 0
    if (type === undoopedTypes.COMMON) {
      index = 1
    } else if (type === undoopedTypes.RARE) {
      index = 2
    }
    triggerDoops(index)
  }

  const loadUndooped = (type: string) => {
    setMenuTitle(titles[type])
    if (type !== undoopedTypes.DOODLES) {
      getDoops(type)
      setTabIndex(1)
    } else {
      setPage(1)
      getDoodles()
      setTabIndex(0)
    }
  }

  const handleMenuSelect = (type: string) => {
    let searchParams = ''
    if (type !== undoopedTypes.DOODLES) {
      searchParams = `?${new URLSearchParams({
        type,
      })}`
    }
    const url = `/undooped${searchParams}`
    router.push(url)
    loadUndooped(type)
  }

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  useEffect(() => {
    document.title = 'Doopmarketeer | Undooped'
    dispatch(setActiveMarketTab(marketTabs.UNDOOPED))
    const searchParams = new URL(document.location.toString()).searchParams
    if (searchParams.has('type')) {
      const type = searchParams.get('type') || ''
      handleMenuSelect(type)
    } else {
      handleMenuSelect(undoopedTypes.DOODLES)
    }
  }, [dispatch, router.asPath])

  return (
    <>
      <ScrollToTop />
      <Box zIndex="10000" w="100" position="sticky" bg={palette.SKIN_500} top="0">
        <Nav />
        <Container maxW="container.lg" pb="2">
          <HStack justifyContent="space-between">
            <Heading color="white" fontFamily="Chalkboard SE,sans-serif" as="h4" size="md" mb="0">
              Undooped
            </Heading>
            <Box display="flex" alignItems="center">
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton colorScheme={isOpen ? 'blackAlpha' : 'whiteAlpha'} as={Button} aria-label="Options">
                      {menuTitle}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleMenuSelect(undoopedTypes.DOODLES)}>Doodles</MenuItem>
                      <MenuItem onClick={() => handleMenuSelect(undoopedTypes.VERY_COMMON)}>Very Common</MenuItem>
                      <MenuItem onClick={() => handleMenuSelect(undoopedTypes.COMMON)}>Common</MenuItem>
                      <MenuItem onClick={() => handleMenuSelect(undoopedTypes.RARE)}>Rare</MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Box>
          </HStack>
        </Container>
      </Box>
      <Container maxW="container.lg">
        <Tabs index={tabIndex} onChange={handleTabsChange} isLazy>
          <TabPanels>
            <TabPanel p="0">
              {loading ? (
                <DoodleSpinner />
              ) : (
                <>
                  {undoopedDoodles.length === 0 ? (
                    <Center>
                      <Text color="white">No undooped listings found, keep trying.</Text>
                    </Center>
                  ) : (
                    ''
                  )}
                  <Stack w="full" spacing="4" paddingBottom="8">
                    {undoopedDoodles.map((dood) => (
                      <DoodleCard key={dood.tokenId} doop={dood}></DoodleCard>
                    ))}
                    <Center>
                      <Button isLoading={loadingMore} colorScheme="whiteAlpha" onClick={loadMore}>
                        Load More ({page * limit})
                      </Button>
                    </Center>
                  </Stack>
                </>
              )}
            </TabPanel>
            <TabPanel p="0">
              {doopLoading === true ? (
                <DoodleSpinner />
              ) : (
                <Stack w="full" spacing="4" paddingBottom="8">
                  {undoopedDooplicators.map((doop) => (
                    <DooplicatorCard
                      key={doop.id}
                      tokenId={Number(doop.id)}
                      url={doop.url}
                      price={Number(doop.priceInfo.price)}
                    ></DooplicatorCard>
                  ))}
                </Stack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
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

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
import { useSelector, useDispatch } from 'react-redux'
import DoodleCard from '@/components/DoodleCard'
import ScrollToTop from '@/components/ScrollToTop'
import { marketTabs, palette, undoopedTypes } from '@/utils/constants'
import Nav from '@/components/Nav'
import DoodleSpinner from '@/components/DoodleSpinner'
import DooplicatorCard from '@/components/DooplicatorCard'
import { useRouter } from 'next/router'
import { fetchCurrencies, fetchUndooped, fetchUndoopedDooplicators } from '@/redux/actions'

export default function Unused() {
  const titles = {
    [undoopedTypes.DOODLES]: 'Doodles',
    [undoopedTypes.VERY_COMMON]: 'Very Common',
    [undoopedTypes.COMMON]: 'Common',
    [undoopedTypes.RARE]: 'Rare',
  }
  const limit = 20
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [menuTitle, setMenuTitle] = useState('Doodles')
  const [tabIndex, setTabIndex] = useState(0)
  const undoopedDoodles = useSelector((state) =>
    state.app.undoopedDoodles.map((item) => {
      return {
        ...item,
        functionName: '',
        timeStamp: 0,
        from: '',
      }
    }),
  )
  const undoopedDooplicators = useSelector((state) =>
    state.app.undoopedDooplicators.map((item) => {
      return {
        tokenId: item.id,
        price: Number(item.priceInfo.price),
        url: item.marketUrl,
      }
    }),
  )

  const getDoodles = async () => {
    setPage(1)
    setLoading(true)
    dispatch({
      type: 'setUndoopedDoodles',
      payload: [],
    })
    await dispatch(fetchUndooped(1, limit))
    setLoading(false)
  }

  const loadMore = async () => {
    setLoadingMore(true)
    await dispatch(fetchUndooped(page + 1, limit))
    setPage(page + 1)
    if (undoopedDoodles.length === 0) {
      await loadMore()
    }
    setLoadingMore(false)
  }

  const getDoops = async (type) => {
    setLoading(true)
    dispatch({
      type: 'setUndoopedDooplicators',
      payload: [],
    })
    let index = 0
    if (type === undoopedTypes.COMMON) {
      index = 1
    } else if (type === undoopedTypes.RARE) {
      index = 2
    }
    await dispatch(fetchUndoopedDooplicators(index))
    setLoading(false)
  }

  const loadUndooped = (type) => {
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

  const handleMenuSelect = (type) => {
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

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  useEffect(() => {
    document.title = 'Doopmarketeer | Undooped'
    dispatch({
      type: 'setActiveMarketTab',
      payload: marketTabs.UNDOOPED,
    })
    dispatch(fetchCurrencies())
    loadUndooped()
    function loadUndooped() {
      const searchParams = new URL(document.location).searchParams
      if (searchParams.has('type')) {
        const type = searchParams.get('type')
        handleMenuSelect(type)
      } else {
        handleMenuSelect(undoopedTypes.DOODLES)
      }
    }
  }, [])
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
              {loading === true ? (
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
                    {undoopedDoodles.map((doop) => (
                      <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
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
              {loading === true ? (
                <DoodleSpinner />
              ) : (
                <Stack w="full" spacing="4" paddingBottom="8">
                  {undoopedDooplicators.map((doop) => (
                    <DooplicatorCard
                      key={doop.tokenId}
                      tokenId={doop.tokenId}
                      url={doop.url}
                      price={doop.price}
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

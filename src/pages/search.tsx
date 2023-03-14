import { Heading, Container, Stack, Box, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { marketTabs, palette, searchTypes } from '../utils/constants'
import Dooplications from '../components/Dooplications'
import ScrollToTop from '../components/ScrollToTop'
import Nav from '../components/Nav'
import SearchBar from '../components/SearchBar'
import DoodleSpinner from '../components/DoodleSpinner'
import SingleDoop from '../components/SingleDoop'
import DooplicatorCard from '../components/DooplicatorCard'
import {
  setActiveMarketTab,
  setSearchParams,
  selectSearchType,
  selectSearchValue,
  selectSearchLoading,
  setSearchLoading,
  setSearchType,
  setSearchValue,
  resetDooplications,
} from '@/redux/appSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export default function Search() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const loading = useAppSelector(selectSearchLoading)
  const searchValue = useAppSelector(selectSearchValue)
  const searchType = useAppSelector(selectSearchType)

  const handleSearchBar = async (type: string, value: string) => {
    if (value === '') return
    const currentSearch = `${searchType}:${searchValue}`
    const newSearch = `${type}:${value}`
    dispatch(setSearchLoading(true))
    dispatch(setSearchType(type))
    dispatch(setSearchValue(value))

    const searchParams = new URLSearchParams({
      [type]: value,
    })
    const url = `/search?${searchParams}`
    if (currentSearch === newSearch) {
      router.replace(url)
    } else {
      router.push(url)
    }
  }

  useEffect(() => {
    document.title = 'Doopmarketeer | Search'
    dispatch(setActiveMarketTab(marketTabs.SEARCH))
    dispatch(setSearchParams())
    return () => {
      dispatch(setSearchType(searchTypes.ADDRESS))
      dispatch(setSearchValue(''))
      dispatch(resetDooplications())
    }
  }, [router.asPath, dispatch])

  return (
    <>
      <ScrollToTop />
      <Box zIndex="10000" w="100" position="sticky" bg={palette.SKIN_500} top="0">
        <Nav />
        <Container maxW="container.lg" pb="2">
          <Heading color="white" fontFamily="Chalkboard SE,sans-serif" as="h4" size="md" mb="2">
            Search
          </Heading>
          <SearchBar onSubmit={handleSearchBar} value={searchValue} type={searchType} />
        </Container>
      </Box>
      <Container maxW="container.lg">
        <Stack w="full" paddingBottom="8">
          {loading === true ? <DoodleSpinner /> : ''}
          {
            {
              [searchTypes.ADDRESS]: <Dooplications address={searchValue} />,
              [searchTypes.DOODLE]: <SingleDoop tokenId={Number(searchValue)} />,
              [searchTypes.DOOPLICATOR]: <DooplicatorCard tokenId={Number(searchValue)} />,
            }[searchType]
          }
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

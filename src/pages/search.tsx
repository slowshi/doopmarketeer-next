import { Heading, Container, Stack, Box, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { marketTabs, palette, searchTypes } from '../utils/constants'
import Dooplications from '../components/Dooplications'
import ScrollToTop from '../components/ScrollToTop'
import Nav from '../components/Nav'
import SearchBar from '../components/SearchBar'
import DoodleSpinner from '../components/DoodleSpinner'
import SingleDoop from '../components/SingleDoop'
import DooplicatorCard from '../components/DooplicatorCard'
import { fetchCurrencies, loadSearchParams } from '@/redux/actions'
export default function Search() {
  const dispatch = useDispatch()
  const router = useRouter()
  const loading = useSelector((state) => state.app.searchLoading)
  const searchValue = useSelector((state) => state.app.searchValue)
  const searchType = useSelector((state) => state.app.searchType)

  const handleSearchBar = async ({ value, type }) => {
    if (value === '') return
    if (type === searchTypes.DOODLE && isNaN(value)) return
    const currentSearch = `${searchType}:${searchValue}`
    const newSearch = `${type}:${value}`
    dispatch({
      type: 'setSearchLoading',
      payload: true,
    })
    dispatch({
      type: 'setSearchType',
      payload: type,
    })
    dispatch({
      type: 'setSearchValue',
      payload: value,
    })

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
    dispatch({
      type: 'setActiveMarketTab',
      payload: marketTabs.SEARCH,
    })

    dispatch(fetchCurrencies())
    dispatch(loadSearchParams())

    return () => {
      dispatch({
        type: 'setSearchType',
        payload: searchTypes.ADDRESS,
      })
      dispatch({
        type: 'setSearchValue',
        payload: '',
      })
      dispatch({
        type: 'setDooplications',
        payload: [],
      })
    }
  }, [router.query, dispatch])

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
              [searchTypes.DOODLE]: <SingleDoop tokenId={searchValue} />,
              [searchTypes.DOOPLICATOR]: <DooplicatorCard tokenId={searchValue} />,
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

import {
  Card,
  CardBody,
  Box,
  Stack,
  Text,
  Link,
  Container,
  Heading,
  Stat,
  SimpleGrid,
  StatLabel,
  StatNumber,
  useBreakpointValue,
  StatHelpText,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { marketTabs, palette } from '@/utils/constants'
import ScrollToTop from '@/components/ScrollToTop'
import Nav from '@/components/Nav'
import DoodleSpinner from '@/components/DoodleSpinner'
import NextLink from 'next/link'
import {
  selectLeaderboard,
  selectLeaderboardLength,
  selectLeaderboardTotals,
  setActiveMarketTab,
  setSortLeaderboard,
} from '@/redux/appSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGetLeaderboardQuery } from '@/services/api'
import { LeaderboardUser } from '@/interfaces/DoopTransactions'

export default function Leaderbaord() {
  const dispatch = useAppDispatch()
  const { isLoading } = useGetLeaderboardQuery()
  // const totalDoopers = useAppSelector(selectLeaderboardLength)
  const totals = useAppSelector(selectLeaderboardTotals)
  const leaderboard = useAppSelector(selectLeaderboard)

  useEffect(() => {
    document.title = 'Doopmarketeer | Leaderboard'
    dispatch(setActiveMarketTab(marketTabs.LEADERBOARD))
  }, [dispatch])

  const fontSize = useBreakpointValue({ base: 'sm', sm: 'md' })

  return (
    <>
      <ScrollToTop />
      <Box zIndex="10000" w="100" position="sticky" bg={palette.SKIN_500} top="0">
        <Nav />
        <Container maxW="container.lg" mb="2">
          <Heading color="white" fontFamily="Chalkboard SE,sans-serif" as="h4" size="md">
            Leaderboard
          </Heading>
        </Container>
      </Box>
      <Container maxW="container.lg">
        <Stack w="full" paddingBottom="8">
          {isLoading === true ? (
            <DoodleSpinner />
          ) : (
            <Stack w="full">
              <Card w="full">
                <CardBody>
                  <SimpleGrid columns={[2, null, 4]} spacing="2">
                    <Stat>
                      <StatLabel>Total Doopers</StatLabel>
                      <StatNumber>{totals.doopers}</StatNumber>
                      <StatHelpText>
                        Unique {totals.onlyDoopers} |{' '}
                        {Number(totals.onlyDoopers / totals.doopers).toLocaleString(undefined, {
                          style: 'percent',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Total Doops</StatLabel>
                      <StatNumber>{totals.all}</StatNumber>
                      <StatHelpText>
                        Progress{' '}
                        {Number(totals.all / 9375).toLocaleString(undefined, {
                          style: 'percent',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Total Openers</StatLabel>
                      <StatNumber>{totals.openers}</StatNumber>
                      <StatHelpText>
                        Unique {totals.onlyOpeners} |{' '}
                        {Number(totals.onlyOpeners / totals.openers).toLocaleString(undefined, {
                          style: 'percent',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Total Boxes</StatLabel>
                      <StatNumber>{totals.box}</StatNumber>
                      <StatHelpText>
                        Progress{' '}
                        {Number(totals.box / 24000).toLocaleString(undefined, {
                          style: 'percent',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Dooplicator</StatLabel>
                      <StatNumber>{totals.dooplicator}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>DoopMarket</StatLabel>
                      <StatNumber>{totals.market}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Volume</StatLabel>
                      <StatNumber>{`${Math.round((totals.volume / 10e17) * 100) / 100} Ξ`}</StatNumber>
                    </Stat>
                  </SimpleGrid>
                </CardBody>
              </Card>
              <Card w="full">
                <CardBody>
                  <Stack w="full">
                    <Box w="full" display="flex" justifyContent="space-between">
                      <Text fontSize={fontSize} flex="2">
                        Address
                      </Text>
                      <Link
                        fontWeight="bold"
                        color={palette.ORANGE_100}
                        fontSize={fontSize}
                        flex="1"
                        onClick={() => dispatch(setSortLeaderboard('dooplicate'))}
                      >
                        Doop
                      </Link>
                      <Link
                        fontWeight="bold"
                        color={palette.ORANGE_100}
                        fontSize={fontSize}
                        flex="1"
                        onClick={() => dispatch(setSortLeaderboard('dooplicateItem'))}
                      >
                        Market
                      </Link>
                      <Link
                        fontWeight="bold"
                        color={palette.ORANGE_100}
                        fontSize={fontSize}
                        flex="1"
                        onClick={() => dispatch(setSortLeaderboard('totalDoops'))}
                      >
                        Total
                      </Link>
                      <Link
                        fontWeight="bold"
                        color={palette.ORANGE_100}
                        fontSize={fontSize}
                        flex="1"
                        onClick={() => dispatch(setSortLeaderboard('genesisBox'))}
                      >
                        Box
                      </Link>
                      <Link
                        fontWeight="bold"
                        color={palette.ORANGE_100}
                        fontSize={fontSize}
                        flex="1"
                        onClick={() => dispatch(setSortLeaderboard('value'))}
                      >
                        Volume
                      </Link>
                    </Box>
                    {leaderboard.map((user: LeaderboardUser) => (
                      <Box key={user.address} w="full" display="flex" justifyContent="space-between">
                        <Link
                          fontWeight="bold"
                          color={palette.ORANGE_100}
                          fontSize={fontSize}
                          flex="2"
                          as={NextLink}
                          href={`/search?address=${user.address}`}
                        >
                          {user.shortAddress}
                        </Link>
                        <Text fontSize={fontSize} flex="1">
                          {user.dooplicate}
                        </Text>
                        <Text fontSize={fontSize} flex="1">
                          {user.dooplicateItem}
                        </Text>
                        <Text fontSize={fontSize} flex="1">
                          {user.totalDoops}
                        </Text>
                        <Text fontSize={fontSize} flex="1">
                          {user.genesisBox}
                        </Text>
                        <Text fontSize={fontSize} flex="1">{`${Math.round((user.value / 10e17) * 100) / 100} Ξ`}</Text>
                      </Box>
                    ))}
                  </Stack>
                </CardBody>
              </Card>
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

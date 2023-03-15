import {
  Card,
  CardBody,
  Image,
  Text,
  Flex,
  Box,
  Skeleton,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  SkeletonCircle,
  Link,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { currencyMap, IPFS_URL, palette } from '@/utils/constants'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectSearchLoading, setSearchLoading } from '@/redux/appSlice'
import { useGetDooplicatiorAssetsQuery } from '@/services/api'
import { RootState } from '@/redux/appStore'

interface Props {
  tokenId: number
  price?: number
  url?: string
}

function DooplicatorCard({ tokenId, price, url }: Props) {
  const dispatch = useAppDispatch()
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  useGetDooplicatiorAssetsQuery(tokenId)
  const loading = useAppSelector(selectSearchLoading)
  const image = useAppSelector((state: RootState) => {
    const data = state.app.dooplicatorAssets[tokenId]
    if (typeof data === 'undefined') return ''
    return `${IPFS_URL}/${data.image.substring(7)}`
  })
  type DoopAttributeMap = { [key: string]: string }
  const attributes = useAppSelector((state: RootState): DoopAttributeMap => {
    const data = state.app.dooplicatorAssets[tokenId]
    if (typeof data === 'undefined') return {} as DoopAttributeMap
    return data.attributes.reduce((acc, item) => {
      return {
        ...acc,
        [item.trait_type]: item.value,
      }
    }, {} as DoopAttributeMap)
  })

  function imageLoaded() {
    setAvatarLoaded(true)
  }

  useEffect(() => {
    dispatch(setSearchLoading(false))
  }, [tokenId, loading, dispatch])

  return (
    <Card>
      <CardBody>
        <Flex flexWrap="wrap" flexFlow="column">
          <Flex>
            <Box me="6">
              <SkeletonCircle w="90px" h="90px" isLoaded={avatarLoaded}>
                <Image rounded="full" w="90px" src={image} onLoad={imageLoaded} alt="doodle"></Image>
              </SkeletonCircle>
              <Skeleton height="22px" w="full" isLoaded={avatarLoaded}>
                <Center>
                  <Text>#{tokenId}</Text>
                </Center>
              </Skeleton>
            </Box>
            <Box>
              <Skeleton isLoaded={avatarLoaded}>
                <Text m="2">{attributes['Rarity']}</Text>
              </Skeleton>
              {typeof price !== 'undefined' ? (
                <Skeleton isLoaded={avatarLoaded}>
                  <Text m="2">
                    Cost {Number(price / 10e17).toLocaleString(undefined, currencyMap.eth.toLocaleString)} Ξ
                  </Text>
                </Skeleton>
              ) : (
                ''
              )}
              {typeof url !== 'undefined' ? (
                <Skeleton isLoaded={avatarLoaded}>
                  <Link m="2" fontWeight="bold" color={palette.ORANGE_100} href={url} isExternal>
                    Link
                  </Link>
                </Skeleton>
              ) : (
                ''
              )}
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                <Skeleton isLoaded={avatarLoaded}>
                  <Stat m="2">
                    <StatLabel>OG Wearables charge</StatLabel>
                    <StatNumber>{attributes['OG Wearables charge']}</StatNumber>
                  </Stat>
                </Skeleton>
                <Skeleton isLoaded={avatarLoaded}>
                  <Stat m="2">
                    <StatLabel>Space Doodles charge</StatLabel>
                    <StatNumber>{attributes['Space Doodles charge']}</StatNumber>
                  </Stat>
                </Skeleton>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default DooplicatorCard

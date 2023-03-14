import { Image, Skeleton, Text, Box, Badge } from '@chakra-ui/react'
import { useState } from 'react'
import { palette } from '@/utils/constants'
import { Wearable } from '@/interfaces/Doodle'
interface WearableImageParams {
  item: Wearable
  rarity?: number
}
function WearbleImage({ item, rarity }: WearableImageParams) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Box>
      <Skeleton rounded="xl" w="90px" h="90px" isLoaded={loaded}>
        <Box position="relative">
          <Image
            bg={palette.SKIN_700}
            w="90px"
            rounded="xl"
            src={item?.image_uri}
            onLoad={() => setLoaded(true)}
            alt="wearable"
          ></Image>
          {rarity ? (
            <Badge position="absolute" top="0" right="0" colorScheme="white" color="white" me="1">
              {rarity}x
            </Badge>
          ) : (
            ''
          )}
        </Box>
      </Skeleton>
      <Text textAlign="center">{item?.cost}</Text>
    </Box>
  )
}

export default WearbleImage

import { selectSearchLoading, setSearchLoading } from '@/redux/appSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import DoodleCard from './DoodleCard'
interface Props {
  tokenId?: string
}

function SingleDoop({ tokenId }: Props) {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectSearchLoading)

  useEffect(() => {
    dispatch(setSearchLoading(false))
  }, [dispatch, tokenId, loading])

  return (
    <DoodleCard
      doop={{
        tokenId,
        dooplicatorId: '',
        functionName: '',
        timeStamp: 0,
        from: '',
      }}
    ></DoodleCard>
  )
}
export default SingleDoop

import { DoopTransactionInfo } from '@/interfaces/DoopTransactions'
import { selectSearchLoading, setSearchLoading } from '@/redux/appSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import DoodleCard from './DoodleCard'
interface Props {
  tokenId: number
}

function SingleDoop({ tokenId }: Props) {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectSearchLoading)

  useEffect(() => {
    dispatch(setSearchLoading(false))
  }, [dispatch, tokenId, loading])

  return (
    <DoodleCard
      doop={
        {
          tokenId,
          dooplicatorId: '',
          functionName: '',
          timeStamp: 0,
          from: '',
        } as DoopTransactionInfo
      }
    ></DoodleCard>
  )
}
export default SingleDoop

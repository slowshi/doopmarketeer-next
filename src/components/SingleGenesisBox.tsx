import { DoopTransactionInfo } from '@/interfaces/DoopTransactions'
import { selectSearchLoading, setSearchLoading } from '@/redux/appSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import GenesisBoxCard from './GenesisBoxCard'
interface Props {
  tokenId: number
}

function SingleGenesisBox({ tokenId }: Props) {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectSearchLoading)

  useEffect(() => {
    dispatch(setSearchLoading(false))
  }, [dispatch, tokenId, loading])

  return (
    <GenesisBoxCard
      genesisBox={
        {
          tokenId,
          dooplicatorId: '',
          functionName: '',
          timeStamp: 0,
          from: '',
        } as DoopTransactionInfo
      }
    ></GenesisBoxCard>
  )
}
export default SingleGenesisBox

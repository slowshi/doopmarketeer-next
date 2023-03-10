import { getCurrencyConversion } from '@/utils/ethersUtils'
export const fetchCurrencies = () => {
  console.log('this getting hammered')
  return async (dispatch) => {
    const eth = await getCurrencyConversion('eth')
    const flow = await getCurrencyConversion('flow')
    dispatch({
      type: 'setEthPrice',
      payload: eth,
    })
    dispatch({
      type: 'setFlowPrice',
      payload: flow,
    })
  }
}

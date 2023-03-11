import { getCurrencyConversion } from '@/utils/ethersUtils'
import cacheFetch from '@/utils/cacheFetch'
import { API_URL, DOOPLICATOR_URL, searchTypes } from '@/utils/constants'

export const fetchCurrencies = () => async (dispatch) => {
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

export const fetchHistory = (page) => async (dispatch) => {
  const data = await cacheFetch(`${API_URL}/history?page=${page}&limit=5`)
  dispatch({
    type: 'appendFeed',
    payload: data,
  })
}

export const checkFeed = (blockNumber) => async (dispatch) => {
  if (blockNumber === 0) return
  const data = await cacheFetch(`${API_URL}/feed?startBlock=${blockNumber}`, true)
  dispatch({
    type: 'prependFeed',
    payload: data,
  })
}

export const fetchDoopmarket = () => async (dispatch) => {
  const data = await cacheFetch(`${API_URL}/doopmarket`)
  dispatch({
    type: 'setDoopMarket',
    payload: data,
  })
}

export const fetchDoops = (address) => async (dispatch) => {
  dispatch({
    type: 'setDooplications',
    payload: [],
  })
  const data = await cacheFetch(`${API_URL}/doops?address=${address}`)
  dispatch({
    type: 'setDooplications',
    payload: data,
  })
  dispatch({
    type: 'setSearchLoading',
    payload: false,
  })
}

export const fetchUndooped = (page, limit) => async (dispatch) => {
  const data = await cacheFetch(`${API_URL}/doodleFloor?page=${page}&limit=${limit}`)
  dispatch({
    type: 'appendUndoopedDoodles',
    payload: data,
  })
}

export const fetchUndoopedDooplicators = (rarity) => async (dispatch) => {
  const data = await cacheFetch(`${API_URL}/doopFloor?rarity=${rarity}`)
  dispatch({
    type: 'setUndoopedDooplicators',
    payload: data,
  })
}

export const fetchLeaderboard = () => async (dispatch) => {
  const data = await cacheFetch(`${API_URL}/leaderboard`)
  dispatch({
    type: 'setLeaderboard',
    payload: data,
  })
}

export const fetchDoodleCardAssets = (tokenId, doopId) => async (dispatch) => {
  const data = await cacheFetch(`${API_URL}/assets/${tokenId}`)
  dispatch({
    type: 'addAssets',
    payload: {
      tokenId: tokenId,
      data,
    },
  })

  if (doopId !== '' && typeof doopId !== 'undefined') {
    const data = await cacheFetch(`${DOOPLICATOR_URL}/${doopId}`)
    dispatch({
      type: 'addDooplicatorAssets',
      payload: {
        tokenId: doopId,
        data,
      },
    })
  }
}

export const loadSearchParams = () => (dispatch) => {
  const searchParams = new URL(document.location).searchParams
  let type = ''
  let value = ''
  if (searchParams.has(searchTypes.ADDRESS)) {
    type = searchTypes.ADDRESS
    value = searchParams.get(searchTypes.ADDRESS)
  } else if (searchParams.has(searchTypes.DOOPLICATOR)) {
    type = searchTypes.DOOPLICATOR
    value = searchParams.get(searchTypes.DOOPLICATOR)
  } else if (searchParams.has(searchTypes.DOODLE)) {
    type = searchTypes.DOODLE
    value = searchParams.get(searchTypes.DOODLE)
  } else if (searchParams.has(searchTypes.GENESIS_BOX)) {
    type = searchTypes.GENESIS_BOX
    value = searchParams.get(searchTypes.GENESIS_BOX)
  }
  if (type !== '') {
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
  }
}

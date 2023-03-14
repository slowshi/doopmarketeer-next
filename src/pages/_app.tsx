import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { extendTheme } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react'
import { store } from '@/redux/appStore'
import { getCurrencies } from '@/redux/appSlice'
const theme = extendTheme({
  fonts: {
    body: 'Chalkboard SE, sans-serif',
    heading: 'Chalkboard SE, sans-serif',
  },
})

export default function App({ Component, pageProps }: AppProps) {
  store.dispatch(getCurrencies())
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Analytics />
      </ChakraProvider>
    </Provider>
  )
}

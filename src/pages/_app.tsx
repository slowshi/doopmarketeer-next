import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { extendTheme } from '@chakra-ui/react'
import { useStore } from '@/redux/store'

const theme = extendTheme({
  fonts: {
    body: 'Chalkboard SE, sans-serif',
    heading: 'Chalkboard SE, sans-serif',
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

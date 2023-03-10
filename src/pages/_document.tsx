import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/dood.png" />
        {/* <meta property="og:viewport" key="viewport" name="viewport" content="width=device-width, initial-scale=1.0" /> */}

        <meta property="og:title" key="title" name="title" content="doopmarketeer" />
        <meta
          property="og:description"
          key="description"
          name="description"
          content="follow the doop marketplace here"
        />
        <meta property="og:theme-color" key="theme-color" name="theme-color" content="#a4a4f4" />
        <meta
          property="og:apple-mobile-web-app-title"
          key="apple-mobile-web-app-title"
          name="apple-mobile-web-app-title"
          content="doopmarketeer"
        />
        <meta
          property="og:apple-mobile-web-app-capable"
          key="apple-mobile-web-app-capable"
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          property="og:apple-mobile-web-app-status-bar-style"
          key="apple-mobile-web-app-status-bar-style"
          name="apple-mobile-web-app-status-bar-style"
          content="#E5CBCA"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

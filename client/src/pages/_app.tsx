import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import { Global } from "@emotion/react"
import { AppProps } from "next/app"
import apolloClient from "../apolloClient"
import theme from "../theme"
import Router from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import "../styles/globals.css"
import fonts from "../theme/fonts/font-face"

Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Global styles={fonts} />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp

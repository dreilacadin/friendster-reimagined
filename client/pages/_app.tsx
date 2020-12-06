import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import "../styles/globals.css"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp

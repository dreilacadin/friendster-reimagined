import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { createStandaloneToast } from "@chakra-ui/react"

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const toast = createStandaloneToast()
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  if (networkError && typeof window !== "undefined" && !window.navigator.onLine) {
    toast({
      title: "Network error",
      description: "Sorry your browser is offline",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true
    })
  }
})

export default new ApolloClient({
  link: errorLink.concat(httpLink),
  credentials: "include",
  cache: new InMemoryCache()
})

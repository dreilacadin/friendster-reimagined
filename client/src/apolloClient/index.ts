import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { createStandaloneToast } from "@chakra-ui/react"

const httpLink = createHttpLink({ uri: process.env.NEXT_PUBLIC_API_URL, credentials: "include" })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const toast = createStandaloneToast()
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      return toast({
        title: "An Error has occurred",
        description: message,
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true
      })
    })
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
  cache: new InMemoryCache()
})

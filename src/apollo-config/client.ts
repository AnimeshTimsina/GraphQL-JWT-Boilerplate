import { ApolloClient, HttpLink, NormalizedCacheObject } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { cache } from "./cache"
import { getAccessToken } from "./tokenModifier"


export const ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}`

const httpLink = new HttpLink({
  uri: ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken()?.token
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  }
})

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    mutate: {
      errorPolicy: "none",
    },
    query: {
      errorPolicy: "none",
    },
  },
})

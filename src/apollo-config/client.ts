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

// const errorLink = onError(({ graphQLErrors, networkError,operation,forward }) => {
//   if (graphQLErrors) {
//     for (let err of graphQLErrors) {
//       err && console.log(JSON.stringify(err))
//       // switch (err?.extensions?.code) {
//       //   // Apollo Server sets code to UNAUTHENTICATED
//       //   // when an AuthenticationError is thrown in a resolver
//       //   // case 'UNAUTHENTICATED':

//       //   //   // Modify the operation context with a new token
//       //   //   const oldHeaders = operation.getContext().headers;
//       //   //   operation.setContext({
//       //   //     headers: {
//       //   //       ...oldHeaders,
//       //   //       authorization: getNewToken(),
//       //   //     },
//       //   //   });
//       //   //   // Retry the request, returning the new observable
//       //   //   return forward(operation);
//       // }
//     }
//   }
// });

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

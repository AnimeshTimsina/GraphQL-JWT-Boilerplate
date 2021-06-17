import { ApolloClient, HttpLink, NormalizedCacheObject } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { cache } from "./cache"
import {onError} from "@apollo/client/link/error"
import { deleteRefreshToken, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "./tokenModifier"
import { LOGIN_FROM_REFRESH_TOKEN } from "graphql/mutations"
import { loginFromRefreshToken, loginFromRefreshTokenVariables } from "graphql/generated/loginFromRefreshToken"


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

const errorLink = onError(({ graphQLErrors,operation,forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.message.includes("AnonymousUser")) {
        console.log("Token has expired")
        const rftkn = getRefreshToken()
        rftkn && client.mutate<loginFromRefreshToken,loginFromRefreshTokenVariables>({
          mutation: LOGIN_FROM_REFRESH_TOKEN,
          variables:{
            refreshToken: rftkn
          }
        })
        .then(({data}) => {
          if (data?.refreshToken) {
            setAccessToken(data.refreshToken.token)
            setRefreshToken(data.refreshToken.refreshToken)
            //TODO: save user to cache
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: data.refreshToken.token,
              },
            });
            // Retry the request, returning the new observable
            return forward(operation);
          } else {
            deleteRefreshToken()
            //TODO: navigate to login page
          }
        })
        .catch(_ => {
          deleteRefreshToken()
           //TODO: navigate to login page
        })

      }
      // err && console.log(JSON.stringify(err))
      // switch (err?.extensions?.code) {
      //   // Apollo Server sets code to UNAUTHENTICATED
      //   // when an AuthenticationError is thrown in a resolver
      //   // case 'UNAUTHENTICATED':

      //   //   // Modify the operation context with a new token
      //   //   const oldHeaders = operation.getContext().headers;
      //   //   operation.setContext({
      //   //     headers: {
      //   //       ...oldHeaders,
      //   //       authorization: getNewToken(),
      //   //     },
      //   //   });
      //   //   // Retry the request, returning the new observable
      //   //   return forward(operation);
      // }
    }
  }
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
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

import { gql } from "@apollo/client"

export const LOGIN_FROM_REFRESH_TOKEN = gql`
  mutation loginFromRefreshToken($refreshToken: String) {
    __typename
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
      user {
        email    
        id
        username
      }
    }
  }
`

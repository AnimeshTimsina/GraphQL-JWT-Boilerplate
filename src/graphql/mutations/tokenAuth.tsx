import { gql } from "@apollo/client"

export const LOGIN_FROM_CREDENTIALS = gql`
  mutation loginFromCredentials($username: String!, $password: String!) {
    __typename
    tokenAuth(username: $username, password: $password) {
      refreshToken
      token
      user {
        email    
        id
        username
      }
    }
  }
`

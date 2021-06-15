import { gql } from "@apollo/client"

export const LOG_OUT_AND_DELETE_REFRESH = gql`
  mutation deleteRefreshToken($refreshToken: String!) {
    __typename
    deleteRefreshtoken(refreshToken: $refreshToken) {
      output {
        errors
        success
      }
    }
  }
`

import { gql } from "@apollo/client"

export const GET_ACCESS_TOKEN_LOCALLY = gql`
  query getAccessTokenLocally {
    accessToken @client {
      token
    }
  }
`
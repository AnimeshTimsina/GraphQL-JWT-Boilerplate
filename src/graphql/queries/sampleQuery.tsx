import { gql } from "@apollo/client"

export const GET_RISKS = gql`
  query myRiskAssessments {
    allRiskassessments {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`
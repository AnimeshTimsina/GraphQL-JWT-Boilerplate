import { ApolloError } from "@apollo/client";

export const alertErrorHandler = ({networkError,graphQLErrors}:ApolloError) => {
    if (graphQLErrors)
    graphQLErrors.map(({ message}) =>
     alert(
        `Error: ${message}`
      )
    );
  if (networkError) alert(`No internet connection !`);
} 
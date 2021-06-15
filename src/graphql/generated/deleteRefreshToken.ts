/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteRefreshToken
// ====================================================

export interface deleteRefreshToken_deleteRefreshtoken_output {
  __typename: "Output";
  errors: ScalarExpectedErrorType | null;
  success: boolean | null;
}

export interface deleteRefreshToken_deleteRefreshtoken {
  __typename: "DeleteRefreshToken";
  output: deleteRefreshToken_deleteRefreshtoken_output | null;
}

export interface deleteRefreshToken {
  deleteRefreshtoken: deleteRefreshToken_deleteRefreshtoken | null;
}

export interface deleteRefreshTokenVariables {
  refreshToken: string;
}

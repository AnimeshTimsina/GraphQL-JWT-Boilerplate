/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginFromRefreshToken
// ====================================================

export interface loginFromRefreshToken_refreshToken_user {
  __typename: "UserNode";
  email: string;
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface loginFromRefreshToken_refreshToken {
  __typename: "Refresh";
  token: string;
  refreshToken: string;
  user: loginFromRefreshToken_refreshToken_user | null;
}

export interface loginFromRefreshToken {
  refreshToken: loginFromRefreshToken_refreshToken | null;
}

export interface loginFromRefreshTokenVariables {
  refreshToken?: string | null;
}

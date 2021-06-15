/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginFromCredentials
// ====================================================

export interface loginFromCredentials_tokenAuth_user {
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

export interface loginFromCredentials_tokenAuth {
  __typename: "ObtainJSONWebToken";
  refreshToken: string;
  token: string;
  user: loginFromCredentials_tokenAuth_user | null;
}

export interface loginFromCredentials {
  tokenAuth: loginFromCredentials_tokenAuth | null;
}

export interface loginFromCredentialsVariables {
  username: string;
  password: string;
}

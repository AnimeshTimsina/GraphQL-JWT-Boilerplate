/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myRiskAssessments
// ====================================================

export interface myRiskAssessments_allRiskassessments_edges_node {
  __typename: "RiskAssessmentNode";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
}

export interface myRiskAssessments_allRiskassessments_edges {
  __typename: "RiskAssessmentNodeEdge";
  /**
   * The item at the end of the edge
   */
  node: myRiskAssessments_allRiskassessments_edges_node | null;
}

export interface myRiskAssessments_allRiskassessments {
  __typename: "RiskAssessmentNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (myRiskAssessments_allRiskassessments_edges | null)[];
}

export interface myRiskAssessments {
  /**
   * List of the risk assessment.
   */
  allRiskassessments: myRiskAssessments_allRiskassessments | null;
}

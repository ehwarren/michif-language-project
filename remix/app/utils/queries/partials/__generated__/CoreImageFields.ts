/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CoreImageFields
// ====================================================

export interface CoreImageFields_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface CoreImageFields_data {
  __typename: "UploadFileEntity";
  attributes: CoreImageFields_data_attributes | null;
}

export interface CoreImageFields {
  __typename: "UploadFileEntityResponse";
  data: CoreImageFields_data | null;
}

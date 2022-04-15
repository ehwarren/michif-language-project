/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CoreSeoFields
// ====================================================

export interface CoreSeoFields_metaImage_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface CoreSeoFields_metaImage_data {
  __typename: "UploadFileEntity";
  attributes: CoreSeoFields_metaImage_data_attributes | null;
}

export interface CoreSeoFields_metaImage {
  __typename: "UploadFileEntityResponse";
  data: CoreSeoFields_metaImage_data | null;
}

export interface CoreSeoFields {
  __typename: "ComponentSharedSeo";
  metaTitle: string;
  metaDescription: string;
  metaImage: CoreSeoFields_metaImage;
  keywords: string | null;
}

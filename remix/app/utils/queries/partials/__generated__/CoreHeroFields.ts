/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CoreHeroFields
// ====================================================

export interface CoreHeroFields_BackgroundImage_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface CoreHeroFields_BackgroundImage_data {
  __typename: "UploadFileEntity";
  attributes: CoreHeroFields_BackgroundImage_data_attributes | null;
}

export interface CoreHeroFields_BackgroundImage {
  __typename: "UploadFileEntityResponse";
  data: CoreHeroFields_BackgroundImage_data | null;
}

export interface CoreHeroFields {
  __typename: "ComponentBlocksHero";
  Title: string | null;
  Subtitle: string | null;
  Preload: boolean | null;
  BackgroundImage: CoreHeroFields_BackgroundImage | null;
}

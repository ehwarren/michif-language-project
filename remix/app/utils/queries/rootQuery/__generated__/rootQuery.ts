/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: rootQuery
// ====================================================

export interface rootQuery_mainMenu_data_attributes_Link {
  __typename: "ComponentBlocksLink";
  Title: string | null;
  Url: string | null;
  NewWindow: boolean | null;
}

export interface rootQuery_mainMenu_data_attributes {
  __typename: "MainMenu";
  Link: (rootQuery_mainMenu_data_attributes_Link | null)[] | null;
}

export interface rootQuery_mainMenu_data {
  __typename: "MainMenuEntity";
  attributes: rootQuery_mainMenu_data_attributes | null;
}

export interface rootQuery_mainMenu {
  __typename: "MainMenuEntityResponse";
  data: rootQuery_mainMenu_data | null;
}

export interface rootQuery_siteAsset_data_attributes_Logo_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface rootQuery_siteAsset_data_attributes_Logo_data {
  __typename: "UploadFileEntity";
  attributes: rootQuery_siteAsset_data_attributes_Logo_data_attributes | null;
}

export interface rootQuery_siteAsset_data_attributes_Logo {
  __typename: "UploadFileEntityResponse";
  data: rootQuery_siteAsset_data_attributes_Logo_data | null;
}

export interface rootQuery_siteAsset_data_attributes_seo_metaImage_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface rootQuery_siteAsset_data_attributes_seo_metaImage_data {
  __typename: "UploadFileEntity";
  attributes: rootQuery_siteAsset_data_attributes_seo_metaImage_data_attributes | null;
}

export interface rootQuery_siteAsset_data_attributes_seo_metaImage {
  __typename: "UploadFileEntityResponse";
  data: rootQuery_siteAsset_data_attributes_seo_metaImage_data | null;
}

export interface rootQuery_siteAsset_data_attributes_seo {
  __typename: "ComponentSharedSeo";
  metaTitle: string;
  metaDescription: string;
  metaImage: rootQuery_siteAsset_data_attributes_seo_metaImage;
  keywords: string | null;
}

export interface rootQuery_siteAsset_data_attributes {
  __typename: "SiteAsset";
  Logo: rootQuery_siteAsset_data_attributes_Logo | null;
  seo: rootQuery_siteAsset_data_attributes_seo | null;
}

export interface rootQuery_siteAsset_data {
  __typename: "SiteAssetEntity";
  attributes: rootQuery_siteAsset_data_attributes | null;
}

export interface rootQuery_siteAsset {
  __typename: "SiteAssetEntityResponse";
  data: rootQuery_siteAsset_data | null;
}

export interface rootQuery_footer_data_attributes {
  __typename: "Footer";
  Heading: string | null;
  Phone: string | null;
  Email: string | null;
  Address: string | null;
}

export interface rootQuery_footer_data {
  __typename: "FooterEntity";
  attributes: rootQuery_footer_data_attributes | null;
}

export interface rootQuery_footer {
  __typename: "FooterEntityResponse";
  data: rootQuery_footer_data | null;
}

export interface rootQuery {
  mainMenu: rootQuery_mainMenu | null;
  siteAsset: rootQuery_siteAsset | null;
  footer: rootQuery_footer | null;
}

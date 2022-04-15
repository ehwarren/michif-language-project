/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_COMPONENTFORMSFORMFIELD_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: homePageQuery
// ====================================================

export interface homePageQuery_homePage_data_attributes_Hero_BackgroundImage_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface homePageQuery_homePage_data_attributes_Hero_BackgroundImage_data {
  __typename: "UploadFileEntity";
  attributes: homePageQuery_homePage_data_attributes_Hero_BackgroundImage_data_attributes | null;
}

export interface homePageQuery_homePage_data_attributes_Hero_BackgroundImage {
  __typename: "UploadFileEntityResponse";
  data: homePageQuery_homePage_data_attributes_Hero_BackgroundImage_data | null;
}

export interface homePageQuery_homePage_data_attributes_Hero {
  __typename: "ComponentBlocksHero";
  Title: string | null;
  Subtitle: string | null;
  Preload: boolean | null;
  BackgroundImage: homePageQuery_homePage_data_attributes_Hero_BackgroundImage | null;
}

export interface homePageQuery_homePage_data_attributes_AlternatingContent_Image_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface homePageQuery_homePage_data_attributes_AlternatingContent_Image_data {
  __typename: "UploadFileEntity";
  attributes: homePageQuery_homePage_data_attributes_AlternatingContent_Image_data_attributes | null;
}

export interface homePageQuery_homePage_data_attributes_AlternatingContent_Image {
  __typename: "UploadFileEntityResponse";
  data: homePageQuery_homePage_data_attributes_AlternatingContent_Image_data | null;
}

export interface homePageQuery_homePage_data_attributes_AlternatingContent {
  __typename: "ComponentBlocksAlternatingContent";
  Heading: string | null;
  Image: homePageQuery_homePage_data_attributes_AlternatingContent_Image | null;
  Content: string | null;
}

export interface homePageQuery_homePage_data_attributes_ContactForm_form_data_attributes_Fields {
  __typename: "ComponentFormsFormField";
  id: string;
  Type: ENUM_COMPONENTFORMSFORMFIELD_TYPE | null;
  Title: string | null;
}

export interface homePageQuery_homePage_data_attributes_ContactForm_form_data_attributes {
  __typename: "Form";
  Title: string | null;
  Fields: (homePageQuery_homePage_data_attributes_ContactForm_form_data_attributes_Fields | null)[] | null;
}

export interface homePageQuery_homePage_data_attributes_ContactForm_form_data {
  __typename: "FormEntity";
  id: string | null;
  attributes: homePageQuery_homePage_data_attributes_ContactForm_form_data_attributes | null;
}

export interface homePageQuery_homePage_data_attributes_ContactForm_form {
  __typename: "FormEntityResponse";
  data: homePageQuery_homePage_data_attributes_ContactForm_form_data | null;
}

export interface homePageQuery_homePage_data_attributes_ContactForm {
  __typename: "ComponentBlocksContactForm";
  form: homePageQuery_homePage_data_attributes_ContactForm_form | null;
}

export interface homePageQuery_homePage_data_attributes_seo_metaImage_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface homePageQuery_homePage_data_attributes_seo_metaImage_data {
  __typename: "UploadFileEntity";
  attributes: homePageQuery_homePage_data_attributes_seo_metaImage_data_attributes | null;
}

export interface homePageQuery_homePage_data_attributes_seo_metaImage {
  __typename: "UploadFileEntityResponse";
  data: homePageQuery_homePage_data_attributes_seo_metaImage_data | null;
}

export interface homePageQuery_homePage_data_attributes_seo {
  __typename: "ComponentSharedSeo";
  metaTitle: string;
  metaDescription: string;
  metaImage: homePageQuery_homePage_data_attributes_seo_metaImage;
  keywords: string | null;
}

export interface homePageQuery_homePage_data_attributes {
  __typename: "HomePage";
  Hero: homePageQuery_homePage_data_attributes_Hero | null;
  AlternatingContent: (homePageQuery_homePage_data_attributes_AlternatingContent | null)[] | null;
  ContactForm: homePageQuery_homePage_data_attributes_ContactForm | null;
  seo: homePageQuery_homePage_data_attributes_seo | null;
}

export interface homePageQuery_homePage_data {
  __typename: "HomePageEntity";
  attributes: homePageQuery_homePage_data_attributes | null;
}

export interface homePageQuery_homePage {
  __typename: "HomePageEntityResponse";
  data: homePageQuery_homePage_data | null;
}

export interface homePageQuery {
  homePage: homePageQuery_homePage | null;
}

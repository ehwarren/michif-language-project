/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_COMPONENTFORMSFORMFIELD_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: pageBySlugQuery
// ====================================================

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_Error {
  __typename: "Error";
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksHero_BackgroundImage_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksHero_BackgroundImage_data {
  __typename: "UploadFileEntity";
  attributes: pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksHero_BackgroundImage_data_attributes | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksHero_BackgroundImage {
  __typename: "UploadFileEntityResponse";
  data: pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksHero_BackgroundImage_data | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksHero {
  __typename: "ComponentBlocksHero";
  id: string;
  Title: string | null;
  Subtitle: string | null;
  Preload: boolean | null;
  BackgroundImage: pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksHero_BackgroundImage | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksContactForm_form_data_attributes_Fields {
  __typename: "ComponentFormsFormField";
  id: string;
  Type: ENUM_COMPONENTFORMSFORMFIELD_TYPE | null;
  Title: string | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksContactForm_form_data_attributes {
  __typename: "Form";
  Title: string | null;
  Fields: (pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksContactForm_form_data_attributes_Fields | null)[] | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksContactForm_form_data {
  __typename: "FormEntity";
  id: string | null;
  attributes: pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksContactForm_form_data_attributes | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksContactForm_form {
  __typename: "FormEntityResponse";
  data: pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksContactForm_form_data | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksContactForm {
  __typename: "ComponentBlocksContactForm";
  id: string;
  form: pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksContactForm_form | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksImageContent_Image_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksImageContent_Image_data {
  __typename: "UploadFileEntity";
  attributes: pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksImageContent_Image_data_attributes | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksImageContent_Image {
  __typename: "UploadFileEntityResponse";
  data: pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksImageContent_Image_data | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksImageContent {
  __typename: "ComponentBlocksImageContent";
  id: string;
  Heading: string | null;
  Image: pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksImageContent_Image | null;
  Content: string | null;
  Reverse: boolean | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksTextBlock {
  __typename: "ComponentBlocksTextBlock";
  id: string;
  Content: string | null;
}

export type pageBySlugQuery_pageBySlug_data_attributes_Blocks = pageBySlugQuery_pageBySlug_data_attributes_Blocks_Error | pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksHero | pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksContactForm | pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksImageContent | pageBySlugQuery_pageBySlug_data_attributes_Blocks_ComponentBlocksTextBlock;

export interface pageBySlugQuery_pageBySlug_data_attributes_seo_metaImage_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_seo_metaImage_data {
  __typename: "UploadFileEntity";
  attributes: pageBySlugQuery_pageBySlug_data_attributes_seo_metaImage_data_attributes | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_seo_metaImage {
  __typename: "UploadFileEntityResponse";
  data: pageBySlugQuery_pageBySlug_data_attributes_seo_metaImage_data | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes_seo {
  __typename: "ComponentSharedSeo";
  metaTitle: string;
  metaDescription: string;
  metaImage: pageBySlugQuery_pageBySlug_data_attributes_seo_metaImage;
  keywords: string | null;
}

export interface pageBySlugQuery_pageBySlug_data_attributes {
  __typename: "Page";
  Title: string | null;
  Blocks: (pageBySlugQuery_pageBySlug_data_attributes_Blocks | null)[] | null;
  seo: pageBySlugQuery_pageBySlug_data_attributes_seo | null;
}

export interface pageBySlugQuery_pageBySlug_data {
  __typename: "PageEntity";
  attributes: pageBySlugQuery_pageBySlug_data_attributes | null;
}

export interface pageBySlugQuery_pageBySlug {
  __typename: "PageEntityResponse";
  data: pageBySlugQuery_pageBySlug_data | null;
}

export interface pageBySlugQuery {
  pageBySlug: pageBySlugQuery_pageBySlug | null;
}

export interface pageBySlugQueryVariables {
  slug: string;
}

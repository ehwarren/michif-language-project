/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_GLOSSARYITEM_PARTOFSPEECH, ENUM_GLOSSARYITEM_VARIANTTYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: glossarySearchQuery
// ====================================================

export interface glossarySearchQuery_glossaryItems_data_attributes_Image_data_attributes {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
  alternativeText: string | null;
  width: number | null;
}

export interface glossarySearchQuery_glossaryItems_data_attributes_Image_data {
  __typename: "UploadFileEntity";
  attributes: glossarySearchQuery_glossaryItems_data_attributes_Image_data_attributes | null;
}

export interface glossarySearchQuery_glossaryItems_data_attributes_Image {
  __typename: "UploadFileEntityResponse";
  data: glossarySearchQuery_glossaryItems_data_attributes_Image_data | null;
}

export interface glossarySearchQuery_glossaryItems_data_attributes_glossary_categories_data_attributes {
  __typename: "GlossaryCategory";
  Title: string;
}

export interface glossarySearchQuery_glossaryItems_data_attributes_glossary_categories_data {
  __typename: "GlossaryCategoryEntity";
  id: string | null;
  attributes: glossarySearchQuery_glossaryItems_data_attributes_glossary_categories_data_attributes | null;
}

export interface glossarySearchQuery_glossaryItems_data_attributes_glossary_categories {
  __typename: "GlossaryCategoryRelationResponseCollection";
  data: glossarySearchQuery_glossaryItems_data_attributes_glossary_categories_data[];
}

export interface glossarySearchQuery_glossaryItems_data_attributes_glossary_items_data_attributes {
  __typename: "GlossaryItem";
  English: string;
}

export interface glossarySearchQuery_glossaryItems_data_attributes_glossary_items_data {
  __typename: "GlossaryItemEntity";
  id: string | null;
  attributes: glossarySearchQuery_glossaryItems_data_attributes_glossary_items_data_attributes | null;
}

export interface glossarySearchQuery_glossaryItems_data_attributes_glossary_items {
  __typename: "GlossaryItemRelationResponseCollection";
  data: glossarySearchQuery_glossaryItems_data_attributes_glossary_items_data[];
}

export interface glossarySearchQuery_glossaryItems_data_attributes_glossary_items_incoming_data_attributes {
  __typename: "GlossaryItem";
  English: string;
}

export interface glossarySearchQuery_glossaryItems_data_attributes_glossary_items_incoming_data {
  __typename: "GlossaryItemEntity";
  id: string | null;
  attributes: glossarySearchQuery_glossaryItems_data_attributes_glossary_items_incoming_data_attributes | null;
}

export interface glossarySearchQuery_glossaryItems_data_attributes_glossary_items_incoming {
  __typename: "GlossaryItemRelationResponseCollection";
  data: glossarySearchQuery_glossaryItems_data_attributes_glossary_items_incoming_data[];
}

export interface glossarySearchQuery_glossaryItems_data_attributes {
  __typename: "GlossaryItem";
  English: string;
  French: string | null;
  Michif: string;
  ExampleMichif: string | null;
  ExampleEnglish: string | null;
  Phonetics: string | null;
  PartOfSpeech: ENUM_GLOSSARYITEM_PARTOFSPEECH | null;
  SoundUrl: string | null;
  SoundDate: any | null;
  SoundSpeaker: string | null;
  SoundLocation: string | null;
  VariantType: ENUM_GLOSSARYITEM_VARIANTTYPE | null;
  Image: glossarySearchQuery_glossaryItems_data_attributes_Image | null;
  glossary_categories: glossarySearchQuery_glossaryItems_data_attributes_glossary_categories | null;
  glossary_items: glossarySearchQuery_glossaryItems_data_attributes_glossary_items | null;
  glossary_items_incoming: glossarySearchQuery_glossaryItems_data_attributes_glossary_items_incoming | null;
}

export interface glossarySearchQuery_glossaryItems_data {
  __typename: "GlossaryItemEntity";
  id: string | null;
  attributes: glossarySearchQuery_glossaryItems_data_attributes | null;
}

export interface glossarySearchQuery_glossaryItems {
  __typename: "GlossaryItemEntityResponseCollection";
  data: glossarySearchQuery_glossaryItems_data[];
}

export interface glossarySearchQuery {
  glossaryItems: glossarySearchQuery_glossaryItems | null;
}

export interface glossarySearchQueryVariables {
  s: string;
}

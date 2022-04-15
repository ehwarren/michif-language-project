/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_COMPONENTFORMSFORMFIELD_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CoreFormFields
// ====================================================

export interface CoreFormFields_attributes_Fields {
  __typename: "ComponentFormsFormField";
  id: string;
  Type: ENUM_COMPONENTFORMSFORMFIELD_TYPE | null;
  Title: string | null;
}

export interface CoreFormFields_attributes {
  __typename: "Form";
  Title: string | null;
  Fields: (CoreFormFields_attributes_Fields | null)[] | null;
}

export interface CoreFormFields {
  __typename: "FormEntity";
  id: string | null;
  attributes: CoreFormFields_attributes | null;
}

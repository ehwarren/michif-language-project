/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_COMPONENTFORMSFORMFIELD_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: formsQuery
// ====================================================

export interface formsQuery_forms_data_attributes_Fields {
  __typename: "ComponentFormsFormField";
  id: string;
  Type: ENUM_COMPONENTFORMSFORMFIELD_TYPE | null;
  Title: string | null;
}

export interface formsQuery_forms_data_attributes {
  __typename: "Form";
  Title: string | null;
  Fields: (formsQuery_forms_data_attributes_Fields | null)[] | null;
}

export interface formsQuery_forms_data {
  __typename: "FormEntity";
  id: string | null;
  attributes: formsQuery_forms_data_attributes | null;
}

export interface formsQuery_forms {
  __typename: "FormEntityResponseCollection";
  data: formsQuery_forms_data[];
}

export interface formsQuery {
  forms: formsQuery_forms | null;
}

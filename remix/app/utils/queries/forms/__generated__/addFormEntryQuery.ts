/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FormEntryInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addFormEntryQuery
// ====================================================

export interface addFormEntryQuery_createFormEntry_data {
  __typename: "FormEntryEntity";
  id: string | null;
}

export interface addFormEntryQuery_createFormEntry {
  __typename: "FormEntryEntityResponse";
  data: addFormEntryQuery_createFormEntry_data | null;
}

export interface addFormEntryQuery {
  createFormEntry: addFormEntryQuery_createFormEntry | null;
}

export interface addFormEntryQueryVariables {
  input: FormEntryInput;
}

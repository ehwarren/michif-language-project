/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: rootQuert
// ====================================================

export interface rootQuert_mainMenu_data_attributes_Link {
  __typename: "ComponentBlocksLink";
  Title: string | null;
  Url: string | null;
  NewWindow: boolean | null;
}

export interface rootQuert_mainMenu_data_attributes {
  __typename: "MainMenu";
  Link: (rootQuert_mainMenu_data_attributes_Link | null)[] | null;
}

export interface rootQuert_mainMenu_data {
  __typename: "MainMenuEntity";
  attributes: rootQuert_mainMenu_data_attributes | null;
}

export interface rootQuert_mainMenu {
  __typename: "MainMenuEntityResponse";
  data: rootQuert_mainMenu_data | null;
}

export interface rootQuert {
  mainMenu: rootQuert_mainMenu | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mainMenuQuery
// ====================================================

export interface mainMenuQuery_mainMenu_data_attributes_Link {
  __typename: "ComponentBlocksLink";
  Title: string | null;
  Url: string | null;
  NewWindow: boolean | null;
}

export interface mainMenuQuery_mainMenu_data_attributes {
  __typename: "MainMenu";
  Link: (mainMenuQuery_mainMenu_data_attributes_Link | null)[] | null;
}

export interface mainMenuQuery_mainMenu_data {
  __typename: "MainMenuEntity";
  attributes: mainMenuQuery_mainMenu_data_attributes | null;
}

export interface mainMenuQuery_mainMenu {
  __typename: "MainMenuEntityResponse";
  data: mainMenuQuery_mainMenu_data | null;
}

export interface mainMenuQuery {
  mainMenu: mainMenuQuery_mainMenu | null;
}

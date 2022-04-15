import { gql } from "@apollo/client";
import { CORE_IMAGE_FIELDS, CORE_SEO_FIELDS } from "../partials";

const RootQuery = gql`
    ${CORE_IMAGE_FIELDS}
    ${CORE_SEO_FIELDS}
    query rootQuery {
        mainMenu {
            data {
                attributes {
                    Link {
                        Title
                        Url
                        NewWindow
                    }
                }
            }
        }
        siteAsset {
            data {
                attributes {
                    Logo {
                        ...CoreImageFields
                    }
                    seo {
                        ...CoreSeoFields
                    }
                }
            }
        }
        footer {
            data {
                attributes {
                    Heading
                    Phone
                    Email
                    Address
                }
            }
        }
    }
`;

export { RootQuery };

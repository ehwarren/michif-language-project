import { gql } from "@apollo/client";
import { CORE_FORM_FIELDS, CORE_HERO_FIELDS, CORE_IMAGE_FIELDS, CORE_SEO_FIELDS } from "../partials";

const PageBySlugQuery = gql`
    ${CORE_FORM_FIELDS}
    ${CORE_HERO_FIELDS}
    ${CORE_IMAGE_FIELDS}
    ${CORE_SEO_FIELDS}
    query pageBySlugQuery($slug: String!) {
        pageBySlug(slug: $slug) {
            data {
                attributes {
                    Title
                    Blocks {
                        __typename
                        ... on ComponentBlocksHero {
                            id
                            ...CoreHeroFields
                        }
                        ... on ComponentBlocksContactForm {
                            id
                            form {
                                data {
                                    ...CoreFormFields
                                }
                            }
                        }
                        ... on ComponentBlocksImageContent {
                            id
                            Heading
                            Image {
                                ...CoreImageFields
                            }
                            Content
                            Reverse
                        }
                        ... on ComponentBlocksTextBlock {
                            id
                            Content
                        }
                    }
                    seo {
                        ...CoreSeoFields
                    }
                }
            }
        }
    }
`;

export { PageBySlugQuery };

import { gql } from "@apollo/client";

export const CORE_IMAGE_FIELDS = gql`
    fragment CoreImageFields on UploadFileEntityResponse {
        data {
            attributes {
                formats
                url
                alternativeText
                width
            }
        }
    }
`;

export const CORE_FORM_FIELDS = gql`
    fragment CoreFormFields on FormEntity {
        id
        attributes {
            Title
            Fields {
                id
                Type
                Title
            }
        }
    }
`;

export const CORE_HERO_FIELDS = gql`
    ${CORE_IMAGE_FIELDS}
    fragment CoreHeroFields on ComponentBlocksHero {
        Title
        Subtitle
        Preload
        BackgroundImage {
            ...CoreImageFields
        }
    }
`;

export const CORE_SEO_FIELDS = gql`
    fragment CoreSeoFields on ComponentSharedSeo {
        metaTitle
        metaDescription
        metaImage {
            data {
                attributes {
                    formats
                    url
                    alternativeText
                    width
                }
            }
        }
        keywords
    }
`;

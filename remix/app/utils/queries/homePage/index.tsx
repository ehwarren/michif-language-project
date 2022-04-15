import { gql } from "@apollo/client";
import { CORE_FORM_FIELDS, CORE_HERO_FIELDS, CORE_IMAGE_FIELDS, CORE_SEO_FIELDS } from "../partials";

const HomePageQuery = gql`
    ${CORE_SEO_FIELDS}
    ${CORE_IMAGE_FIELDS}
    ${CORE_HERO_FIELDS}
    ${CORE_FORM_FIELDS}
    query homePageQuery {
        homePage {
            data {
                attributes {
                    Hero {
                        ...CoreHeroFields
                    }
                    AlternatingContent {
                        Heading
                        Image {
                            ...CoreImageFields
                        }
                        Content
                    }
                    ContactForm {
                        form {
                            data {
                                ...CoreFormFields
                            }
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

export { HomePageQuery };

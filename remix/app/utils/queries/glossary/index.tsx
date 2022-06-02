import { gql } from "@apollo/client";
import { CORE_IMAGE_FIELDS } from "../partials";

const GlossaryQuery = gql`
    ${CORE_IMAGE_FIELDS}
    query glossaryQuery {
        glossaryItems {
            data {
                id
                attributes {
                    English
                    French
                    Michif
                    ExampleMichif
                    ExampleEnglish
                    Phonetics
                    PartOfSpeech
                    SoundUrl
                    SoundDate
                    SoundSpeaker
                    SoundLocation
                    VariantType
                    Image {
                        ...CoreImageFields
                    }
                    glossary_categories {
                        data {
                            id
                            attributes {
                                Title
                            }
                        }
                    }
                    glossary_items {
                        data {
                            id
                            attributes {
                                English
                            }
                        }
                    }
                    glossary_items_incoming {
                        data {
                            id
                            attributes {
                                English
                            }
                        }
                    }
                }
            }
        }
    }
`;

const GlossarySearchQuery = gql`
    ${CORE_IMAGE_FIELDS}
    query glossarySearchQuery($s: String!) {
        glossaryItems(
            filters: {
                or: [
                    { English: { containsi: $s } }
                    { Michif: { containsi: $s } }
                    { ExampleMichif: { containsi: $s } }
                    { ExampleEnglish: { containsi: $s } }
                    { glossary_categories: { Title: { containsi: $s } } }
                ]
            }
        ) {
            data {
                id
                attributes {
                    English
                    French
                    Michif
                    ExampleMichif
                    ExampleEnglish
                    Phonetics
                    PartOfSpeech
                    SoundUrl
                    SoundDate
                    SoundSpeaker
                    SoundLocation
                    VariantType
                    Image {
                        ...CoreImageFields
                    }
                    glossary_categories {
                        data {
                            id
                            attributes {
                                Title
                            }
                        }
                    }
                    glossary_items {
                        data {
                            id
                            attributes {
                                English
                            }
                        }
                    }
                }
            }
        }
    }
`;

export { GlossaryQuery, GlossarySearchQuery };

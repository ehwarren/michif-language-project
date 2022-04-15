import { gql } from "@apollo/client";
import { CORE_FORM_FIELDS } from "../partials";

const FormsQuery = gql`
    ${CORE_FORM_FIELDS}
    query formsQuery {
        forms {
            data {
                ...CoreFormFields
            }
        }
    }
`;

const AddFormEntryQuery = gql`
    mutation addFormEntryQuery($input: FormEntryInput!) {
        createFormEntry(data: $input) {
            data {
                id
            }
        }
    }
`;

export { FormsQuery, AddFormEntryQuery };

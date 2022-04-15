import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { strapi } from "../../utils/strapi.server";

import { formsQuery, formsQuery_forms_data } from "~/utils/queries/forms/__generated__/formsQuery";
import { AddFormEntryQuery, FormsQuery } from "~/utils/queries/forms";
import Form from "~/components/form";
import { addFormEntryQuery, addFormEntryQueryVariables } from "~/utils/queries/forms/__generated__/addFormEntryQuery";

export const action: ActionFunction = async ({ request }) => {
    const data = await request.formData();

    let formatedData = "";
    data.forEach((value, key) => {
        if (key !== "form") {
            formatedData += `**${key}**\n----------------------\n ${value} \n\n`;
        }
    });

    const formEntry = await strapi.query<addFormEntryQuery, addFormEntryQueryVariables>({
        query: AddFormEntryQuery,
        variables: {
            input: {
                Data: formatedData,
                Form: data.get('form')?.toString() || '1'
            },
        },
    });
    return !formEntry.error;
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const data = await strapi.query<formsQuery>({
        query: FormsQuery,
        variables: {
            s: url.searchParams.get("s") || "",
        },
        fetchPolicy: "no-cache",
    });
    return data.data.forms?.data || [];
};

export default function Index() {
    const data = useLoaderData<formsQuery_forms_data[]>();
    return (
        <div>
            <div className="bg-gradient-to-t from-secondary-800 to-secondary-900 h-80 flex items-center">
                <section className="container mx-auto text-white">
                    <h2>An example form</h2>
                    <p className="text-sm">A form must be declared in strapi before it will render here</p>
                </section>
            </div>
            <section className="container mx-auto">
                {data.map((n, index) => {
                    return (
                        <div className="w-full max-w-xs bg-white shadow-md px-8 py-7 rounded my-4"  key={n.id}>
                            <Form form={n} id={n.id || "form-"+index}/>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}

import { formsQuery_forms_data } from "~/utils/queries/forms/__generated__/formsQuery";
import { Form as RemixForm, useTransition, useActionData, useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";

const Form: React.FC<{ form: formsQuery_forms_data | null | undefined; id: string }> = ({ form, id }) => {
    const formFetcher = useFetcher();
    const ref = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formFetcher.type === "done" && formFetcher.data.ok) {
            ref.current?.reset();
        }
    }, [formFetcher]);

    return form ? (
        <formFetcher.Form ref={ref} action="/forms?index" method="post" id={id}>
            {form.attributes?.Fields?.map((n) => {
                return n ? (
                    <div className="mb-4" key={n.id}>
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={`form${id}-field${n.id}`}>
                            {n?.Title}
                        </label>
                        {n?.Type === "Text_Area" ? (
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name={n.Title || ""}
                                id={`form${id}-field${n.id}`}
                            />
                        ) : (
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name={n.Title || ""}
                                type={n?.Type?.replace("_", "").toLowerCase() || "text"}
                                id={`form${id}-field${n.id}`}
                            />
                        )}
                    </div>
                ) : null;
            })}
            <input type={"hidden"} value={form.id?.toString()} name="form" />
            {formFetcher.data ? (
                formFetcher.data === true ? (
                    "Your form was submitted sucessfully..."
                ) : (
                    "Something went wrong..."
                )
            ) : (
                <button type="submit" className="btn-primary flex">
                    Submit
                    {(formFetcher.state === "submitting" || formFetcher.state === "loading") && (
                        <svg className="animate-spin ml-3 -mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    )}
                </button>
            )}
        </formFetcher.Form>
    ) : null;
};

export default Form;

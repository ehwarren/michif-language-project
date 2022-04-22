import { Button, TextField } from "@mui/material";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";

export const action: ActionFunction = async ({ request }) => {
    const body = await request.formData();

    const word = body.get("word");
    if (word && typeof word === "string") {
        const newWord = await prisma.englishWord.create({ data: { word } });
        return redirect('/glossary/admin/'+newWord.id);
    }
    return null;
};

export default function newWord() {
    return (
        <Form method="post" className="max-w-md">
            <h3 className="mb-2">Add new word</h3>
            <TextField variant="outlined" name="word" label="English Word" fullWidth margin="normal" />
            <Button type="submit" variant="outlined">
                Submit
            </Button>
        </Form>
    );
}

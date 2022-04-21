import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { Form, NavLink, Outlet, ThrownResponse, useLoaderData } from "@remix-run/react";
import { EnglishWord, EnglishDefinition, MichifWord, PartOfSpeech, ExampleSentence } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Index() {
    return (
        <div className="container mx-auto mt-8">
            <p className="max-w-prose">Select a word on the left to edit it, or create a new one by using the button on the bottom</p>
        </div>
    );
}

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { MichifWord } from "@prisma/client";
import { createContext, useCallback, useContext, useState } from "react";

interface IMichifWordsContext {
    michifWords: MichifWord[];
}
const MichifWordsContext = createContext<IMichifWordsContext>({
    michifWords: [],
});

export function MichifWordsContextProvider({
    children,
    words,
}: {
    children: JSX.Element;
    words: MichifWord[];
}) {
    return (
        <MichifWordsContext.Provider value={{ michifWords: words }}>
            {children}
        </MichifWordsContext.Provider>
    );
}

export function useMichifWords(): MichifWord[] {
    const { michifWords } = useContext(MichifWordsContext);
    return michifWords;
}

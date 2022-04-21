import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { createContext, useCallback, useContext, useState } from "react";

interface IConfirmContext {
    showDialog: (title: string, prompt: string, onConfirm: () => void, onClose?: () => void, options?: ConfirmOptions) => void;
}
const ConfirmContext = createContext<IConfirmContext>({
    showDialog: () => {
        return;
    },
});

type ConfirmOptions = {
    confirmText?: string;
    cancelText?: string;
};

export function ConfirmContextProvider({ children }: { children: JSX.Element }) {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState<ConfirmOptions | undefined>({});
    const [onConfirm, setOnConfirm] = useState<() => void | undefined>();
    const [onClose, setOnClose] = useState<() => void | undefined>();

    const handleClose = useCallback(() => {
        onClose && onClose();
        closeDialog();
    }, [onClose]);

    const closeDialog = useCallback(() => {
        setOpen(false);
        setOnConfirm(undefined);
        setOnClose(undefined);
    }, [setOnClose, setOnConfirm, setOpen]);

    const showDialog = useCallback(
        (title: string, prompt: string, onConfirm: () => void, onClose?: () => void, options?: ConfirmOptions) => {
            setTitle(title);
            setPrompt(prompt);
            setOptions(options);
            setOnConfirm(() => () => onConfirm());
            onClose && setOnClose(() => () => onClose());
            setOpen(true);
        },
        [setOpen, setPrompt, setTitle, setOnConfirm, setOnClose]
    );

    const handleConfirmClicked = useCallback(() => {
        onConfirm && onConfirm();
        closeDialog();
    }, [onConfirm, handleClose]);

    return (
        <ConfirmContext.Provider value={{ showDialog }}>
            {children}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <p className="max-w-prose">{prompt}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {options?.cancelText || "Cancel"}
                    </Button>
                    <Button onClick={handleConfirmClicked} color="primary">
                        {options?.confirmText || "Confirm"}
                    </Button>
                </DialogActions>
            </Dialog>
        </ConfirmContext.Provider>
    );
}

export function useConfirmDialog(): (title: string, prompt: string, onConfirm: () => void, onClose?: () => void, options?: ConfirmOptions) => void {
    const { showDialog } = useContext(ConfirmContext);
    return showDialog;
}
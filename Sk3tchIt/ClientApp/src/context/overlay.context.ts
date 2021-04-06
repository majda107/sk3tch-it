import React, { useState } from "react";

export interface OverlayContext {
    openOverlay: (text: string, time: number) => void,
    text: string,
    setText: (s: string) => void
}


export function CreateOverlayContext(): OverlayContext {
    const [text, setText] = useState("");
    const [timer, setTimer] = useState({} as NodeJS.Timeout)

    async function openOverlay(value: string, time: number) {
        clearTimeout(timer);

        setText(value);

        setTimer(setTimeout(() => {
            setText("");
        }, time));
    }

    return {
        openOverlay,
        text,
        setText
    }
}

export const OverlayContext = React.createContext<OverlayContext>({} as OverlayContext);

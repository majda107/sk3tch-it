import React, { useState } from "react";

export interface DrawingContext {
    drawing: string,
    setDrawing: (uid: string) => void,

    left: number,
    setLeft: (n: number) => void,

    word: string,
    setWord: (w: string) => void,

    clear: () => void
}


export function CreateDrawingContext(): DrawingContext {
    const [drawing, setDrawing] = useState("");
    const [left, setLeft] = useState(30);
    const [word, setWord] = useState("");

    function clear() {
        setDrawing("");
        setLeft(30);
        setWord("");
    }


    return {
        drawing,
        setDrawing,
        left,
        setLeft,
        word,
        setWord,
        clear
    }
}

export const DrawingContext = React.createContext<DrawingContext>({} as DrawingContext);
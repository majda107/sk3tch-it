import React, { useState } from "react";

export interface DrawingContext {
    drawing: string,
    setDrawing: (uid: string) => void,
    left: number,
    setLeft: (n: number) => void,
    clear: () => void
}


export function CreateDrawingContext(): DrawingContext {
    const [drawing, setDrawing] = useState("");
    const [left, setLeft] = useState(30);

    function clear() {
        setDrawing("");
        setLeft(30);
    }


    return {
        drawing,
        setDrawing,
        left,
        setLeft,
        clear
    }
}

export const DrawingContext = React.createContext<DrawingContext>({} as DrawingContext);
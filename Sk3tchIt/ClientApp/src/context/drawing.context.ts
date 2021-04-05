import React, { useState } from "react";

export interface DrawingContext {
    drawing: string,
    setDrawing: (uid: string) => void
}


export function CreateDrawingContext(): DrawingContext {
    const [drawing, setDrawing] = useState("");


    return {
        drawing,
        setDrawing
    }
}

export const DrawingContext = React.createContext<DrawingContext>({} as DrawingContext);
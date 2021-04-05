import React, { useState } from "react";

export interface GameContext {
    running: boolean,
    setRunning: (b: boolean) => void,
}


export function CreateGameContext(): GameContext {
    const [running, setRunning] = useState(false);
    
    return {
        running,
        setRunning
    }
}

export const GameContext = React.createContext<GameContext>({} as GameContext);
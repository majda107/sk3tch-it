import React from "react";

export interface SignalrContext {
}

export function CreateSignalrContext(): SignalrContext {
    return {

    }
}

export const SignalrContext = React.createContext<SignalrContext>({} as SignalrContext);
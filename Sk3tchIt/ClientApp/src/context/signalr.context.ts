import React from "react";
import * as signalR from "@aspnet/signalr";

export interface SignalrContext {
    connection: signalR.HubConnection
}

export function CreateSignalrContext(): SignalrContext {
    const connection = new signalR.HubConnectionBuilder().withUrl(`/gamehub`).build();
    connection.start(); // DEBUG

    return {
        connection
    }
}

export const SignalrContext = React.createContext<SignalrContext>({} as SignalrContext);
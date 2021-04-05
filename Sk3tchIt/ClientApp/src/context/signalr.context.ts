import React, { useContext } from "react";
import * as signalR from "@aspnet/signalr";
import { UsersContext } from "./users.context";

export interface SignalrContext {
    connection: signalR.HubConnection
}


// INJECT COMMUNICATION CONTEXTS
export function CreateSignalrContext(usersCtx: UsersContext): SignalrContext {
    const connection = new signalR.HubConnectionBuilder().withUrl(`/gamehub`).build();
    connection.start(); // DEBUG

    // INJECT COMMUNICATION CONTEXTS
    // const usersCtx = useContext(UsersContext);

    // RECEIVED USERS
    connection.on("sendUsers", (users: any) => {
        usersCtx.setUsers([{ uid: "test", name: "test" }]);
    });


    return {
        connection
    }
}

export const SignalrContext = React.createContext<SignalrContext>({} as SignalrContext);
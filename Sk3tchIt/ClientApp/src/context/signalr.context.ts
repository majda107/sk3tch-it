import React, { useContext } from "react";
import * as signalR from "@aspnet/signalr";
import { UsersContext } from "./users.context";
import { UserModel } from "../models/user.model";

export interface SignalrContext {
    connection: signalR.HubConnection
}


// INJECT COMMUNICATION CONTEXTS
export function CreateSignalrContext(usersCtx: UsersContext): SignalrContext {
    const connection = new signalR.HubConnectionBuilder().withUrl(`/gamehub`).build();
    connection.start(); // DEBUG


    // RECEIVED USERS
    connection.on("sendUsers", (rawUsers: any) => {
        var users = Object.keys(rawUsers).map(k => ({ uid: k, name: rawUsers[k] } as UserModel));
        console.log(users);

        usersCtx.setUsers(users);
    });


    return {
        connection
    }
}

export const SignalrContext = React.createContext<SignalrContext>({} as SignalrContext);
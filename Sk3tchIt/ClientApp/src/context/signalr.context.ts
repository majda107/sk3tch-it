import React, { useContext, useState } from "react";
import * as signalR from "@aspnet/signalr";
import { UsersContext } from "./users.context";
import { UserModel } from "../models/user.model";

export interface SignalrContext {
    connection: signalR.HubConnection,
    id: string,
    setId: (id: string) => void
}



// INJECT COMMUNICATION CONTEXTS
export function CreateSignalrContext(connection: signalR.HubConnection, usersCtx: UsersContext): SignalrContext {

    const [id, setId] = useState("");

    // RECEIVED USERS
    connection.on("sendUsers", (users: UserModel[]) => {
        usersCtx.setUsers(users);
    });


    return {
        connection,
        id, setId
    }
}

export const SignalrContext = React.createContext<SignalrContext>({} as SignalrContext);
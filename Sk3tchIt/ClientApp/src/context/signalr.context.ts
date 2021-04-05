import React, { useContext, useState } from "react";
import * as signalR from "@aspnet/signalr";
import { UsersContext } from "./users.context";
import { UserModel } from "../models/user.model";
import { ChatContext } from "./chat.context";

export interface SignalrContext {
    connection: signalR.HubConnection,
    id: string,
    setId: (id: string) => void
}


// // BIND CONNECTION
// export function BindSignalrEvents(connection: signalR.HubConnection, usersCtx: UsersContext, chatCtx: ChatContext) {
//     // RECEIVED USERS
//     connection.on("sendUsers", (users: UserModel[]) => {
//         usersCtx.setUsers(users);
//     });

//     connection.on("sendMessage", (uid: string, message: string) => {
//         chatCtx.addMessage(uid, message);
//     });
// }


// INJECT COMMUNICATION CONTEXTS
export function CreateSignalrContext(connection: signalR.HubConnection, usersCtx: UsersContext, chatCtx: ChatContext): SignalrContext {

    const [id, setId] = useState("");

    // BindSignalrEvents(connection, usersCtx, chatCtx);

    return {
        connection,
        id, setId
    }
}

export const SignalrContext = React.createContext<SignalrContext>({} as SignalrContext);
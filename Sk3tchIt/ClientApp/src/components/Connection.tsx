import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chat.context";
import { SignalrContext } from "../context/signalr.context";
import { UsersContext } from "../context/users.context";
import { UserModel } from "../models/user.model";
import { ctxState } from "../services/connection.service";


export function Connection(): JSX.Element {

    const chatCtx = useContext(ChatContext);
    const usersCtx = useContext(UsersContext);

    useEffect(() => {
        ctxState.chatCtx = chatCtx;
        ctxState.usersCtx = usersCtx;
    });

    return <></>;
}
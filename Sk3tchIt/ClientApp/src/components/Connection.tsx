import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chat.context";
import { DrawingContext } from "../context/drawing.context";
import { GameContext } from "../context/game.context";
import { RoomsContext } from "../context/rooms.context";
import { SignalrContext } from "../context/signalr.context";
import { UsersContext } from "../context/users.context";
import { UserModel } from "../models/user.model";
import { ctxState } from "../services/connection.service";


export function Connection(): JSX.Element {

    const chatCtx = useContext(ChatContext);
    const usersCtx = useContext(UsersContext);
    const drawingCtx = useContext(DrawingContext);
    const gameCtx = useContext(GameContext);
    const roomsCtx = useContext(RoomsContext);

    useEffect(() => {
        ctxState.chatCtx = chatCtx;
        ctxState.usersCtx = usersCtx;
        ctxState.drawingCtx = drawingCtx;
        ctxState.gameCtx = gameCtx;
        ctxState.roomsCtx = roomsCtx;
    });

    return <></>;
}
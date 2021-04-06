import { useContext } from "react";
import { DrawingContext } from "../context/drawing.context";
import { SignalrContext } from "../context/signalr.context";
import { UsersContext } from "../context/users.context";
import { Canvas } from "./Canvas";

export function RoomDrawing(): JSX.Element {

    const ctx = useContext(DrawingContext);
    const signlarCtx = useContext(SignalrContext);
    const usersCtx = useContext(UsersContext);

    return <div>

        {
            signlarCtx.id == ctx.drawing &&
            <p>You are drawing: {ctx.word}</p>
        }

        <b>{usersCtx.users.find(u => u.uid == ctx.drawing)?.name ?? '-'} is drawing</b>
        <span>{ctx.left}s left</span>
        <Canvas />

    </div>;
}
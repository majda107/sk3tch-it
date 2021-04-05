import { useContext } from "react";
import { DrawingContext } from "../context/drawing.context";
import { UsersContext } from "../context/users.context";
import { Canvas } from "./Canvas";

export function RoomDrawing(): JSX.Element {
    const ctx = useContext(DrawingContext);
    const usersCtx = useContext(UsersContext);

    return <div>

        <b>{usersCtx.users.find(u => u.uid == ctx.drawing)?.name ?? '-'} is drawing</b>
        <span>{ctx.left}s left</span>
        <Canvas />

    </div>;
}
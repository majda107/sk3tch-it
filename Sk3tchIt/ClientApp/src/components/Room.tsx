import { useContext, useState } from "react";
import { useParams } from "react-router";
import { GameContext } from "../context/game.context";
import { SignalrContext } from "../context/signalr.context";
import { useInput } from "../hooks/input.hook";
import { RoomChat } from "./RoomChat";
import { RoomDrawing } from "./RoomDrawing";
import { RoomUsers } from "./RoomUsers";

interface RouteParams {
    name: string
}

export function Room(): JSX.Element {
    const params = useParams<RouteParams>();

    const ctx = useContext(SignalrContext);
    const gameCtx = useContext(GameContext);

    const [username, setUsername, bindUsername] = useInput("");
    const [joined, setJoined] = useState(false);

    async function joinUsername() {
        const running = await ctx.connection.invoke("join", params.name, username);
        gameCtx.setRunning(running);

        setJoined(true);
    }


    if (!joined) {
        return <div>
            <h1>Join room {params.name}</h1>

            <form>
                <input type="text" {...bindUsername} placeholder="user107" />
                <button type="button" className="btn btn-primary" onClick={joinUsername}>Set username</button>
            </form>
        </div>
    }

    return <div>
        <span>Welcome in room {params.name}</span>

        <RoomUsers />

        <hr />

        <RoomDrawing />

        <hr />

        <RoomChat />
    </div>;
}
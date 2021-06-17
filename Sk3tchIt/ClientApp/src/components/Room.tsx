import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router";
import { GameContext } from "../context/game.context";
import { SignalrContext } from "../context/signalr.context";
import { useInput } from "../hooks/input.hook";
import { RoomState } from "../models/room-state.model";
import { ctxState } from "../services/connection.service";
import { RoomChat } from "./RoomChat";
import { RoomDrawing } from "./RoomDrawing";
import { RoomUsers } from "./RoomUsers";

import './Room.css'

interface RouteParams {
    name: string
}

export function Room(): JSX.Element {
    const params = useParams<RouteParams>();
    const history = useHistory();

    const ctx = useContext(SignalrContext);
    const gameCtx = useContext(GameContext);

    const [username, setUsername, bindUsername] = useInput("");
    const [joined, setJoined] = useState(false);

    async function joinUsername() {
        if (!username) return; // USERNAME VALID

        const state: RoomState = await ctx.connection.invoke("join", params.name, username);
        if (state == null) {
            alert("Invalid room!");
            return;
        }

        gameCtx.setRunning(state.running);

        setJoined(true);
    }

    async function leave() {
        await ctx.connection.invoke("leave");
        ctxState.clear();
        history.push('/');
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
        {/* <span>Welcome in room {params.name}</span> */}

        <RoomUsers />

        <hr />

        <RoomDrawing />

        <hr />

        <RoomChat />

        <button className="btn btn-small btn-secondary" onClick={leave}>Leave</button>
    </div>;
}
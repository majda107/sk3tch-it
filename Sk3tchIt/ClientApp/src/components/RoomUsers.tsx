import { useContext } from "react"
import { GameContext } from "../context/game.context";
import { SignalrContext } from "../context/signalr.context";
import { UsersContext } from "../context/users.context"

import './RoomUsers.css'

export function RoomUsers(): JSX.Element {

    const ctx = useContext(UsersContext);
    const signalrCtx = useContext(SignalrContext);
    const gameCtx = useContext(GameContext);

    async function toggleReady() {
        const me = ctx.users.find(u => u.uid == signalrCtx.id);
        if (me == undefined) return;

        await signalrCtx.connection.invoke("ready", !me.ready);
    }

    return <div className="users">
        {/* <h2>Lobby users</h2> */}

        {
            !gameCtx.running &&
            <button onClick={toggleReady} className="btn btn-secondary">Ready</button>
        }

        <ul>
            {ctx.users.map(u => <li key={u.uid}>

                {
                    u.uid == signalrCtx.id &&
                    <span>[YOU] </span>
                }

                <span>{u.name} [{u.ready ? 'ready' : 'pending'}] ({u.points})</span>
            </li>)}
        </ul>
    </div>
}
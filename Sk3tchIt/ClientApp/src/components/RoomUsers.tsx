import { useContext } from "react"
import { SignalrContext } from "../context/signalr.context";
import { UsersContext } from "../context/users.context"

export function RoomUsers(): JSX.Element {

    const ctx = useContext(UsersContext);
    const signalrCtx = useContext(SignalrContext);

    async function toggleReady() {
        const me = ctx.users.find(u => u.uid == signalrCtx.id);
        if (me == undefined) return;

        await signalrCtx.connection.invoke("ready", !me.ready);
    }

    return <div>
        <h2>Lobby users</h2>
        <button onClick={toggleReady}>Ready</button>
        <ul>
            {ctx.users.map(u => <li key={u.uid}>

                {
                    u.uid == signalrCtx.id &&
                    <span>[YOU] </span>
                }

                <span>{u.name} [{u.ready ? 'ready' : 'pending'}]</span>
            </li>)}
        </ul>
    </div>
}
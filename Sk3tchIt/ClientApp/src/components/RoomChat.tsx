import { useContext, useEffect } from "react"
import { ChatContext } from "../context/chat.context"
import { SignalrContext } from "../context/signalr.context";
import { UsersContext } from "../context/users.context";
import { useInput } from "../hooks/input.hook";
import { connection } from "../services/connection.service";



export function RoomChat(): JSX.Element {
    const ctx = useContext(ChatContext);
    const usersCtx = useContext(UsersContext);

    const [message, setMessage, bindMessage] = useInput("");

    async function sendMessage() {
        if (!message) return;

        await connection.invoke("message", message);;
        (setMessage as any)("");
    }



    return <div>
        <ul>
            {/* {ctx.messages.map(m => m.message).join()} */}
            {ctx.messages.map((m, i) => <li key={Math.random()}>
                [{usersCtx.users.find(u => u.uid == m.uid)?.name ?? '-'}] {m.message}
            </li>)}
        </ul>

        <form>
            <input type="text" {...bindMessage} placeholder="compose a message..." />
            <button onClick={sendMessage} type="button" className="btn btn-primary">Send</button>
        </form>
    </div>
}
import { useContext } from "react"
import { ChatContext } from "../context/chat.context"
import { SignalrContext } from "../context/signalr.context";
import { useInput } from "../hooks/input.hook";

export function RoomChat(): JSX.Element {
    const ctx = useContext(ChatContext);
    const signalrCtx = useContext(SignalrContext);

    const [message, setMessage, bindMessage] = useInput("");

    async function sendMessage() {
        if (!message) return;

        await signalrCtx.connection.invoke("message", message);;
        (setMessage as any)("");
    }

    return <div>
        <ul>
            {ctx.messages.map((m, i) => {
                <li key={i}>
                    {m.uid} - {m.message}
                </li>
            })}
        </ul>

        <form>
            <input type="text" {...bindMessage} placeholder="compose a message..." />
            <button onClick={sendMessage} type="button" className="btn btn-primary">Send</button>
        </form>
    </div>
}
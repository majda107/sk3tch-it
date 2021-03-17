import { send } from "node:process";
import { useEffect, useState } from "react";
import { useInput } from "../hooks/input.hook";
import { connection } from "../services/connection.service";

export const ChatComponent = (): JSX.Element => {

    const [messages, setMessages] = useState([] as string[]);
    const [input, setInput, bindInput] = useInput("");

    useEffect(() => {
        connection.on("chat", (m) => setMessages([...messages, m]));
    }, []);

    async function send() {
        if (input == null) return;
        connection.send("guess", input);

        (setInput as any)("");
    }

    return <div>
        <ul>
            {
                messages.map((m, i) => <li key={i}>
                    {m}
                </li>)
            }
        </ul>

        <input type="text" {...bindInput} />
        <button onClick={send}>Send</button>
    </div>;
}
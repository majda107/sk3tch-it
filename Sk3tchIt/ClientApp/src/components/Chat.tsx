import { send } from "node:process";
import { useEffect, useState } from "react";
import { useInput } from "../hooks/input.hook";
import { connection } from "../services/connection.service";

export const ChatComponent = (): JSX.Element => {

    const [messages, setMessages] = useState([] as string[]);
    const [input, setInput, bindInput] = useInput("");

    const arr = [] as string[];

    async function addMessage(m: string) {
        arr.push(m);
        // console.log(arr);
        setMessages([...arr]);
    }

    useEffect(() => {
        console.log("CHAT EFFECT");

        connection.on("chat", (m) => {
            // console.log(messages);
            // setMessages([...messages, 'aha']);
            addMessage(m);
        })
    }, []);


    async function send() {
        if (input == "") return;
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
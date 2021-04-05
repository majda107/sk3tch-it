import { send } from "node:process";
import { useEffect, useRef, useState } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { useInput } from "../hooks/input.hook";
import { connection } from "../services/connection.service";
import gsap from "gsap";
import { ChatMessageComponent } from "./ChatMessage";


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

    async function gsapFrom(e: any) {
        gsap.from(e, { x: 100, duration: 400, ease: "power3.in" });
        console.log(e);
    }


    async function send() {
        if (input == "") return;
        connection.send("guess", input);

        (setInput as any)("");
    }

    const nodeRef = useRef(null)

    return <div>
        <ul>
            <TransitionGroup>
                {
                    messages.map((m, i) =>
                        <Transition nodeRef={nodeRef} key={i} timeout={500} onEnter={(e: any) => { console.log(nodeRef.current) }}>
                            <p>
                                {m}
                            </p>
                        </Transition>
                    )
                }
            </TransitionGroup>
        </ul>

        <input type="text" {...bindInput} />
        <button onClick={send}>Send</button>
    </div>;
}
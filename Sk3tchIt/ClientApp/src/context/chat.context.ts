import React, { useEffect, useState } from "react";
import { MessageModel } from "../models/message.model";

export interface ChatContext {
    messages: MessageModel[],
    setMessages: (messages: MessageModel[]) => void,
    addMessage: (uid: string, message: string) => void
}


export function CreateChatContext(): ChatContext {
    const [messages, setMessages] = useState([] as MessageModel[]);

    function addMessage(uid: string, message: string) {
        console.log("Addding message", message);
        setMessages([...messages, { uid, message }]); // APPEND MESSAGE
    }

    return {
        messages,
        setMessages,
        addMessage
    }
}

export const ChatContext = React.createContext<ChatContext>({} as ChatContext);
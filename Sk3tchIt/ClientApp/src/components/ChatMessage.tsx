import { useRef } from "react"
import { Transition } from "react-transition-group"

export const ChatMessageComponent = (): JSX.Element => {
    const ref = useRef(null);

    async function enter() {
        console.log("EEEEEE");
    }

    return <Transition ref={ref} timeout={500} onEnter={enter}>
        <p>AHOJ</p>
    </Transition>
}
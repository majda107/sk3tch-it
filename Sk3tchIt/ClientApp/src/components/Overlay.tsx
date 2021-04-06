import { useContext } from "react"
import { OverlayContext } from "../context/overlay.context"

export function Overlay(): JSX.Element | null {

    const ctx = useContext(OverlayContext);


    if (!ctx.text) return null;

    return <div>
        <p>{ctx.text}</p>
    </div>
}
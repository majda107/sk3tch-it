import { useContext } from "react"
import { OverlayContext } from "../context/overlay.context"

import "./Overlay.css";

export function Overlay(): JSX.Element | null {

    const ctx = useContext(OverlayContext);


    if (!ctx.text) return null;

    return <div className="overlay">
        <p>{ctx.text}</p>
    </div>
}
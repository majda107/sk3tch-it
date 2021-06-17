import { useContext, useEffect, useRef } from "react"
import { OverlayContext } from "../context/overlay.context"
import gsap from "gsap";

import "./Overlay.css";

export function Overlay(): JSX.Element | null {

    const ctx = useContext(OverlayContext);
    const overlay = useRef({} as HTMLDivElement);


    // useEffect(() => {

    //     if (ctx.text)
    //         gsap.from(overlay.current, { opacity: 0, duration: 0.5 });
    //     else
    //         gsap.from(overlay.current, { opacity: 1, duration: 0.5 });

    // }, [ctx.text]);


    // if (!ctx.text) return null;

    return <div className="overlay" ref={overlay} style={{ opacity: ctx.text ? 1 : 0 }}>
        <p>{ctx.text}</p>
    </div>
}
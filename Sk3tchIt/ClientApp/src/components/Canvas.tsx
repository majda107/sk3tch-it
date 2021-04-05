import { useContext, useEffect, useRef, useState } from "react"
import { DrawingContext } from "../context/drawing.context";
import { SignalrContext } from "../context/signalr.context";
import { PencilStrokeModel } from "../models/pencil-stroke.model";
import { connection, ctxState } from "../services/connection.service";

export function Canvas(): JSX.Element {

    const canvas = useRef({} as HTMLCanvasElement)
    const [context, setContext] = useState({} as CanvasRenderingContext2D);

    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    const signalrCtx = useContext(SignalrContext);
    const drawingCtx = useContext(DrawingContext);

    async function mouseMove(e: React.MouseEvent) {
        const x = e.clientX - (canvas?.current?.offsetLeft ?? 0);
        const y = e.clientY - (canvas?.current?.offsetTop ?? 0);

        if (drawingCtx.drawing == signalrCtx.id) {
            if (e.buttons == 1) {
                context.moveTo(lastX, lastY);
                context.lineTo(x, y);
                context.stroke();

                // SEND DRAWING TO OTHER USERS
                connection.invoke("draw", ({ x, y, down: true } as PencilStrokeModel));
            } else {

                // SEND MOUSE MOVE TO OTHER USERS
                connection.invoke("draw", ({ x, y, down: false } as PencilStrokeModel));
            }
        }

        setLastX(x);
        setLastY(y);
    }

    useEffect(() => {
        const ctx = canvas.current.getContext('2d') as CanvasRenderingContext2D;
        setContext(ctx);
        ctxState.canvas = ctx;
    })

    return <canvas ref={canvas} style={{ border: "1px solid black" }} onMouseMove={mouseMove}>

    </canvas>
}
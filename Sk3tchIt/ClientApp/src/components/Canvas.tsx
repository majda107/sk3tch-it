import { useContext, useEffect, useRef, useState } from "react"
import { DrawingContext } from "../context/drawing.context";
import { SignalrContext } from "../context/signalr.context";
import { useInput } from "../hooks/input.hook";
import { PencilStrokeModel } from "../models/pencil-stroke.model";
import { clearCanvas, drawCanvas } from "../services/canvas.service";
import { connection, ctxState } from "../services/connection.service";

export function Canvas(): JSX.Element {

    const canvas = useRef({} as HTMLCanvasElement)
    const [context, setContext] = useState({} as CanvasRenderingContext2D);

    const [color, setColor, bindColor] = useInput("#000000");
    const [width, setWidth, bindWidth] = useInput(1.0);

    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    const signalrCtx = useContext(SignalrContext);
    const drawingCtx = useContext(DrawingContext);

    async function mouseMove(e: React.MouseEvent) {
        const x = e.clientX - (canvas?.current?.offsetLeft ?? 0);
        const y = e.clientY - (canvas?.current?.offsetTop ?? 0);

        const w = parseFloat(width);

        if (drawingCtx.drawing == signalrCtx.id) {
            if (e.buttons == 1) {
                const pencil = ({ x, y, action: "draw", color, width: w } as PencilStrokeModel);
                drawCanvas(context, pencil, lastX, lastY);


                // SEND DRAWING TO OTHER USERS
                connection.invoke("draw", pencil);
            } else {

                // SEND MOUSE MOVE TO OTHER USERS
                connection.invoke("draw", ({ x, y, action: "none", color, width: w } as PencilStrokeModel));
            }
        }

        setLastX(x);
        setLastY(y);
    }

    async function clear() {
        clearCanvas(canvas.current, context);

        // SEND CLEAR TO OTHER USERS
        connection.invoke("draw", ({ x: 0, y: 0, action: "clear", color, width: 0 } as PencilStrokeModel));
    }

    useEffect(() => {
        const ctx = canvas.current.getContext('2d') as CanvasRenderingContext2D;
        setContext(ctx);

        ctxState.canvas = ctx;
        ctxState.canvasEl = canvas.current;
    })

    return <div>
        <canvas ref={canvas} style={{ border: "1px solid black" }} onMouseMove={mouseMove}>
        </canvas>

        <input type="color" {...bindColor} />
        <input type="range" min="0.1" max="5" step="0.2" {...bindWidth} />
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
    </div>;
}
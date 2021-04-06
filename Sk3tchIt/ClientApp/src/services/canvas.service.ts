import { PencilStrokeModel } from "../models/pencil-stroke.model";

export function clearCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}


export function drawCanvas(context: CanvasRenderingContext2D, stroke: PencilStrokeModel, lastX: number, lastY: number) {
    context.strokeStyle = stroke.color as string;
    context.lineWidth = stroke.width as number;

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(stroke.x, stroke.y);
    context.stroke();
    context.closePath();
}
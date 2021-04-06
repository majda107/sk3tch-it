export interface PencilStrokeModel {
    x: number,
    y: number,
    // down: boolean,
    action: "draw" | "none" | "clear",
    color: string,
    width: number
}
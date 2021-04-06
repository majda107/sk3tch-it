import * as signalR from "@aspnet/signalr";
import { ChatContext } from "../context/chat.context";
import { DrawingContext } from "../context/drawing.context";
import { GameContext } from "../context/game.context";
import { OverlayContext } from "../context/overlay.context";
import { RoomsContext } from "../context/rooms.context";
import { UsersContext } from "../context/users.context";
import { PencilStrokeModel } from "../models/pencil-stroke.model";
import { UserModel } from "../models/user.model";
import { clearCanvas, drawCanvas } from "./canvas.service";
// import { CONSTS } from "../models/consts";


// console.log("Creating hub connection!");
// export const connection = new signalR.HubConnectionBuilder().withUrl(`${CONSTS.endpoint}/gamehub`).build();
// // connection.start(); // DEBUG


// export const setProfle = (username: string) => {
//     connection.invoke("setProfile", username)
// };

// export const getProfiles = async () => {
//     const users = await connection.invoke("getUsers");
//     console.log(users);
// }


// CHEAT BECAUSE OF REACT ECOSYSTEM
export const ctxState = {
    chatCtx: {} as ChatContext,
    usersCtx: {} as UsersContext,
    drawingCtx: {} as DrawingContext,
    gameCtx: {} as GameContext,
    roomsCtx: {} as RoomsContext,
    overlayCtx: {} as OverlayContext,

    clear: () => {
        ctxState.drawingCtx.clear();
    },

    canvas: {} as CanvasRenderingContext2D,
    canvasEl: {} as HTMLCanvasElement
};

export const connection = new signalR.HubConnectionBuilder().withUrl(`/gamehub`).build();


// BIND DISPATCH CONTEXT
connection.on("sendUsers", (users: UserModel[]) => {
    ctxState.usersCtx.setUsers(users);
});

connection.on("sendMessage", (uid: string, message: string) => {
    ctxState.chatCtx.addMessage(uid, message);
});

connection.on("start", (drawing) => {

    // OPEN GAME HAS STARTED OVERLAY
    ctxState.overlayCtx.openOverlay("The game has started!", 5000);

    ctxState.drawingCtx.setDrawing(drawing);
    ctxState.gameCtx.setRunning(true);

    // INITIAL CANVAS CLEAR
    clearCanvas(ctxState.canvasEl, ctxState.canvas);
});

connection.on("word", (word: string) => {
    ctxState.drawingCtx.setWord(word);
});


// DRAW CONNECTION, TODO MAKE CLEANER / SELF CONTAINED

let lastX = 0;
let lastY = 0;

connection.on("draw", (stroke: PencilStrokeModel) => {
    if (stroke.action == "draw" && lastX >= 0 && lastY >= 0 && stroke.x >= 0 && stroke.y >= 0) {
        drawCanvas(ctxState.canvas, stroke, lastX, lastY);
    } else if (stroke.action == "clear") {
        clearCanvas(ctxState.canvasEl, ctxState.canvas);
    }

    lastX = stroke.x;
    lastY = stroke.y;
});


connection.on("tick", (left: number) => {
    console.log("Tick-tock", left);
    ctxState.drawingCtx.setLeft(left);
})

connection.on("stop", () => {
    ctxState.gameCtx.setRunning(false);
    ctxState.drawingCtx.clear();

    // CLEAR CANVAS ON GAME END
    clearCanvas(ctxState.canvasEl, ctxState.canvas);
});

connection.on("sendRooms", rooms => {
    ctxState.roomsCtx.setRooms(rooms);
});
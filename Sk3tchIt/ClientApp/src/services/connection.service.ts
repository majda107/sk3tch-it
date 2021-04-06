import * as signalR from "@aspnet/signalr";
import { ChatContext } from "../context/chat.context";
import { DrawingContext } from "../context/drawing.context";
import { GameContext } from "../context/game.context";
import { RoomsContext } from "../context/rooms.context";
import { UsersContext } from "../context/users.context";
import { PencilStrokeModel } from "../models/pencil-stroke.model";
import { UserModel } from "../models/user.model";
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

    canvas: {} as CanvasRenderingContext2D,
    clear: () => {
        ctxState.drawingCtx.clear();
    }
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
    console.log(drawing);

    ctxState.drawingCtx.setDrawing(drawing);
    ctxState.gameCtx.setRunning(true);
});

connection.on("word", (word: string) => {
    ctxState.drawingCtx.setWord(word);
});


// DRAW CONNECTION, TODO MAKE CLEANER / SELF CONTAINED

let lastX = 0;
let lastY = 0;

connection.on("draw", (stroke: PencilStrokeModel) => {
    if (stroke.down && lastX >= 0 && lastY >= 0 && stroke.x >= 0 && stroke.y >= 0) {
        ctxState.canvas.moveTo(lastX, lastY);
        ctxState.canvas.lineTo(stroke.x, stroke.y);
        ctxState.canvas.stroke();
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
});

connection.on("sendRooms", rooms => {
    ctxState.roomsCtx.setRooms(rooms);
});
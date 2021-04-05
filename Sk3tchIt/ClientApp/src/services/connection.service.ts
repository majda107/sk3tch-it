import * as signalR from "@aspnet/signalr";
import { ChatContext } from "../context/chat.context";
import { DrawingContext } from "../context/drawing.context";
import { UsersContext } from "../context/users.context";
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
    drawingCtx: {} as DrawingContext
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
})
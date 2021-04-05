import * as signalR from "@aspnet/signalr";
import { CONSTS } from "../models/consts";


console.log("Creating hub connection!");
export const connection = new signalR.HubConnectionBuilder().withUrl(`${CONSTS.endpoint}/gamehub`).build();
// connection.start(); // DEBUG


export const setProfle = (username: string) => {
    connection.invoke("setProfile", username)
};

export const getProfiles = async () => {
    const users = await connection.invoke("getUsers");
    console.log(users);
}

import * as signalR from "@aspnet/signalr";
import { CONSTS } from "../models/consts";


console.log("Creating hub connection!");
const connection = new signalR.HubConnectionBuilder().withUrl(`${CONSTS.endpoint}/gamehub`).build();
connection.start();


export const setProfle = () => {
    connection.invoke("setProfile", "majda107");
};

export const getProfiles = async () => {
    const users = await connection.invoke("getUsers");
    console.log(users);
}

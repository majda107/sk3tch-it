import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { RoomsContext } from "../context/rooms.context";
import { useInput } from "../hooks/input.hook";
import { connection } from "../services/connection.service";

export function Rooms(): JSX.Element {
    const [room, setRoom, bindRoom] = useInput("");
    const history = useHistory();

    const roomsCtx = useContext(RoomsContext);

    async function createRoom() {
        if (!room) return; // INVALID ROOM NAME

        const res: boolean = await connection.invoke("create", room);
        if (res) {
            history.push(`/room/${room}`);
        } else {
            console.log("Room already exists!");
        }

    }

    async function loadRooms() {
        const rooms = await connection.invoke("rooms");

        console.log("Loaded rooms: ", rooms);
        roomsCtx.setRooms(rooms);
    }

    useEffect(() => {
        loadRooms();
    }, []);

    return <div>
        <h1>Sk3tch it rooms</h1>
        <span>room list is not implemented yet, but you can join a room instead</span>

        <hr />
        <form>
            <input type="text" placeholder="room123" {...bindRoom} />

            <button type="button" className="btn btn-primary" onClick={createRoom}>Create {room}</button>
        </form>

        <ul>
            {roomsCtx.rooms.map(r => <li key={r} onClick={() => history.push(`/room/${r}`)}>
                <span>{r}</span>
            </li>)}
        </ul>
    </div>;
}
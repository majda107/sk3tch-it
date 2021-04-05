import { useHistory } from "react-router";
import { useInput } from "../hooks/input.hook";

export function Rooms(): JSX.Element {
    const [room, setRoom, bindRoom] = useInput("");
    const history = useHistory();

    async function joinRoom() {
        if (!room) return; // INVALID ROOM NAME
        history.push(`/room/${room}`);
    }

    return <div>
        <h1>Sk3tch it rooms</h1>
        <span>room list is not implemented yet, but you can join a room instead</span>

        <hr />
        <form>
            <input type="text" placeholder="room123" {...bindRoom} />

            <button type="button" className="btn btn-primary" onClick={joinRoom}>Join {room}</button>
        </form>
    </div>;
}
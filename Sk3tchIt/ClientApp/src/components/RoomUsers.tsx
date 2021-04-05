import { useContext } from "react"
import { UsersContext } from "../context/users.context"

export function RoomUsers(): JSX.Element {

    const ctx = useContext(UsersContext);

    return <div>
        <h2>Lobby users</h2>
        <ul>
            {ctx.users.map(u => <li key={u.uid}>
                {u.name}
            </li>)}
        </ul>
    </div>
}
import { createRef, useEffect, useRef, useState } from 'react';
import { useInput } from '../hooks/input.hook';
import { connection, getProfiles, setProfle } from '../services/connection.service';
import './Lobby.css';

export const LobbyComponent = (): JSX.Element => {

    const [username, setUsername, bindUsername] = useInput("");
    const [profiles, setProfiles] = useState([] as any[]);
    const canvas = createRef<HTMLCanvasElement>();
    let context: CanvasRenderingContext2D;

    async function start() {
        await connection.invoke("start");
    }

    let lastX = 0;
    let lastY = 0;

    async function mouseMove(e: React.MouseEvent) {
        const x = e.clientX - (canvas?.current?.offsetLeft ?? 0);
        const y = e.clientY - (canvas?.current?.offsetTop ?? 0);

        if (e.buttons == 1) {
            context.moveTo(lastX, lastY);
            context.lineTo(x, y);
            context.stroke();
        }

        lastX = x;
        lastY = y;
    }

    useEffect(() => {

        connection.on("users", (users) => {
            // setProfiles(users);

            const ps = [] as any[];
            for (const key of Object.keys(users)) {
                ps.push({ username: users[key], connection: key });
            }

            console.log(ps);
            setProfiles(ps);
        })

        connection.on("draw", () => {
            console.log("YOU SHOULD DRAW NOW");
        })

        if (canvas.current == null) return;

        context = canvas.current?.getContext("2d") as CanvasRenderingContext2D;
        console.log(context);
        // context = canvas.current?.getContext("2d");


    }, [])



    return (
        <div className="container">
            <div className="row lobbies">
                <div className="col-3">
                    lobby
                    <input type="text"{...bindUsername} />
                    <button onClick={() => setProfle(username as string)}>Set profile</button>
                    <button onClick={getProfiles}>Get users</button>

                    <hr />

                    <button onClick={start}>Start</button>


                    <hr />

                    <ul>

                        {profiles.map(p => (
                            <li key={p.connection}>
                                {p.username}
                            </li>
                        ))}
                    </ul>


                </div>
                <div className="col-9">
                    <div className="drawarea">
                        {/* kreslici plocha */}
                        <canvas ref={canvas} onMouseMove={mouseMove}></canvas>
                    </div>
                    <div className="chat">
                        chat
                    </div>
                </div>
            </div>
        </div>
    )
}
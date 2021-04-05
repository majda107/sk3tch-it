import { createRef, useEffect, useRef, useState } from 'react';
import { useInput } from '../hooks/input.hook';
import { connection, getProfiles, setProfle } from '../services/connection.service';
import { ChatComponent } from './Chat';
import './Lobby.css';

export const LobbyComponent = (): JSX.Element => {

    const [username, setUsername, bindUsername] = useInput("");
    const [profiles, setProfiles] = useState([] as any[]);
    const canvas = createRef<HTMLCanvasElement>();

    let context: CanvasRenderingContext2D;

    const [draw, setDraw] = useState(null as boolean | null);
    const [theme, setTheme] = useState("");

    async function start() {
        await connection.invoke("start");
    }

    let lastX = 0;
    let lastY = 0;

    let last2X = -1;
    let last2Y = -1;

    async function mouseUp() {
        await connection.invoke("echoDraw", -1, -1);
    }

    async function mouseMove(e: React.MouseEvent) {
        const x = e.clientX - (canvas?.current?.offsetLeft ?? 0);
        const y = e.clientY - (canvas?.current?.offsetTop ?? 0);

        if (draw && e.buttons == 1) {
            context.moveTo(lastX, lastY);
            context.lineTo(x, y);
            context.stroke();

            connection.invoke("echoDraw", lastX, lastY);
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

        connection.on("draw", (theme: string) => {
            setDraw(true);
            setTheme(theme);
        })

        connection.on("guess", () => {
            setDraw(false);
        });

        connection.on("echoDraw", (x: number, y: number) => {
            // console.log(x, y);
            if (last2X >= 0 && last2Y >= 0 && x >= 0 && y >= 0) {
                context.moveTo(last2X, last2Y);
                context.lineTo(x, y);
                context.stroke();
            }

            last2X = x;
            last2Y = y;
        })


        connection.on("tick", () => {
            console.log("SERVER TICK!!!");
        });


        if (canvas.current == null) return;

        context = canvas.current?.getContext("2d") as CanvasRenderingContext2D;
        console.log(context);
        // context = canvas.current?.getContext("2d");

        console.log(canvas.current.width);
        canvas.current.width = canvas.current.clientWidth;
        canvas.current.height = canvas.current.clientHeight;

    }, [])

    useEffect(() => {

        // console.log("CANVAS EFFECT!");
        context = canvas.current?.getContext("2d") as CanvasRenderingContext2D;

    }, [canvas]);



    return (
        <div className="container">
            <div className="row lobbies">
                <div className="col-3">
                    lobby
                    <input type="text"{...bindUsername} />
                    <button onClick={() => setProfle(username as string)}>Set profile</button>
                    <button onClick={getProfiles}>Get users</button>

                    <hr />

                    {
                        draw == null &&
                        <button onClick={start}>Start</button>
                    }
                    {
                        draw == false &&
                        <span>Guess the word!</span>
                    }
                    {
                        draw == true &&
                        <span>You are drawing! ({theme})</span>
                    }


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
                        <canvas ref={canvas} onMouseMove={mouseMove} onMouseUp={mouseUp}></canvas>
                    </div>
                    <div className="chat">
                        {/* chat */}
                        <ChatComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}
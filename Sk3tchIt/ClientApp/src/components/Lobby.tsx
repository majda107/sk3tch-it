import { getProfiles, setProfle } from '../services/connection.service';
import './Lobby.css';

export const LobbyComponent = (): JSX.Element => {
    return (
        <div className="container">
            <div className="row lobbies">
                <div className="col-3">
                    lobby
                    <button onClick={setProfle}>Set profile</button>
                    <button onClick={getProfiles}>Get users</button>
                </div>
                <div className="col-9">
                    <div className="drawarea">
                        kreslici plocha
                    </div>
                    <div className="chat">
                        chat
                    </div>
                </div>
            </div>
        </div>
    )
}
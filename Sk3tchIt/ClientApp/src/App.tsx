import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CreateSignalrContext, SignalrContext } from './context/signalr.context';
import * as signalR from "@aspnet/signalr";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import "./services/connection.service";
import { Rooms } from './components/Rooms';
import { Room } from './components/Room';
import { CreateUsersContext, UsersContext } from './context/users.context';
import { ChatContext, CreateChatContext } from './context/chat.context';
import { UserModel } from './models/user.model';
import { Connection } from './components/Connection';
import { connection } from './services/connection.service';
import { CreateDrawingContext, DrawingContext } from './context/drawing.context';
import { CreateGameContext, GameContext } from "./context/game.context";




function App() {

  const [connected, setConnected] = useState(false);

  const usersCtx = CreateUsersContext();
  const chatCtx = CreateChatContext();
  const drawingCtx = CreateDrawingContext();
  const gameCtx = CreateGameContext();
  const ctx = CreateSignalrContext(connection, usersCtx, chatCtx);


  async function connect() {
    await connection.start(); // START GLOBAL CONNECTION

    // RETREIVE ID
    const id = await connection.invoke("id");
    ctx.setId(id);

    setConnected(true);
  }

  // CONNECT AT INITIAL CREATE
  useEffect(() => {
    connect();
  }, [])



  if (!connected) return <span>Connecting...</span>;

  return (
    <div className="App">
      <Router>
        <UsersContext.Provider value={usersCtx}>
          <ChatContext.Provider value={chatCtx}>
            <DrawingContext.Provider value={drawingCtx}>
              <GameContext.Provider value={gameCtx}>
                <SignalrContext.Provider value={ctx} >

                  <Connection />

                  <Switch>
                    <Route exact path="/room/:name">
                      <Room />
                    </Route>
                    <Route path="/">
                      <Rooms />
                    </Route>
                  </Switch>

                </SignalrContext.Provider>
              </GameContext.Provider>
            </DrawingContext.Provider>
          </ChatContext.Provider>
        </UsersContext.Provider>
      </Router>
    </div >
  );
}

export default App;

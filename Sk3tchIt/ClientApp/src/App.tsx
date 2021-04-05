import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { LobbyComponent } from './components/Lobby';
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



const connection = new signalR.HubConnectionBuilder().withUrl(`/gamehub`).build();



function App() {

  const [connected, setConnected] = useState(false);

  const usersCtx = CreateUsersContext();
  const chatCtx = CreateChatContext();
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
            <SignalrContext.Provider value={ctx} >
              {/* <LobbyComponent /> */}

              <Switch>
                <Route exact path="/room/:name">
                  <Room />
                </Route>
                <Route path="/">
                  <Rooms />
                </Route>
              </Switch>

            </SignalrContext.Provider>
          </ChatContext.Provider>
        </UsersContext.Provider>
      </Router>
    </div >
  );
}

export default App;

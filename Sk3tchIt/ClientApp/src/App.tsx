import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { LobbyComponent } from './components/Lobby';
import { CreateSignalrContext, SignalrContext } from './context/signalr.context';

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

function App() {

  const usersCtx = CreateUsersContext();
  const ctx = CreateSignalrContext(usersCtx);

  return (
    <div className="App">
      <Router>
        <UsersContext.Provider value={usersCtx}>
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
        </UsersContext.Provider>
      </Router>
    </div >
  );
}

export default App;

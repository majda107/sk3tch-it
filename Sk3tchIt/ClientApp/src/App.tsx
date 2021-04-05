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

function App() {

  const ctx = CreateSignalrContext();

  return (
    <div className="App">
      <Router>
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
      </Router>
    </div >
  );
}

export default App;

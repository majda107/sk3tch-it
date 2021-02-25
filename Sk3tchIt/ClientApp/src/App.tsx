import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { LobbyComponent } from './components/Lobby';
import { CreateSignalrContext, SignalrContext } from './context/signalr.context';

import "./services/connection.service";

function App() {

  const ctx = CreateSignalrContext();

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <SignalrContext.Provider value={ctx} >
        <LobbyComponent />
      </SignalrContext.Provider>
    </div >
  );
}

export default App;

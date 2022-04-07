import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppHeader from './AppHeader';
import ServerInputPage from './ServerInputPage';
import './css/App.scss';
import MainPage from './MainPage';

function App() {

  const [isConnected, setIsConnected] = useState(false)
  const [userName, setUserName] = useState<string>("")
  const [userUUID, setUserUUID] = useState<string>("")
  const [port, setPort] = useState<string>("")
  const [hostname, setHostname] = useState<string>("")


  const handleSubmit = (name: string, hostname: string, port: string) => {
    setPort(port)
    setHostname(hostname)
    setUserName(name)
    setUserUUID(uuidv4())
    setIsConnected(true)
  }

  return (
    <div className="App">

      <AppHeader name={userName} />

      {isConnected ? <MainPage userUUID={userUUID} userName={userName} port={port} hostname={hostname} /> : <ServerInputPage onSubmit={handleSubmit} />}

    </div>
  );
}

export default App;

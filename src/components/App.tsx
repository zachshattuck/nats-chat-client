import React, { useState } from 'react';
import AppHeader from './AppHeader';
import ConnectPage from './ConnectPage';
import './css/App.scss';
import MainPage from './MainPage';

function App() {

  const [isConnected, setIsConnected] = useState(false)
  const [port, setPort] = useState<string>("")
  const [hostname, setHostname] = useState<string>("")


  const handleSubmit = (hostname: string, port: string) => {
    setPort(port)
    setHostname(hostname)
    setIsConnected(true)
  }

  return (
    <div className="App">

      <AppHeader />

      {isConnected ? <MainPage port={port} hostname={hostname} /> : <ConnectPage onSubmit={handleSubmit} />}

    </div>
  );
}

export default App;

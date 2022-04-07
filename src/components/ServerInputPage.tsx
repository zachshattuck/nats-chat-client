import React, { useState } from 'react'
import Button from './Button'
import './css/ServerInputPage.scss'

function ServerInputPage({ onSubmit } : {onSubmit: (name: string, hostname: string, port: string) => void}) {

  const [errors, setErrors] = useState({name: '', ip: '', port: '',})
  const [name, setName] = useState('')
  const [ip, setIp] = useState('')
  const [port, setPort] = useState('')

  const verifyInput = () => {
    let newErrors = {ip: '', port: '', name: ''}

    //Grabbed this regex from stackoverflow lmao
    const ipRegex = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/

    if(!ipRegex.test(ip) && ip !== "localhost") {
      newErrors.ip = "Invalid IP address."
    }

    if(isNaN(parseInt(port))) {
      newErrors.port = "Invalid port."
    }

    if(!newErrors.ip && !newErrors.port) {
      // onSubmit(`${ip}:${port}`)
      onSubmit(name, ip, port)
    }

    setErrors(newErrors)
  }

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value)      
  }
  const handleIpChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIp(e.target.value)    
  }
  const handlePortChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPort(e.target.value)      
  }

  return (
    <div className='ConnectPage'>

      <h1>Connect to a NATS (WS) Server</h1>

      <div className="nameInput">
        <label htmlFor="ip">Enter your <b>name</b>:</label>
        <input type="text" name='name' value={name} onChange={handleNameChange} placeholder='Name' />
        <p className="error">{errors.name}</p>
      </div>

      <div className="ipInput">
        <label htmlFor="ip">Enter the <b>IP address</b> of the server:</label>
        <input type="text" name='ip' value={ip} onChange={handleIpChange} placeholder='IP Address' />
        <p className="error">{errors.ip}</p>
      </div>

      <div className="portInput">
        <label htmlFor="port">Now, enter the <b>port</b>:</label>
        <input type="text" name='port' value={port} onChange={handlePortChange} placeholder='Port' />
        <p className="error">{errors.port}</p>
      </div>

      <div className="submitButton">
        <Button onClick={verifyInput}>Submit</Button>
      </div>

    </div>
  )
}

export default ServerInputPage
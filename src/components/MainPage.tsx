import { StringCodec, Subscription } from 'nats.ws'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useNatsClient } from '../hooks/useNatsClient'
import Button from './Button'
import './css/MainPage.scss'


const sc = StringCodec()
function MainPage({ port, hostname }: {port: string, hostname: string}) {

  let clientObj = useNatsClient(hostname, port)
  const [subscriptions, setSubscriptions] = useState<(Subscription | undefined)[]>([])
  const [messages, setMessages] = useState<String[]>([])

  useEffect(() => {
    if(!clientObj.loading) {
      const subscription = clientObj.client?.subscribe("hello")
      setSubscriptions(cv => ([...cv, subscription]));
    }
  }, [clientObj.loading])

  useEffect(() => {
    subscriptions.forEach(sub => {
      if(sub !== undefined) {
        const wait = async () => {
          for await (const m of sub) {
            setMessages(cv => [...cv, sc.decode(m.data)])
          }
        }
        wait()
      }
    })
  }, [subscriptions])

  const [message, setMessage] = useState<string>("")
  const handleMessageChange: ChangeEventHandler<HTMLInputElement> = e => {
    setMessage(e.target.value)
  }
  const sendMsg = () => {
    clientObj.client?.publish("hello", sc.encode(message))
  }

  return (
    <div className='MainPage'>
      <div className="newMessage">
        <h2>New Message</h2>
        <input type="text" value={message} onChange={handleMessageChange} />
        <Button onClick={sendMsg}>Send Message</Button>
      </div>
      <div className="receivedMessages">
        <h2>Received:</h2>
        {messages.map((msg, i) => 
          <p key={i}>{msg}</p>
        )}
      </div>
    </div>
  )
}

export default MainPage
import { JSONCodec, StringCodec, Subscription } from 'nats.ws'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useNatsClient } from '../hooks/useNatsClient'
import Button from './Button'
import './css/MainPage.scss'

const jc = JSONCodec()

type Message = {
  subject: string,
  userUUID: string,
  userName: string,
  message: string,
  timestamp: number
}

function MainPage({ userUUID, userName, port, hostname }: {userUUID: string, userName: string, port: string, hostname: string}) {

  let {state: clientObj, sendMessage} = useNatsClient(hostname, port, userName, userUUID)
  const [subscriptions, setSubscriptions] = useState<(Subscription | undefined)[]>([])
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if(!clientObj.loading) {
      const chatMessagesSubscription = clientObj.client?.subscribe("hello")
      const systemMessagesSubscription = clientObj.client?.subscribe("system")
      setSubscriptions(cv => ([...cv, chatMessagesSubscription, systemMessagesSubscription]));
    }
  }, [clientObj.loading])

  //Set up listening for messages
  useEffect(() => {
    subscriptions.forEach(sub => {
      if(sub !== undefined) {
        const wait = async () => {
          for await (const m of sub) {
            setMessages(cv => [...cv, {...jc.decode(m.data) as Message, subject: sub.getSubject()} ])
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
  const handleSend = () => {
    sendMessage("hello", message)
  }

  return (
    <div className='MainPage'>

      <div className="receivedMessages">
        {messages.map((msg, i) => {

          if(msg.subject === "system") {
            return (<div className={`systemMessage`} key={i}>
              <p>{msg.message}</p>
            </div>)
          }

          let unique = msg.userUUID.split('-')[4]
          let r = unique.substring(0, 2);
          let g = unique.substring(2, 4);
          let b = unique.substring(4, 6);
          let colorHex = `#${r}${g}${b}`

          let isSelf = msg.userUUID === userUUID

          return (<div className={`message ${isSelf ? 'self' : ''}`} key={i}>
            <div className="info">
              <p className="name" style={{color: colorHex}}>{isSelf ? "You" : msg.userName}</p>
              <p className="time">{new Date(msg.timestamp).toLocaleTimeString()}</p>
            </div>
            <div className="content">
              <p>{msg.message}</p>
            </div>
          </div>)
        }
        )}
      </div>

      
      <div className="newMessage">
        <input type="text" value={message} onChange={handleMessageChange} />
        <Button onClick={handleSend}>Send Message</Button>
      </div>

    </div>
  )
}

export default MainPage
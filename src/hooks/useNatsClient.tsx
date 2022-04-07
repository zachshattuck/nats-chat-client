import { connect, JSONCodec, Msg, NatsConnection, NatsError, Subscription } from 'nats.ws'
import { useEffect, useRef, useState } from "react"

const jc = JSONCodec()

export const useNatsClient = (hostname: string, port: string, userName: string, userUUID: string) => {

  const [client, setClient] = useState<NatsConnection | undefined>(undefined)
  const subscriptions = useRef<{ [key: string]: Subscription }>({})

  useEffect(() => {
    connect({servers: `ws://${hostname}:${port}`}).then(client => {

      let msgData = {
        userUUID,
        userName,
        message: `${userName} just connected. Say hi!`,
        timestamp: Date.now()
      }

      client.publish("system", jc.encode(msgData))
      setClient(client)
    })

  }, [])

  //Adds a subscription to the subscriptions dictionary
  const subscribeToSubject = (subject: string, callback: (err: NatsError | null, msg: Msg) => void) => {
    if(client) {
      if(subscriptions.current[subject] === undefined) {
        let sub = client.subscribe(subject)
        sub.callback = callback
        subscriptions.current[subject] = sub
      }

    } else {
      return Error("The client is undefined.")
    }
  }

  //Drains a subscription and removes it from the dictionary
  const unsubscribeFromSubject = (subject: string) => {
    if(subscriptions.current[subject] !== undefined) {
      subscriptions.current[subject].drain()
      delete subscriptions.current[subject]
    }
  }

  //Encodes a message with a subject and string
  const sendMessage = (subject: string, message: string) => {
    if(client) {
      let msgData = {
        userUUID,
        userName,
        message,
        timestamp: Date.now()
      }
      client?.publish(subject, jc.encode(msgData))
    }
  }

  return {client, sendMessage, subscribeToSubject, unsubscribeFromSubject}
}
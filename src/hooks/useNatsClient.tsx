import { connect, JSONCodec, NatsConnection } from 'nats.ws'
import { useEffect, useState } from "react"

const jc = JSONCodec()

export const useNatsClient = (hostname: string, port: string, userName: string, userUUID: string) => {
  const [state, setState] = useState<{ loading: boolean, client: NatsConnection | undefined }>({ loading: true, client: undefined })

  useEffect(() => {
    connect({servers: `ws://${hostname}:${port}`}).then(client => {

      let msgData = {
        userUUID,
        userName,
        message: `${userName} just connected. Say hi!`,
        timestamp: Date.now()
      }

      client.publish("system", jc.encode(msgData))
      setState({loading: false, client})
    })
  }, [])

  const sendMessage = (subject: string, message: string) => {
    if(!state.loading) {
      let msgData = {
        userUUID,
        userName,
        message,
        timestamp: Date.now()
      }
      state.client?.publish(subject, jc.encode(msgData))
    }
  }

  return {state, sendMessage}
}
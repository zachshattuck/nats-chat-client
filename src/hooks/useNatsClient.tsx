import { connect, NatsConnection } from 'nats.ws'
import { useEffect, useState } from "react"

export const useNatsClient = (hostname: string, port: string) => {
  const [state, setState] = useState<{ loading: boolean, client: NatsConnection | undefined }>({ loading: true, client: undefined })

  useEffect(() => {
    connect({servers: `ws://${hostname}:${port}`}).then(client => setState({loading: false, client}))
  }, [])

  return state
}
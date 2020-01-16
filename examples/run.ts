import { ConnectionController } from '@ula-aca/connection'
import WebhookRelayEventRouter from '@ula-aca/webhook-relay-event-router'
import { ExampleConnectionEventHandler } from '@ula-aca/connection/examples'
import { EventHandler } from 'universal-ledger-agent'
import { createConnection } from './createConnection'

async function run(): Promise<void> {
  const connectionControllerFaber = new ConnectionController(
    process.env.ACA_URL || process.env.FIRST_ACA_URL
  )

  const webhookRelayFaber = new WebhookRelayEventRouter(
    process.env.ACA_WHR_URL || process.env.FIRST_ACA_WHR_URL,
    {
      headers: {
        Authorization:
          process.env.ACA_WHR_API_KEY || process.env.FIRST_ACA_WHR_API_KEY
      }
    }
  )

  const connectionEventHandlerFaber = new ExampleConnectionEventHandler('Faber')
  const eventHandlerFaber = new EventHandler([
    connectionControllerFaber,
    connectionEventHandlerFaber,
    webhookRelayFaber
  ])

  const connectionControllerAlice = new ConnectionController(
    process.env.SECOND_ACA_URL
  )
  const webhookRelayAlice = new WebhookRelayEventRouter(
    process.env.SECOND_ACA_WHR_URL,

    {
      headers: {
        Authorization: process.env.SECOND_ACA_WHR_API_KEY
      }
    }
  )
  const connectionEventHandlerAlice = new ExampleConnectionEventHandler('Alice')
  const eventHandlerAlice = new EventHandler([
    connectionControllerAlice,
    connectionEventHandlerAlice,
    webhookRelayAlice
  ])

  await createConnection(eventHandlerFaber, eventHandlerAlice)
}

run().catch(err => console.log(err))

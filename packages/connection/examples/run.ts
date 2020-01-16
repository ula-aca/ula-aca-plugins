import { EventHandler } from 'universal-ledger-agent'
import { logEvent } from '@ula-aca/test-utils'
import WebhookRelayEventRouter from '@ula-aca/webhook-relay-event-router'
import {
  ConnectionController,
  CreateInvitationBody,
  ConnectionMessageTypes,
  ReceiveInvitationBody
} from '../src'

import { createInvitation, receiveInvitation } from '.'
import { ExampleConnectionEventHandler } from './events'

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

  // --- CREATE_INVITATION ---
  const createInvitationBody: CreateInvitationBody = {
    alias: 'Invitation created by Faber for Alice'
  }
  const createdInvitation = await createInvitation(
    eventHandlerFaber,
    createInvitationBody
  )

  logEvent({
    type: ConnectionMessageTypes.CREATE_INVITATION,
    comment: 'Faber created invitation',
    input: createInvitationBody,
    output: createdInvitation
  })

  // --- RECEIVE_INVITATION ---
  const receiveInvitationBody: ReceiveInvitationBody = {
    ...createdInvitation.invitation,
    alias: 'Invitation received by Alice from Faber'
  }

  const receivedInvitation = await receiveInvitation(
    eventHandlerAlice,
    receiveInvitationBody
  )
  logEvent({
    type: ConnectionMessageTypes.RECEIVE_INVITATION,
    comment: 'Alice received invitation',
    input: receiveInvitationBody,
    output: receivedInvitation
  })
}

run().catch(e => {
  console.log(e)
})

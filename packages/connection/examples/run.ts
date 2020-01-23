import { EventHandler } from 'universal-ledger-agent'
import { logEvent } from '@ula-aca/test-utils'
import { WebhookRelayEventRouter } from '@ula-aca/webhook-relay-event-router'
import {
  ConnectionController,
  CreateInvitationBody,
  ConnectionMessageTypes,
  ReceiveInvitationBody
} from '../src'

import { createInvitation, receiveInvitation } from '.'

async function run(): Promise<void> {
  const connControllerFaber = new ConnectionController(
    process.env.FABER_ACA_URL
  )

  const webhookRelayFaber = new WebhookRelayEventRouter(
    process.env.FABER_ACA_WHR_URL,
    {
      headers: {
        Authorization: process.env.FABER_ACA_WHR_API_KEY
      }
    }
  )

  const eventHandlerFaber = new EventHandler([
    connControllerFaber,
    webhookRelayFaber
  ])

  const connControllerAlice = new ConnectionController(
    process.env.ALICE_ACA_URL
  )
  const webhookRelayAlice = new WebhookRelayEventRouter(
    process.env.ALICE_ACA_WHR_URL,

    {
      headers: {
        Authorization: process.env.ALICE_ACA_WHR_API_KEY
      }
    }
  )
  const eventHandlerAlice = new EventHandler([
    connControllerAlice,
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

  // WebSocket will keep running
  process.exit()
}

run().catch(e => {
  console.log(e)
})

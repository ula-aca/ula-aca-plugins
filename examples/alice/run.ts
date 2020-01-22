import {
  ReceiveInvitationBody,
  ConnectionMessageTypes
} from '@ula-aca/connection'
import { receiveInvitation } from '@ula-aca/connection/examples'
import { logEvent } from '@ula-aca/test-utils'
import { ConnectionInvitation } from '@ula-aca/aries-cloudagent-interface'
import { readLine, getEventHandler } from '../utils'
import AliceConnectionEventHandler from './event-handlers/AliceConnectionEventHandler'
import AliceIssueCredentialEventHandler from './event-handlers/AliceIssueCredentialEventHandler'
import AlicePresentProofEventHandler from './event-handlers/AlicePresentProofEventHandler'

async function run(): Promise<void> {
  // Webhook Event Handlers
  const aliceConnectionEventHandler = new AliceConnectionEventHandler()
  const aliceIssueCredentialEventHandler = new AliceIssueCredentialEventHandler()
  const alicePresentProofEventHandler = new AlicePresentProofEventHandler()

  const eventHandlerAlice = getEventHandler({
    acaUrl: process.env.ACA_URL,
    acaWhrUrl: process.env.ACA_WHR_URL,
    acaWhrApiKey: process.env.ACA_WHR_API_KEY,
    webhookEventHandlerPlugins: [
      aliceConnectionEventHandler,
      aliceIssueCredentialEventHandler,
      alicePresentProofEventHandler
    ]
  })

  // --- Get invitation from console input ---
  const invitationString = await readLine('Provide connection invitation: \n')
  const invitation: ConnectionInvitation = JSON.parse(invitationString)

  // --- RECEIVE_INVITATION ---
  const receiveInvitationBody: ReceiveInvitationBody = {
    ...invitation,
    alias: 'Invitation received by Alice from Faber'
  }

  const receivedInvitation = await receiveInvitation(
    eventHandlerAlice,
    receiveInvitationBody
  )
  logEvent({
    type: ConnectionMessageTypes.RECEIVE_INVITATION,
    comment: '#2. Alice receives connection invitation from Faber',
    input: receiveInvitationBody,
    output: receivedInvitation
  })
}

run().catch(err => console.log(err))

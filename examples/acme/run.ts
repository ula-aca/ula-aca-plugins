import {
  ReceiveInvitationBody,
  ConnectionMessageTypes
} from '@ula-aca/connection'
import { receiveInvitation } from '@ula-aca/connection/examples'
import { logEvent } from '@ula-aca/test-utils'
import { ConnectionInvitation } from '@ula-aca/aries-cloudagent-interface'
import { readLine, getEventHandler } from '../utils'
import AcmeConnectionEventHandler from './event-handlers/AcmeConnectionEventHandler'
import AcmeIssueCredentialEventHandler from './event-handlers/AcmeIssueCredentialEventHandler'
import AcmePresentProofEventHandler from './event-handlers/AcmePresentProofEventHandler'

async function run(): Promise<void> {
  // Webhook Event Handlers
  const acmeConnectionEventHandler = new AcmeConnectionEventHandler()
  const acmeIssueCredentialEventHandler = new AcmeIssueCredentialEventHandler()
  const acmePresentProofEventHandler = new AcmePresentProofEventHandler()

  const eventHandlerAcme = getEventHandler({
    acaUrl: process.env.ACA_URL,
    acaWhrUrl: process.env.ACA_WHR_URL,
    acaWhrApiKey: process.env.ACA_WHR_API_KEY,
    webhookEventHandlerPlugins: [
      acmeConnectionEventHandler,
      acmeIssueCredentialEventHandler,
      acmePresentProofEventHandler
    ]
  })

  // --- Get invitation from console input ---
  const invitationString = await readLine('Provide connection invitation: \n')
  const invitation: ConnectionInvitation = JSON.parse(invitationString)

  // --- RECEIVE_INVITATION ---
  const receiveInvitationBody: ReceiveInvitationBody = {
    ...invitation,
    alias: 'Invitation received by Acme from Alice'
  }

  const receivedInvitation = await receiveInvitation(
    eventHandlerAcme,
    receiveInvitationBody
  )
  logEvent({
    type: ConnectionMessageTypes.RECEIVE_INVITATION,
    comment: '#14. Acme receives connection invitation from Alice',
    input: receiveInvitationBody,
    output: receivedInvitation
  })
}

run().catch(err => console.log(err))

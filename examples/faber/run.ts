import {
  CreateInvitationBody,
  ConnectionMessageTypes
} from '@ula-aca/connection'
import { createInvitation } from '@ula-aca/connection/examples'
import { logEvent } from '@ula-aca/test-utils'
import { getEventHandler } from '../utils'
import FaberConnectionEventHandler from './event-handlers/FaberConnectionEventHandler'
import FaberIssueCredentialEventHandler from './event-handlers/FaberIssueCredentialEventHandler'
import FaberPresentProofEventHandler from './event-handlers/FaberPresentProofEventHandler'

async function run(): Promise<void> {
  // Webhook Event Handlers
  const faberConnectionEventHandler = new FaberConnectionEventHandler()
  const faberIssueCredentialEventHandler = new FaberIssueCredentialEventHandler()
  const faberPresentProofEventHandler = new FaberPresentProofEventHandler()

  const eventHandlerFaber = getEventHandler({
    acaUrl: process.env.FABER_ACA_URL,
    acaApiKey: process.env.FABER_ACA_API_KEY,
    acaWhrUrl: process.env.FABER_ACA_WHR_URL,
    acaWhrApiKey: process.env.FABER_ACA_WHR_API_KEY,
    webhookEventHandlerPlugins: [
      faberConnectionEventHandler,
      faberIssueCredentialEventHandler,
      faberPresentProofEventHandler
    ]
  })

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
    comment: `#1. Faber creates connection invitation for Alice\n\n${JSON.stringify(
      createdInvitation.invitation
    )}`,
    input: createInvitationBody,
    output: createdInvitation
  })
}

run().catch(err => console.log(err))

import {
  CreateInvitationBody,
  ConnectionMessageTypes,
  ReceiveInvitationBody
} from '@ula-aca/connection'
import {
  createInvitation,
  receiveInvitation
} from '@ula-aca/connection/examples'
import { EventHandler } from 'universal-ledger-agent'
import { logEvent } from '@ula-aca/test-utils'

async function createConnection(
  eventHandlerFaber: EventHandler,
  eventHandlerAlice: EventHandler
): Promise<void> {
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

export { createConnection }

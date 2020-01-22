/* eslint-disable @typescript-eslint/require-await */
import {
  BasicMessage,
  PairwiseConnectionRecordInit,
  PairwiseConnectionRecordInvitation,
  PairwiseConnectionRecordRequest,
  PairwiseConnectionRecordResponse,
  PairwiseConnectionRecordActive,
  PairwiseConnectionRecordInactive,
  PairwiseConnectionRecordError
} from '@ula-aca/aca-webhook-event-models'
import { logEvent, logWebhookEvent } from '@ula-aca/test-utils'
import {
  ConnectionEventHandler,
  ConnectionMessageTypes,
  AcceptInvitationBody
} from '@ula-aca/connection'
import { acceptInvitation } from '@ula-aca/connection/examples'
import { sendRequest as sendProofRequest } from '@ula-aca/present-proof/examples'
import {
  SendRequestBody as SendProofRequestBody,
  PresentProofMessageTypes
} from '@ula-aca/present-proof'

class AcmeConnectionEventHandler extends ConnectionEventHandler {
  async onBasicMessage(message: BasicMessage): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onBasicMessage`,
      input: message
    })
  }

  async onInit(message: PairwiseConnectionRecordInit): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onInit`,
      input: message
    })
  }

  async onInvitation(
    message: PairwiseConnectionRecordInvitation
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onInvitation`,
      input: message
    })

    // onInvitation is also called when I create an invitation.
    // Only want to accept received invitation, not initiated invitations.
    if (message.initiator !== 'self') {
      const body: AcceptInvitationBody = {
        connection_id: message.connection_id
      }

      const result = await acceptInvitation(this.eventHandler, body)
      logEvent({
        type: ConnectionMessageTypes.ACCEPT_INVITATION,
        comment: `#15. Acme accepts connection invitation from AcmeConnectionEventHandler.OnInvitation()`,
        input: body,
        output: result
      })
    }
  }

  async onRequest(message: PairwiseConnectionRecordRequest): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onRequest`,
      input: message
    })
  }

  async onResponse(message: PairwiseConnectionRecordResponse): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onResponse`,
      input: message
    })

    // we only allow the CollegeDegreeSchema credential definition from Faber college
    // Todo: DID changes when server restarts. Find better way to get cred_def_id to acme
    const cred_def_id =
      'Bqqp9wananY4uW2pRHACiT:3:CL:12:Faber-CollegeDegreeSchema'

    const sendProofRequestBody: SendProofRequestBody = {
      connection_id: message.connection_id,
      comment: 'As Acme I want to request a proof of degree from Alice',
      proof_request: {
        requested_attributes: {
          first_name: {
            name: 'first_name',
            restrictions: [
              {
                cred_def_id
              }
            ]
          },
          last_name: {
            name: 'last_name',
            restrictions: [
              {
                cred_def_id
              }
            ]
          },
          degree: {
            name: 'degree',
            restrictions: [
              {
                cred_def_id
              }
            ]
          }
        },
        requested_predicates: {},
        name: 'AcmeRequestAlice',
        version: '1.0',
        nonce: '12345678'
      }
    }
    const result = await sendProofRequest(
      this.eventHandler,
      sendProofRequestBody
    )
    logEvent({
      type: PresentProofMessageTypes.SEND_REQUEST,
      comment: `#17. Acme sends proof request to Alice (AcmeConnectionEventHandler.onActive)`,
      input: sendProofRequestBody,
      output: result
    })
  }

  async onActive(message: PairwiseConnectionRecordActive): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onActive`,
      input: message
    })
  }

  async onInactive(message: PairwiseConnectionRecordInactive): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onInactive`,
      input: message
    })
  }

  async onError(message: PairwiseConnectionRecordError): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onError`,
      input: message
    })
  }
}

export default AcmeConnectionEventHandler

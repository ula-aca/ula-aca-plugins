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
} from '@ula-aca/webhook-event-models'
import { logEvent, logWebhookEvent } from '@ula-aca/test-utils'
import {
  ConnectionEventHandler,
  ConnectionMessageTypes,
  AcceptRequestBody,
  SendBasicMessageBody
} from '@ula-aca/connection'
import { acceptRequest, sendBasicMessage } from '@ula-aca/connection/examples'
import { CreateSchemaBody, SchemaMessageTypes } from '@ula-aca/schema'
import { createSchema } from '@ula-aca/schema/examples'
import {
  CreateCredentialDefinitionBody,
  CredentialDefinitionMessageTypes
} from '@ula-aca/credential-definition'
import { createCredentialDefinition } from '@ula-aca/credential-definition/examples'
import {
  IssueCredentialMessageTypes,
  SendOfferBody
} from '@ula-aca/issue-credential'
import { CredentialPreviewTypeEnum } from '@ula-aca/aries-cloudagent-interface'
import { sendOffer } from '@ula-aca/issue-credential/examples'

class FaberConnectionEventHandler extends ConnectionEventHandler {
  async onBasicMessage(message: BasicMessage): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberConnectionEventHandler | onBasicMessage`,
      input: message
    })

    // Send basic message after getting basic message from alice. We now have a connection
    // This will move it from 'response' to 'active'. This is not needed.
    // The first action done on a connection will move it from 'response' to 'active'
    const body: SendBasicMessageBody = {
      connection_id: message.connection_id,
      content: `Hello, I am Faber`
    }

    const result = await sendBasicMessage(this.eventHandler, body)
    logEvent({
      type: ConnectionMessageTypes.SEND_BASIC_MESSAGE,
      comment: `#6. Faber sends message to Alice (FaberConnectionEventHandler.onBasicMessage)`,
      input: body,
      output: result
    })
  }

  async onInit(message: PairwiseConnectionRecordInit): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberConnectionEventHandler | onInit`,
      input: message
    })
  }

  async onInvitation(
    message: PairwiseConnectionRecordInvitation
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberConnectionEventHandler | onInvitation`,
      input: message
    })
  }

  async onRequest(message: PairwiseConnectionRecordRequest): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberConnectionEventHandler | onRequest`,
      input: message
    })

    // Always accept connection requests. You could add logic here to see
    // if you really want to accept this credential
    const body: AcceptRequestBody = {
      connection_id: message.connection_id
    }

    const result = await acceptRequest(this.eventHandler, body)
    logEvent({
      type: ConnectionMessageTypes.ACCEPT_REQUEST,
      comment: `#4. Faber accepts connection request from Alice (FaberConnectionEventHandler.onRequest)`,
      input: body,
      output: result
    })
  }

  async onResponse(message: PairwiseConnectionRecordResponse): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberConnectionEventHandler | onResponse`,
      input: message
    })
  }

  async onActive(message: PairwiseConnectionRecordActive): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberConnectionEventHandler | onActive`,
      input: message
    })

    // --- CREATE_SCHEMA ---
    const createSchemaBody: CreateSchemaBody = {
      schema_name: 'CollegeDegreeSchema',
      schema_version: '1.0',
      attributes: ['first_name', 'last_name', 'degree']
    }
    const createdSchema = await createSchema(
      this.eventHandler,
      createSchemaBody
    )

    logEvent({
      type: SchemaMessageTypes.CREATE_SCHEMA,
      comment: `#7. Faber creates schema (FaberConnectionEventHandler.onActive)`,
      input: createSchemaBody,
      output: createdSchema
    })

    // --- CREATE_CREDENTIAL_DEFINITION ---
    const createCredentialDefinitionBody: CreateCredentialDefinitionBody = {
      schema_id: createdSchema.schema_id,
      tag: `Faber-CollegeDegreeSchema`
    }
    const createdCredentialDefinition = await createCredentialDefinition(
      this.eventHandler,
      createCredentialDefinitionBody
    )
    logEvent({
      type: CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION,
      comment: `#8. Faber creates credential definition (FaberConnectionEventHandler.onActive)`,
      input: createCredentialDefinitionBody,
      output: createdCredentialDefinition
    })

    // --- SEND_OFFER ---
    const sendOfferBody: SendOfferBody = {
      connection_id: message.connection_id,
      cred_def_id: createdCredentialDefinition.credential_definition_id,
      comment: `As Faber I would like to send you a credential`,
      credential_preview: {
        '@type':
          CredentialPreviewTypeEnum.DidsovBzCbsNYhMrjHiqZDTUASHgspecIssueCredential10CredentialPreview,
        attributes: [
          {
            name: 'first_name',
            value: 'Alice'
          },
          {
            name: 'last_name',
            value: 'Gorgonzola'
          },
          {
            name: 'degree',
            value: 'Kaaskunde'
          }
        ]
      }
    }

    const result = await sendOffer(this.eventHandler, sendOfferBody)
    logEvent({
      type: IssueCredentialMessageTypes.SEND_OFFER,
      comment: `#9. Faber sends credential offer to Alice (FaberConnectionEventHandler.onActive)`,
      input: sendOfferBody,
      output: result
    })
  }

  async onInactive(message: PairwiseConnectionRecordInactive): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberConnectionEventHandler | onInactive`,
      input: message
    })
  }

  async onError(message: PairwiseConnectionRecordError): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberConnectionEventHandler | onError`,
      input: message
    })
  }
}

export default FaberConnectionEventHandler

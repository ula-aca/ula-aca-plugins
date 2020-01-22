/* eslint-disable @typescript-eslint/require-await */
import {
  IssueCredentialEventHandler,
  IssueBody,
  IssueCredentialMessageTypes
} from '@ula-aca/issue-credential'
import {
  CredentialExchangeRecordProposalSent,
  CredentialExchangeRecordProposalReceived,
  CredentialExchangeRecordOfferSent,
  CredentialExchangeRecordOfferReceived,
  CredentialExchangeRecordRequestSent,
  CredentialExchangeRecordRequestReceived,
  CredentialExchangeRecordIssued,
  CredentialExchangeRecordCredentialReceived,
  CredentialExchangeRecordCredentialAcknowledged
} from '@ula-aca/aca-webhook-event-models'
import { logWebhookEvent, logEvent } from '@ula-aca/test-utils'
import { issue } from '@ula-aca/issue-credential/examples'

class FaberIssueCredentialEventHandler extends IssueCredentialEventHandler {
  async onProposalSent(
    message: CredentialExchangeRecordProposalSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onProposalSent`,
      input: message
    })
  }

  async onProposalReceived(
    message: CredentialExchangeRecordProposalReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onProposalReceived`,
      input: message
    })
  }

  async onOfferSent(message: CredentialExchangeRecordOfferSent): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onOfferSent`,
      input: message
    })
  }

  async onOfferReceived(
    message: CredentialExchangeRecordOfferReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onOfferReceived`,
      input: message
    })
  }

  async onRequestSent(
    message: CredentialExchangeRecordRequestSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onRequestSent`,
      input: message
    })
  }

  async onRequestReceived(
    message: CredentialExchangeRecordRequestReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onRequestReceived`,
      input: message
    })

    // Always issue credential when we receive a request. You could add logic here to see
    // if you really want to accept this credential
    const issueBody: IssueBody = {
      credential_exchange_id: message.credential_exchange_id,
      credential_preview: message.credential_proposal_dict.credential_proposal
    }
    const result = await issue(this.eventHandler, issueBody)
    logEvent({
      type: IssueCredentialMessageTypes.ISSUE,
      comment:
        '#11. Faber issues credential to Alice (FaberIssueCredentialEventHandler.onRequestReceived)',
      input: issueBody,
      output: result
    })
  }

  async onIssued(message: CredentialExchangeRecordIssued): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onIssued`,
      input: message
    })
  }

  async onCredentialAcknowledged(
    message: CredentialExchangeRecordCredentialAcknowledged
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onCredentialAcknowledged`,
      input: message
    })
  }

  async onCredentialReceived(
    message: CredentialExchangeRecordCredentialReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onCredentialReceived`,
      input: message
    })
  }
}

export default FaberIssueCredentialEventHandler

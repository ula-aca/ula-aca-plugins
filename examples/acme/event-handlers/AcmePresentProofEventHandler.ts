/* eslint-disable @typescript-eslint/require-await */
import { PresentProofEventHandler } from '@ula-aca/present-proof'

import {
  PresentationExchangeRecordProposalSent,
  PresentationExchangeRecordProposalReceived,
  PresentationExchangeRecordRequestSent,
  PresentationExchangeRecordRequestReceived,
  PresentationExchangeRecordPresentationSent,
  PresentationExchangeRecordPresentationReceived,
  PresentationExchangeRecordVerified
} from '@ula-aca/aca-webhook-event-models'
import { logWebhookEvent, logJson } from '@ula-aca/test-utils'

class AcmePresentProofEventHandler extends PresentProofEventHandler {
  async onProposalSent(
    message: PresentationExchangeRecordProposalSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmePresentProofEventHandler | onProposalSent`,
      input: message
    })
  }

  async onProposalReceived(
    message: PresentationExchangeRecordProposalReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmePresentProofEventHandler | onProposalReceived`,
      input: message
    })
  }

  async onRequestSent(
    message: PresentationExchangeRecordRequestSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmePresentProofEventHandler | onRequestSent`,
      input: message
    })
  }

  async onRequestReceived(
    message: PresentationExchangeRecordRequestReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmePresentProofEventHandler | onRequestReceived`,
      input: message
    })
  }

  async onPresentationSent(
    message: PresentationExchangeRecordPresentationSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmePresentProofEventHandler | onPresentationSent`,
      input: message
    })
  }

  async onPresentationReceived(
    message: PresentationExchangeRecordPresentationReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmePresentProofEventHandler | onPresentationReceived`,
      input: message
    })

    const receivedAttributes = Object.entries(
      message.presentation.requested_proof.revealed_attrs
    ).reduce(
      (attrs, [attr_name, { raw }]) => ({
        ...attrs,
        [attr_name]: raw
      }),
      {}
    )

    logJson({
      type: 'Presentation received',
      input: receivedAttributes,
      comment: 'Acme received presentation from Alice'
    })
  }

  async onVerified(message: PresentationExchangeRecordVerified): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmePresentProofEventHandler | onVerified`,
      input: message
    })
  }
}

export default AcmePresentProofEventHandler

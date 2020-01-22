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
import { logWebhookEvent } from '@ula-aca/test-utils'

class FaberPresentProofEventHandler extends PresentProofEventHandler {
  async onProposalSent(
    message: PresentationExchangeRecordProposalSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onProposalSent`,
      input: message
    })
  }

  async onProposalReceived(
    message: PresentationExchangeRecordProposalReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onProposalReceived`,
      input: message
    })
  }

  async onRequestSent(
    message: PresentationExchangeRecordRequestSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onRequestSent`,
      input: message
    })
  }

  async onRequestReceived(
    message: PresentationExchangeRecordRequestReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onRequestReceived`,
      input: message
    })
  }

  async onPresentationSent(
    message: PresentationExchangeRecordPresentationSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onPresentationSent`,
      input: message
    })
  }

  async onPresentationReceived(
    message: PresentationExchangeRecordPresentationReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onPresentationReceived`,
      input: message
    })
  }

  async onVerified(message: PresentationExchangeRecordVerified): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onVerified`,
      input: message
    })
  }
}

export default FaberPresentProofEventHandler

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

class ExampleProofEventHandler extends PresentProofEventHandler {
  constructor(private label: string) {
    super()
  }

  onProposalSent(
    message: PresentationExchangeRecordProposalSent
  ): Promise<void> {
    logWebhookEvent({
      type: `${this.label} | ProofEventHandler | onProposalSent`,
      input: message
    })

    return Promise.resolve()
  }

  onProposalReceived(
    message: PresentationExchangeRecordProposalReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `${this.label} | ProofEventHandler | onProposalReceived`,
      input: message
    })

    return Promise.resolve()
  }

  onRequestSent(message: PresentationExchangeRecordRequestSent): Promise<void> {
    logWebhookEvent({
      type: `${this.label} | ProofEventHandler | onRequestSent`,
      input: message
    })

    return Promise.resolve()
  }

  onRequestReceived(
    message: PresentationExchangeRecordRequestReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `${this.label} | ProofEventHandler | onRequestReceived`,
      input: message
    })

    return Promise.resolve()
  }

  onPresentationSent(
    message: PresentationExchangeRecordPresentationSent
  ): Promise<void> {
    logWebhookEvent({
      type: `${this.label} | ProofEventHandler | onPresentationSent`,
      input: message
    })

    return Promise.resolve()
  }

  onPresentationReceived(
    message: PresentationExchangeRecordPresentationReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `${this.label} | ProofEventHandler | onPresentationReceived`,
      input: message
    })

    return Promise.resolve()
  }

  onVerified(message: PresentationExchangeRecordVerified): Promise<void> {
    logWebhookEvent({
      type: `${this.label} | ProofEventHandler | onVerified`,
      input: message
    })

    return Promise.resolve()
  }
}

export { ExampleProofEventHandler }

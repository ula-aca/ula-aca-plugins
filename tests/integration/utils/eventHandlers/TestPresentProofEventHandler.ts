/*
 * Copyright 2020-present ula-aca
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { PresentProofEventHandler } from '@ula-aca/present-proof'
import {
  PresentationExchangeRecordProposalSent,
  PresentationExchangeRecordProposalReceived,
  PresentationExchangeRecordRequestSent,
  PresentationExchangeRecordRequestReceived,
  PresentationExchangeRecordPresentationSent,
  PresentationExchangeRecordPresentationReceived,
  PresentationExchangeRecordVerified
} from '@ula-aca/webhook-event-models'

/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */

class TestPresentProofEventHandler extends PresentProofEventHandler {
  async onProposalSent(
    message: PresentationExchangeRecordProposalSent
  ): Promise<void> {}

  async onProposalReceived(
    message: PresentationExchangeRecordProposalReceived
  ): Promise<void> {}

  async onRequestSent(
    message: PresentationExchangeRecordRequestSent
  ): Promise<void> {}

  async onRequestReceived(
    message: PresentationExchangeRecordRequestReceived
  ): Promise<void> {}

  async onPresentationSent(
    message: PresentationExchangeRecordPresentationSent
  ): Promise<void> {}

  async onPresentationReceived(
    message: PresentationExchangeRecordPresentationReceived
  ): Promise<void> {}

  async onVerified(
    message: PresentationExchangeRecordVerified
  ): Promise<void> {}
}

export default TestPresentProofEventHandler

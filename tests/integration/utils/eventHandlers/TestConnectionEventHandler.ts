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
import { ConnectionEventHandler } from '@ula-aca/connection'

/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */

class TestConnectionEventHandler extends ConnectionEventHandler {
  async onBasicMessage(message: BasicMessage): Promise<void> {}

  async onInit(message: PairwiseConnectionRecordInit): Promise<void> {}

  async onInvitation(
    message: PairwiseConnectionRecordInvitation
  ): Promise<void> {}

  async onRequest(message: PairwiseConnectionRecordRequest): Promise<void> {}

  async onResponse(message: PairwiseConnectionRecordResponse): Promise<void> {}

  async onActive(message: PairwiseConnectionRecordActive): Promise<void> {}

  async onInactive(message: PairwiseConnectionRecordInactive): Promise<void> {}

  async onError(message: PairwiseConnectionRecordError): Promise<void> {}
}

export default TestConnectionEventHandler

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
  isPairwiseConnectionRecordActive,
  isPairwiseConnectionRecordError,
  isPairwiseConnectionRecordInactive,
  isPairwiseConnectionRecordInit,
  isPairwiseConnectionRecordInvitation,
  isPairwiseConnectionRecordRequest,
  isPairwiseConnectionRecordResponse,
  PairwiseConnectionRecordBase,
  PairwiseConnectionRecordState
} from '../src/pairwise-connection-record'

const baseEvent: Omit<PairwiseConnectionRecordBase, 'state'> = {
  accept: 'auto',
  connection_id: 'connection_id',
  initiator: 'external',
  invitation_key: 'invitation_key',
  invitation_mode: 'multi',
  routing_state: 'active'
}

describe('[package] @ula-aca/aca-webhook-event-models', () => {
  describe('pairwise-connection-record', () => {
    it("[function] isPairwiseConnectionRecordActive() should return whether event state is 'active'", () => {
      isPairwiseConnectionRecordActive({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ACTIVE
      }).should.equal(true)

      isPairwiseConnectionRecordActive({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordError() should return whether event state is 'error'", () => {
      isPairwiseConnectionRecordError({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(true)

      isPairwiseConnectionRecordError({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ACTIVE
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordInactive() should return whether event state is 'inactive'", () => {
      isPairwiseConnectionRecordInactive({
        ...baseEvent,
        state: PairwiseConnectionRecordState.INACTIVE
      }).should.equal(true)

      isPairwiseConnectionRecordInactive({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordInit() should return whether event state is 'init'", () => {
      isPairwiseConnectionRecordInit({
        ...baseEvent,
        state: PairwiseConnectionRecordState.INIT
      }).should.equal(true)

      isPairwiseConnectionRecordInit({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordInvitation() should return whether event state is 'invitation'", () => {
      isPairwiseConnectionRecordInvitation({
        ...baseEvent,
        state: PairwiseConnectionRecordState.INVITATION
      }).should.equal(true)

      isPairwiseConnectionRecordInvitation({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordRequest() should return whether event state is 'request'", () => {
      isPairwiseConnectionRecordRequest({
        ...baseEvent,
        state: PairwiseConnectionRecordState.REQUEST
      }).should.equal(true)

      isPairwiseConnectionRecordRequest({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordResponse() should return whether event state is 'response'", () => {
      isPairwiseConnectionRecordResponse({
        ...baseEvent,
        state: PairwiseConnectionRecordState.RESPONSE
      }).should.equal(true)

      isPairwiseConnectionRecordResponse({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })
  })
})

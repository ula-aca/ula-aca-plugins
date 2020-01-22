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
  isPresentationExchangeRecordPresentationReceived,
  isPresentationExchangeRecordProposalReceived,
  isPresentationExchangeRecordProposalSent,
  isPresentationExchangeRecordRequestReceived,
  isPresentationExchangeRecordRequestSent,
  isPresentationExchangeRecordPresentationSent,
  isPresentationExchangeRecordVerified,
  PresentationExchangeRecordBase,
  PresentationExchangeRecordState
} from '../src/presentation-exchange-record'

const baseEvent: Omit<PresentationExchangeRecordBase, 'state'> = {
  connection_id: 'connection_id',
  initiator: 'external',
  thread_id: 'thread_id',
  auto_present: true,
  presentation: {
    identifiers: [],
    requested_proof: {
      predicates: {},
      revealed_attrs: {},
      self_attested_attrs: {},
      unrevealed_attrs: {}
    },
    proof: {
      aggregated_proof: {
        c_hash: '',
        c_list: [[]]
      },
      proofs: [
        {
          non_revoc_proof: null,
          primary_proof: {
            eq_proof: {
              a_prime: '',
              e: '',
              m: {
                master_secret: ''
              },
              m2: '',
              revealed_attrs: {},
              v: ''
            },
            ge_proofs: []
          }
        }
      ]
    }
  },
  presentation_exchange_id: 'presentation_exchange_id',
  presentation_proposal_dict: 'presentation_proposal_dict',
  presentation_request: {
    requested_attributes: {},
    requested_predicates: {},
    name: '',
    nonce: '',
    version: ''
  },
  verified: 'true'
}

describe('[package] @ula-aca/aca-webhook-event-models', () => {
  describe('presentation-exchange-record', () => {
    it("[function] isPresentationExchangeRecordPresentationReceived() should return whether event state is 'presentation_received'", () => {
      isPresentationExchangeRecordPresentationReceived({
        ...baseEvent,
        state: PresentationExchangeRecordState.PRESENTATION_RECEIVED
      }).should.equal(true)

      isPresentationExchangeRecordPresentationReceived({
        ...baseEvent,
        state: PresentationExchangeRecordState.PRESENTATION_SENT
      }).should.equal(false)
    })

    it("[function] isPresentationExchangeRecordProposalReceived() should return whether event state is 'proposal_received'", () => {
      isPresentationExchangeRecordProposalReceived({
        ...baseEvent,
        state: PresentationExchangeRecordState.PROPOSAL_RECEIVED
      }).should.equal(true)

      isPresentationExchangeRecordProposalReceived({
        ...baseEvent,
        state: PresentationExchangeRecordState.PRESENTATION_SENT
      }).should.equal(false)
    })

    it("[function] isPresentationExchangeRecordProposalSent() should return whether event state is 'proposal_sent'", () => {
      isPresentationExchangeRecordProposalSent({
        ...baseEvent,
        state: PresentationExchangeRecordState.PROPOSAL_SENT
      }).should.equal(true)

      isPresentationExchangeRecordProposalSent({
        ...baseEvent,
        state: PresentationExchangeRecordState.PRESENTATION_SENT
      }).should.equal(false)
    })

    it("[function] isPresentationExchangeRecordRequestReceived() should return whether event state is 'request_received'", () => {
      isPresentationExchangeRecordRequestReceived({
        ...baseEvent,
        state: PresentationExchangeRecordState.REQUEST_RECEIVED
      }).should.equal(true)

      isPresentationExchangeRecordRequestReceived({
        ...baseEvent,
        state: PresentationExchangeRecordState.PRESENTATION_SENT
      }).should.equal(false)
    })

    it("[function] isPresentationExchangeRecordRequestSent() should return whether event state is 'request_sent'", () => {
      isPresentationExchangeRecordRequestSent({
        ...baseEvent,
        state: PresentationExchangeRecordState.REQUEST_SENT
      }).should.equal(true)

      isPresentationExchangeRecordRequestSent({
        ...baseEvent,
        state: PresentationExchangeRecordState.PRESENTATION_SENT
      }).should.equal(false)
    })

    it("[function] isPresentationExchangeRecordPresentationSent() should return whether event state is 'presentation_sent'", () => {
      isPresentationExchangeRecordPresentationSent({
        ...baseEvent,
        state: PresentationExchangeRecordState.PRESENTATION_SENT
      }).should.equal(true)

      isPresentationExchangeRecordPresentationSent({
        ...baseEvent,
        state: PresentationExchangeRecordState.PRESENTATION_RECEIVED
      }).should.equal(false)
    })

    it("[function] isPresentationExchangeRecordVerified() should return whether event state is 'verified'", () => {
      isPresentationExchangeRecordVerified({
        ...baseEvent,
        state: PresentationExchangeRecordState.VERIFIED
      }).should.equal(true)

      isPresentationExchangeRecordVerified({
        ...baseEvent,
        state: PresentationExchangeRecordState.PRESENTATION_SENT
      }).should.equal(false)
    })
  })
})

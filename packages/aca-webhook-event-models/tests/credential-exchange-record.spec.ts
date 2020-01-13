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
  isCredentialExchangeRecordCredentialReceived,
  isCredentialExchangeRecordIssued,
  isCredentialExchangeRecordOfferReceived,
  isCredentialExchangeRecordOfferSent,
  isCredentialExchangeRecordProposalReceived,
  isCredentialExchangeRecordProposalSent,
  isCredentialExchangeRecordRequestReceived,
  isCredentialExchangeRecordRequestSent,
  isCredentialExchangeRecordStored,
  CredentialExchangeRecordBase,
  CredentialExchangeRecordState
} from '../src/credential-exchange-record'

const baseEvent: Omit<CredentialExchangeRecordBase, 'state'> = {
  auto_issue: true,
  auto_offer: true,
  connection_id: 'connection_id',
  credential: 'credential',
  credential_definition_id: 'credential_definition_id',
  credential_exchange_id: 'credential_exchange_id',
  credential_id: 'credential_id',
  credential_offer: 'credential_offer',
  credential_proposal_dict: 'credential_proposal_dict',
  credential_request: 'credential_request',
  credential_request_metadata: 'credential_request_metadata',
  initiator: 'external',
  raw_credential: 'raw_credential',
  schema_id: 'schema_id',
  thread_id: 'thread_id'
}

describe('[package] @ula-aca/aca-webhook-event-models', () => {
  describe('credential-exchange-record', () => {
    it("[function] isCredentialExchangeRecordCredentialReceived() should return whether event state is 'credential_received'", () => {
      isCredentialExchangeRecordCredentialReceived({
        ...baseEvent,
        state: CredentialExchangeRecordState.CREDENTIAL_RECEIVED
      }).should.equal(true)

      isCredentialExchangeRecordCredentialReceived({
        ...baseEvent,
        state: CredentialExchangeRecordState.OFFER_RECEIVED
      }).should.equal(false)
    })

    it("[function] isCredentialExchangeRecordIssued() should return whether event state is 'issued'", () => {
      isCredentialExchangeRecordIssued({
        ...baseEvent,
        state: CredentialExchangeRecordState.ISSUED
      }).should.equal(true)

      isCredentialExchangeRecordIssued({
        ...baseEvent,
        state: CredentialExchangeRecordState.CREDENTIAL_RECEIVED
      }).should.equal(false)
    })

    it("[function] isCredentialExchangeRecordOfferReceived() should return whether event state is 'offer_received'", () => {
      isCredentialExchangeRecordOfferReceived({
        ...baseEvent,
        state: CredentialExchangeRecordState.OFFER_RECEIVED
      }).should.equal(true)

      isCredentialExchangeRecordOfferReceived({
        ...baseEvent,
        state: CredentialExchangeRecordState.CREDENTIAL_RECEIVED
      }).should.equal(false)
    })

    it("[function] isCredentialExchangeRecordOfferSent() should return whether event state is 'offer_sent'", () => {
      isCredentialExchangeRecordOfferSent({
        ...baseEvent,
        state: CredentialExchangeRecordState.OFFER_SENT
      }).should.equal(true)

      isCredentialExchangeRecordOfferSent({
        ...baseEvent,
        state: CredentialExchangeRecordState.CREDENTIAL_RECEIVED
      }).should.equal(false)
    })

    it("[function] isCredentialExchangeRecordProposalReceived() should return whether event state is 'proposal_received'", () => {
      isCredentialExchangeRecordProposalReceived({
        ...baseEvent,
        state: CredentialExchangeRecordState.PROPOSAL_RECEIVED
      }).should.equal(true)

      isCredentialExchangeRecordProposalReceived({
        ...baseEvent,
        state: CredentialExchangeRecordState.CREDENTIAL_RECEIVED
      }).should.equal(false)
    })

    it("[function] isCredentialExchangeRecordProposalSent() should return whether event state is 'proposal_sent'", () => {
      isCredentialExchangeRecordProposalSent({
        ...baseEvent,
        state: CredentialExchangeRecordState.PROPOSAL_SENT
      }).should.equal(true)

      isCredentialExchangeRecordProposalSent({
        ...baseEvent,
        state: CredentialExchangeRecordState.CREDENTIAL_RECEIVED
      }).should.equal(false)
    })

    it("[function] isCredentialExchangeRecordRequestReceived() should return whether event state is 'request_received'", () => {
      isCredentialExchangeRecordRequestReceived({
        ...baseEvent,
        state: CredentialExchangeRecordState.REQUEST_RECEIVED
      }).should.equal(true)

      isCredentialExchangeRecordRequestReceived({
        ...baseEvent,
        state: CredentialExchangeRecordState.CREDENTIAL_RECEIVED
      }).should.equal(false)
    })

    it("[function] isCredentialExchangeRecordRequestSent() should return whether event state is 'request_sent'", () => {
      isCredentialExchangeRecordRequestSent({
        ...baseEvent,
        state: CredentialExchangeRecordState.REQUEST_SENT
      }).should.equal(true)

      isCredentialExchangeRecordRequestSent({
        ...baseEvent,
        state: CredentialExchangeRecordState.CREDENTIAL_RECEIVED
      }).should.equal(false)
    })

    it("[function] isCredentialExchangeRecordStored() should return whether event state is 'stored'", () => {
      isCredentialExchangeRecordStored({
        ...baseEvent,
        state: CredentialExchangeRecordState.STORED
      }).should.equal(true)

      isCredentialExchangeRecordStored({
        ...baseEvent,
        state: CredentialExchangeRecordState.CREDENTIAL_RECEIVED
      }).should.equal(false)
    })
  })
})

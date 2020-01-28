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

import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  RegisterNymBody,
  RegisterNymMessage,
  LedgerMessageTypes,
  GetVerkeyByDidBody,
  GetVerkeyByDidMessage,
  GetEndpointByDidBody,
  GetEndpointByDidMessage,
  GetTransactionAuthorAgreementMessage,
  AcceptTransactionAuthorAgreementBody,
  AcceptTransactionAuthorAgreementMessage
} from '@ula-aca/ledger'

import { eventPromise } from '.'

const registerNym = (
  eventHandler: EventHandler,
  body: RegisterNymBody
): Promise<UlaResponse> => {
  const message: RegisterNymMessage = {
    type: LedgerMessageTypes.REGISER_NYM,
    body
  }

  return eventPromise(eventHandler, message)
}

const getVerkeyByDid = (
  eventHandler: EventHandler,
  body: GetVerkeyByDidBody
): Promise<UlaResponse> => {
  const message: GetVerkeyByDidMessage = {
    type: LedgerMessageTypes.GET_VERKEY_BY_DID,
    body
  }

  return eventPromise(eventHandler, message)
}

const getEndpointByDid = (
  eventHandler: EventHandler,
  body: GetEndpointByDidBody
): Promise<UlaResponse> => {
  const message: GetEndpointByDidMessage = {
    type: LedgerMessageTypes.GET_ENDPOINT_BY_DID,
    body
  }

  return eventPromise(eventHandler, message)
}

const getTransactionAuthorAgreement = (
  eventHandler: EventHandler
): Promise<UlaResponse> => {
  const message: GetTransactionAuthorAgreementMessage = {
    type: LedgerMessageTypes.GET_TRANSACTION_AUTHOR_AGREEMENT
  }

  return eventPromise(eventHandler, message)
}

const acceptTransactionAuthorAgreement = (
  eventHandler: EventHandler,
  body?: AcceptTransactionAuthorAgreementBody
): Promise<UlaResponse> => {
  const message: AcceptTransactionAuthorAgreementMessage = {
    type: LedgerMessageTypes.ACCEPT_TRANSACTION_AUTHOR_AGREEMENT,
    body
  }

  return eventPromise(eventHandler, message)
}

export {
  registerNym,
  getVerkeyByDid,
  getEndpointByDid,
  getTransactionAuthorAgreement,
  acceptTransactionAuthorAgreement
}

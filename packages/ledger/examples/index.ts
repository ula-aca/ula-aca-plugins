/*
 * Copyright 2020 ula-aca.
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

import { UlaResponse, EventHandler } from 'universal-ledger-agent'
import {
  RegisterNymMessage,
  RegisterNymResult,
  LedgerMessageTypes,
  RegisterNymBody,
  GetVerkeyByDidBody,
  GetVerkeyByDidMessage,
  GetVerkeyByDidResult,
  GetEndpointByDidBody,
  GetEndpointByDidResult,
  GetEndpointByDidMessage,
  GetTransactionAuthorAgreementResult,
  GetTransactionAuthorAgreementMessage,
  AcceptTransactionAuthorAgreementResult,
  AcceptTransactionAuthorAgreementMessage,
  AcceptTransactionAuthorAgreementBody
} from '../src'

async function registerNym(
  eventHandler: EventHandler,
  body: RegisterNymBody
): Promise<RegisterNymResult> {
  return new Promise((resolve, reject) => {
    const message: RegisterNymMessage = {
      type: LedgerMessageTypes.REGISER_NYM,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /ledger/register-nym POST api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/ledger/post_ledger_register_nym

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: RegisterNymResult = response.body
      resolve(result)
    })
  })
}

async function getVerkeyByDid(
  eventHandler: EventHandler,
  body: GetVerkeyByDidBody
): Promise<GetVerkeyByDidResult> {
  return new Promise((resolve, reject) => {
    const message: GetVerkeyByDidMessage = {
      type: LedgerMessageTypes.GET_VERKEY_BY_DID,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /ledger/did-verkey api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/ledger/get_ledger_did_verkey

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetVerkeyByDidResult = response.body
      resolve(result)
    })
  })
}

async function getEndpointByDid(
  eventHandler: EventHandler,
  body: GetEndpointByDidBody
): Promise<GetEndpointByDidResult> {
  return new Promise((resolve, reject) => {
    const message: GetEndpointByDidMessage = {
      type: LedgerMessageTypes.GET_ENDPOINT_BY_DID,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /ledger/did-endpoint api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/ledger/get_ledger_did_endpoint

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetEndpointByDidResult = response.body
      resolve(result)
    })
  })
}

async function getTransactionAuthorAgreement(
  eventHandler: EventHandler
): Promise<GetTransactionAuthorAgreementResult> {
  return new Promise((resolve, reject) => {
    const message: GetTransactionAuthorAgreementMessage = {
      type: LedgerMessageTypes.GET_TRANSACTION_AUTHOR_AGREEMENT
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /ledger/taa api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/ledger/get_ledger_taa

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetTransactionAuthorAgreementResult = response.body
      resolve(result)
    })
  })
}

async function acceptTransactionAuthorAgreement(
  eventHandler: EventHandler,
  body: AcceptTransactionAuthorAgreementBody
): Promise<AcceptTransactionAuthorAgreementResult> {
  return new Promise((resolve, reject) => {
    const message: AcceptTransactionAuthorAgreementMessage = {
      type: LedgerMessageTypes.ACCEPT_TRANSACTION_AUTHOR_AGREEMENT,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /ledger/taa/accept POST api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/ledger/post_ledger_taa_accept

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: AcceptTransactionAuthorAgreementResult = response.body
      resolve(result)
    })
  })
}

export {
  registerNym,
  getVerkeyByDid,
  getEndpointByDid,
  getTransactionAuthorAgreement,
  acceptTransactionAuthorAgreement
}

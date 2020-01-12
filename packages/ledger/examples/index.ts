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

import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  LedgerController,
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

const ACA_URL = 'http://ula.test:7002'
const ledgerController = new LedgerController(ACA_URL)
const eventHandler = new EventHandler([ledgerController])

async function registerNym(
  options: RegisterNymBody
): Promise<RegisterNymResult> {
  return new Promise((resolve, reject) => {
    const message: RegisterNymMessage = {
      type: LedgerMessageTypes.REGISER_NYM,
      body: options
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
  options: GetVerkeyByDidBody
): Promise<GetVerkeyByDidResult> {
  return new Promise((resolve, reject) => {
    const message: GetVerkeyByDidMessage = {
      type: LedgerMessageTypes.GET_VERKEY_BY_DID,
      body: options
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
  options: GetEndpointByDidBody
): Promise<GetEndpointByDidResult> {
  return new Promise((resolve, reject) => {
    const message: GetEndpointByDidMessage = {
      type: LedgerMessageTypes.GET_ENDPOINT_BY_DID,
      body: options
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

async function getTransactionAuthorAgreement(): Promise<
  GetTransactionAuthorAgreementResult
> {
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
  options: AcceptTransactionAuthorAgreementBody
): Promise<AcceptTransactionAuthorAgreementResult> {
  return new Promise((resolve, reject) => {
    const message: AcceptTransactionAuthorAgreementMessage = {
      type: LedgerMessageTypes.ACCEPT_TRANSACTION_AUTHOR_AGREEMENT,
      body: options
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

async function run(): Promise<void> {
  const did = 'Jg8A9jr6xqJaUu9tfKoE2t'
  const verkey = 'AdjAyGcJ7gBGGuKX5TofZnQAAFVr3AeLxHeFKQrW3ZvS'

  const result = await registerNym({
    did,
    verkey
  })
  console.log('Register Nym success: ', result.success)

  const getVerkeyResult = await getVerkeyByDid({
    did
  })
  console.log('Verkey: ', getVerkeyResult.verkey)

  const getEndpointResult = await getEndpointByDid({
    did
  })
  console.log('Endpoint: ', getEndpointResult.endpoint)

  const transactionAuthorAgreement = await getTransactionAuthorAgreement()
  console.log('Transaction author agreement: ', transactionAuthorAgreement)

  // Only accept TAA when required
  if (transactionAuthorAgreement.result.taa_required) {
    // TODO: Add correct example for accepting TAA.
    // Ledger needs to have a TAA, you can publish this with
    // the ledger api from the indy sdk
    const acceptTransactionAuthorAgreementResult = await acceptTransactionAuthorAgreement(
      {
        mechanism: '',
        text: '',
        version: ''
      }
    )
    console.log('Accept TAA result:', acceptTransactionAuthorAgreementResult)
  }
}

run().catch(e => {
  console.log(e)
})

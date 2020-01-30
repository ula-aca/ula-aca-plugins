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

import { EventHandler } from 'universal-ledger-agent'
import { logEvent } from '@ula-aca/test-utils'
import {
  LedgerController,
  RegisterNymBody,
  LedgerMessageTypes,
  GetVerkeyByDidBody,
  GetEndpointByDidBody,
  AcceptTransactionAuthorAgreementBody
} from '../src'
import {
  registerNym,
  getVerkeyByDid,
  getEndpointByDid,
  getTransactionAuthorAgreement,
  acceptTransactionAuthorAgreement
} from '.'

async function run(): Promise<void> {
  const ledgerController = new LedgerController(process.env.FABER_ACA_URL)
  const eventHandler = new EventHandler([ledgerController])

  // TODO: generate did from wallet
  const did = 'QhhWDukEVmDfLjPX6tU7j'
  const verkey = 'DvFvdXxY2wPAXTqFFEyKYmXEAzvbXHSGuaG7CfZjkMR'

  // --- REGISER_NYM ---
  const registerNymBody: RegisterNymBody = {
    did,
    verkey
  }
  const result = await registerNym(eventHandler, registerNymBody)
  logEvent({
    type: LedgerMessageTypes.REGISER_NYM,
    input: registerNymBody,
    output: result
  })

  // --- GET_VERKEY_BY_DID ---
  const getVerkeyByDidBody: GetVerkeyByDidBody = {
    did
  }
  const getVerkeyResult = await getVerkeyByDid(eventHandler, getVerkeyByDidBody)
  logEvent({
    type: LedgerMessageTypes.GET_VERKEY_BY_DID,
    input: getVerkeyByDidBody,
    output: getVerkeyResult
  })

  // --- GET_ENDPOINT_BY_DID ---
  const getEndpointByDidBody: GetEndpointByDidBody = {
    did
  }
  const getEndpointResult = await getEndpointByDid(
    eventHandler,
    getEndpointByDidBody
  )
  logEvent({
    type: LedgerMessageTypes.GET_ENDPOINT_BY_DID,
    input: getEndpointByDidBody,
    output: getEndpointResult
  })

  // --- GET_TRANSACTION_AUTHOR_AGREEMENT ----
  const transactionAuthorAgreement = await getTransactionAuthorAgreement(
    eventHandler
  )
  logEvent({
    type: LedgerMessageTypes.GET_TRANSACTION_AUTHOR_AGREEMENT,
    output: transactionAuthorAgreement
  })

  // --- ACCEPT_TRANSACTION_AUTHOR_AGREEMENT ---
  // Only accept TAA when required
  if (transactionAuthorAgreement.result.taa_required) {
    // TODO: Add correct example for accepting TAA.
    // Ledger needs to have a TAA, you can publish this with
    // the ledger api from the indy sdk
    const acceptTransactionAuthorAgreementBody: AcceptTransactionAuthorAgreementBody = {
      mechanism: '',
      text: '',
      version: ''
    }
    const acceptTransactionAuthorAgreementResult = await acceptTransactionAuthorAgreement(
      eventHandler,
      acceptTransactionAuthorAgreementBody
    )
    logEvent({
      type: LedgerMessageTypes.ACCEPT_TRANSACTION_AUTHOR_AGREEMENT,
      input: acceptTransactionAuthorAgreementBody,
      output: acceptTransactionAuthorAgreementResult
    })
  }
}

run().catch(e => {
  console.log(e)
})

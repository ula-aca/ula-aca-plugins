/*
 * Copyright 2020  ula-aca.
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

import { TAAResult } from '@ula-aca/aries-cloudagent-interface'

enum LedgerMessageTypes {
  REGISER_NYM = '@ula-aca/ledger/register-nym',
  GET_VERKEY_BY_DID = '@ula-aca/ledger/get-verkey-by-did',
  GET_ENDPOINT_BY_DID = '@ula-aca/ledger/get-endpoint-by-did',
  GET_TRANSACTION_AUTHOR_AGREEMENT = '@ula-aca/ledger/get-transaction-author-agreement',
  ACCEPT_TRANSACTION_AUTHOR_AGREEMENT = '@ula-aca/ledger/accept-transaction-author-agreement'
}

/* register-nym */
interface RegisterNymPayload {
  did: string
  verkey: string
  alias?: string
  role?: string
}

interface RegisterNymMessage {
  type: LedgerMessageTypes.REGISER_NYM
  payload: RegisterNymPayload
}

type RegisterNymResult = void

/* get-verkey-by-did */
interface GetVerkeyByDidPayload {
  did: string
}

interface GetVerkeyByDidMessage {
  type: LedgerMessageTypes.GET_VERKEY_BY_DID
  payload: GetVerkeyByDidPayload
}

type GetVerkeyByDidResult = void

/* get-endpoint-by-did */
interface GetEndpointByDidPayload {
  did: string
}

interface GetEndpointByDidMessage {
  type: LedgerMessageTypes.GET_ENDPOINT_BY_DID
  payload: GetEndpointByDidPayload
}

type GetEndpointByDidResult = void

/* get-transaction-author-agreement */
interface GetTransactionAuthorAgreementMessage {
  type: LedgerMessageTypes.GET_TRANSACTION_AUTHOR_AGREEMENT
}

type GetTransactionAuthorAgreementResult = TAAResult

/* accept-transaction-author-agreement */
interface AcceptTransactionAuthorAgreementPayload {
  mechanism: string
  version: string
  text: string
}

interface AcceptTransactionAuthorAgreementMessage {
  type: LedgerMessageTypes.ACCEPT_TRANSACTION_AUTHOR_AGREEMENT
  payload: AcceptTransactionAuthorAgreementPayload
}

type AcceptTransactionAuthorAgreementResult = void

type LedgerMessageType =
  | RegisterNymMessage
  | GetVerkeyByDidMessage
  | GetEndpointByDidMessage
  | GetTransactionAuthorAgreementMessage
  | AcceptTransactionAuthorAgreementMessage

function isLedgerMessage(properties): properties is LedgerMessageType {
  return Object.values(LedgerMessageTypes).includes(properties.type)
}

export {
  LedgerMessageType,
  LedgerMessageTypes,
  isLedgerMessage,
  /* register-nym */
  RegisterNymMessage,
  RegisterNymPayload,
  RegisterNymResult,
  /* get-verkey-by-did */
  GetVerkeyByDidMessage,
  GetVerkeyByDidPayload,
  GetVerkeyByDidResult,
  /* get-endpoint-by-did */
  GetEndpointByDidMessage,
  GetEndpointByDidPayload,
  GetEndpointByDidResult,
  /* get-transaction-author-agreement */
  GetTransactionAuthorAgreementMessage,
  GetTransactionAuthorAgreementResult,
  /* accept-transaction-author-agreement */
  AcceptTransactionAuthorAgreementMessage,
  AcceptTransactionAuthorAgreementPayload,
  AcceptTransactionAuthorAgreementResult
}

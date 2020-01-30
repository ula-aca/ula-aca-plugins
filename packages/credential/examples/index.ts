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
  GetCredentialsBody,
  GetCredentialsResult,
  GetCredentialsMessage,
  CredentialMessageTypes,
  GetCredentialByIdBody,
  GetCredentialByIdResult,
  GetCredentialByIdMessage,
  RemoveCredentialBody,
  RemoveCredentialResult,
  RemoveCredentialMessage
} from '../src'

async function getCredentials(
  eventHandler: EventHandler,
  body?: GetCredentialsBody
): Promise<GetCredentialsResult> {
  return new Promise((resolve, reject) => {
    const message: GetCredentialsMessage = {
      type: CredentialMessageTypes.GET_CREDENTIALS,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetCredentialsResult = response.body
      resolve(result)
    })
  })
}

async function getCredentialById(
  eventHandler: EventHandler,
  body: GetCredentialByIdBody
): Promise<GetCredentialByIdResult> {
  return new Promise((resolve, reject) => {
    const message: GetCredentialByIdMessage = {
      type: CredentialMessageTypes.GET_CREDENTIAL_BY_ID,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetCredentialByIdResult = response.body
      resolve(result)
    })
  })
}

async function removeCredential(
  eventHandler: EventHandler,
  body: RemoveCredentialBody
): Promise<RemoveCredentialResult> {
  return new Promise((resolve, reject) => {
    const message: RemoveCredentialMessage = {
      type: CredentialMessageTypes.REMOVE_CREDENTIAL,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: RemoveCredentialResult = response.body
      resolve(result)
    })
  })
}

export { getCredentials, getCredentialById, removeCredential }

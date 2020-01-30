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

import { getCredentials, getCredentialById, removeCredential } from '.'
import {
  CredentialController,
  GetCredentialsBody,
  CredentialMessageTypes,
  GetCredentialByIdBody,
  RemoveCredentialBody
} from '../src'

async function run(): Promise<void> {
  const credentialController = new CredentialController({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    basePath: process.env.ALICE_ACA_URL
  })
  const eventHandler = new EventHandler([credentialController])

  // -- GET_CREDENTIALS -- //
  const getCredentialsBody: GetCredentialsBody = {
    count: '1'
  }
  const credentials = await getCredentials(eventHandler, getCredentialsBody)

  logEvent({
    type: CredentialMessageTypes.GET_CREDENTIALS,
    input: getCredentialsBody,
    output: credentials
  })

  // -- GET_CREDENTIAL_BY_ID -- //
  const getCredentialByIdBody: GetCredentialByIdBody = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    credential_id: credentials.results[0].referent
  }
  const credential = await getCredentialById(
    eventHandler,
    getCredentialByIdBody
  )

  logEvent({
    type: CredentialMessageTypes.GET_CREDENTIAL_BY_ID,
    input: getCredentialByIdBody,
    output: credential
  })

  // -- REMOVE_CREDENTIAL -- //
  const removeCredentialBody: RemoveCredentialBody = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    credential_id: credential.referent
  }
  const removeResult = await removeCredential(
    eventHandler,
    removeCredentialBody
  )

  logEvent({
    type: CredentialMessageTypes.REMOVE_CREDENTIAL,
    input: removeCredentialBody,
    output: removeResult
  })
}

run().catch(e => {
  console.log(e)
})

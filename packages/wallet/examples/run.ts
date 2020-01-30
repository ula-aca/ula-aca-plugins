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
  assignPublicDid,
  createLocalDid,
  fetchPublicDid,
  getDids,
  getTagPolicy,
  setTagPolicy
} from '.'
import {
  WalletController,
  GetDidsBody,
  WalletMessageTypes,
  GetTagPolicyBody,
  SetTagPolicyBody,
  AssignPublicDidBody
} from '../src'

async function run(): Promise<void> {
  const walletController = new WalletController(process.env.FABER_ACA_URL)
  const eventHandler = new EventHandler([walletController])

  // TODO: create credential definition to use
  const credentialDefinitionId =
    'Bqqp9wananY4uW2pRHACiT:3:CL:29:Faber-CollegeDegreeSchema'

  // -- CREATE_LOCAL_DID -- //
  const localDid = await createLocalDid(eventHandler)

  logEvent({
    type: WalletMessageTypes.CREATE_LOCAL_DID,
    output: localDid
  })

  // -- GET_DIDS -- //
  const getDidsBody: GetDidsBody = {
    did: localDid.result.did
  }
  const getDidsResult = await getDids(eventHandler, getDidsBody)

  logEvent({
    type: WalletMessageTypes.GET_DIDS,
    input: getDidsBody,
    output: getDidsResult
  })

  // -- GET_TAG_POLICY -- //
  const getTagPolicyBody: GetTagPolicyBody = {
    credential_definition_id: credentialDefinitionId
  }
  const getTagPolicyResult = await getTagPolicy(eventHandler, getTagPolicyBody)

  logEvent({
    type: WalletMessageTypes.GET_TAG_POLICY,
    input: getTagPolicyBody,
    output: getTagPolicyResult
  })

  // -- SET_TAG_POLICY -- //
  const setTagPolicyBody: SetTagPolicyBody = {
    credential_definition_id: credentialDefinitionId,
    taggables: ['score']
  }
  const setTagPolicyResult = await setTagPolicy(eventHandler, setTagPolicyBody)

  logEvent({
    type: WalletMessageTypes.SET_TAG_POLICY,
    input: setTagPolicyBody,
    output: setTagPolicyResult
  })

  // -- FETCH_PUBLIC_DID -- //
  const publicDidResult = await fetchPublicDid(eventHandler)

  logEvent({
    type: WalletMessageTypes.FETCH_PUBLIC_DID,
    output: publicDidResult
  })

  // -- ASSIGN_PUBLIC_DID -- //
  const assignPublicDidBody: AssignPublicDidBody = {
    did: publicDidResult.result.did
  }
  const assignPublicDidResult = await assignPublicDid(
    eventHandler,
    assignPublicDidBody
  )

  logEvent({
    type: WalletMessageTypes.ASSIGN_PUBLIC_DID,
    input: assignPublicDidBody,
    output: assignPublicDidResult
  })
}

run().catch(e => {
  console.log(e)
})

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

import { ConnectionInvitation } from '@ula-aca/aries-cloudagent-interface'
import {
  ReceiveInvitationBody,
  ConnectionMessageTypes
} from '@ula-aca/connection'
import { receiveInvitation } from '@ula-aca/connection/examples'
import { logEvent } from '@ula-aca/test-utils'

import { readLine, getEventHandler } from '../utils'
import AliceConnectionEventHandler from './event-handlers/AliceConnectionEventHandler'
import AliceIssueCredentialEventHandler from './event-handlers/AliceIssueCredentialEventHandler'
import AlicePresentProofEventHandler from './event-handlers/AlicePresentProofEventHandler'

async function run(): Promise<void> {
  // Webhook Event Handlers
  const aliceConnectionEventHandler = new AliceConnectionEventHandler()
  const aliceIssueCredentialEventHandler = new AliceIssueCredentialEventHandler()
  const alicePresentProofEventHandler = new AlicePresentProofEventHandler()

  const eventHandlerAlice = getEventHandler({
    acaUrl: process.env.ALICE_ACA_URL,
    acaApiKey: process.env.ALICE_ACA_API_KEY,
    acaWhrUrl: process.env.ALICE_ACA_WHR_URL,
    acaWhrApiKey: process.env.ALICE_ACA_WHR_API_KEY,
    webhookEventHandlerPlugins: [
      aliceConnectionEventHandler,
      aliceIssueCredentialEventHandler,
      alicePresentProofEventHandler
    ]
  })

  // --- Get invitation from console input ---
  const invitationString = await readLine('Provide connection invitation: \n')
  const invitation: ConnectionInvitation = JSON.parse(invitationString)

  // --- RECEIVE_INVITATION ---
  const receiveInvitationBody: ReceiveInvitationBody = {
    ...invitation,
    alias: 'Invitation received by Alice from Faber'
  }

  const receivedInvitation = await receiveInvitation(
    eventHandlerAlice,
    receiveInvitationBody
  )
  logEvent({
    type: ConnectionMessageTypes.RECEIVE_INVITATION,
    comment: '#2. Alice receives connection invitation from Faber',
    input: receiveInvitationBody,
    output: receivedInvitation
  })
}

run().catch((err) => console.log(err))

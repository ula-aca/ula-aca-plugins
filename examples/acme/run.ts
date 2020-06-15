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
import AcmeConnectionEventHandler from './event-handlers/AcmeConnectionEventHandler'
import AcmeIssueCredentialEventHandler from './event-handlers/AcmeIssueCredentialEventHandler'
import AcmePresentProofEventHandler from './event-handlers/AcmePresentProofEventHandler'

async function run(): Promise<void> {
  // Webhook Event Handlers
  const acmeConnectionEventHandler = new AcmeConnectionEventHandler()
  const acmeIssueCredentialEventHandler = new AcmeIssueCredentialEventHandler()
  const acmePresentProofEventHandler = new AcmePresentProofEventHandler()

  const eventHandlerAcme = getEventHandler({
    acaUrl: process.env.ACME_ACA_URL,
    acaApiKey: process.env.ACME_ACA_API_KEY,
    acaWhrUrl: process.env.ACME_ACA_WHR_URL,
    acaWhrApiKey: process.env.ACME_ACA_WHR_API_KEY,
    webhookEventHandlerPlugins: [
      acmeConnectionEventHandler,
      acmeIssueCredentialEventHandler,
      acmePresentProofEventHandler
    ]
  })

  // --- Get invitation from console input ---
  const invitationString = await readLine('Provide connection invitation: \n')
  const invitation: ConnectionInvitation = JSON.parse(invitationString)

  // --- RECEIVE_INVITATION ---
  const receiveInvitationBody: ReceiveInvitationBody = {
    ...invitation,
    alias: 'Invitation received by Acme from Alice'
  }

  const receivedInvitation = await receiveInvitation(
    eventHandlerAcme,
    receiveInvitationBody
  )
  logEvent({
    type: ConnectionMessageTypes.RECEIVE_INVITATION,
    comment: '#14. Acme receives connection invitation from Alice',
    input: receiveInvitationBody,
    output: receivedInvitation
  })
}

run().catch((err) => console.log(err))

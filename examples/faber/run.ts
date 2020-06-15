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

import {
  CreateInvitationBody,
  ConnectionMessageTypes
} from '@ula-aca/connection'
import { createInvitation } from '@ula-aca/connection/examples'
import { logEvent } from '@ula-aca/test-utils'

import { getEventHandler } from '../utils'
import FaberConnectionEventHandler from './event-handlers/FaberConnectionEventHandler'
import FaberIssueCredentialEventHandler from './event-handlers/FaberIssueCredentialEventHandler'
import FaberPresentProofEventHandler from './event-handlers/FaberPresentProofEventHandler'

async function run(): Promise<void> {
  // Webhook Event Handlers
  const faberConnectionEventHandler = new FaberConnectionEventHandler()
  const faberIssueCredentialEventHandler = new FaberIssueCredentialEventHandler()
  const faberPresentProofEventHandler = new FaberPresentProofEventHandler()

  const eventHandlerFaber = getEventHandler({
    acaUrl: process.env.FABER_ACA_URL,
    acaApiKey: process.env.FABER_ACA_API_KEY,
    acaWhrUrl: process.env.FABER_ACA_WHR_URL,
    acaWhrApiKey: process.env.FABER_ACA_WHR_API_KEY,
    webhookEventHandlerPlugins: [
      faberConnectionEventHandler,
      faberIssueCredentialEventHandler,
      faberPresentProofEventHandler
    ]
  })

  // --- CREATE_INVITATION ---
  const createInvitationBody: CreateInvitationBody = {
    alias: 'Invitation created by Faber for Alice'
  }
  const createdInvitation = await createInvitation(
    eventHandlerFaber,
    createInvitationBody
  )

  logEvent({
    type: ConnectionMessageTypes.CREATE_INVITATION,
    comment: `#1. Faber creates connection invitation for Alice\n\n${JSON.stringify(
      createdInvitation.invitation
    )}`,
    input: createInvitationBody,
    output: createdInvitation
  })
}

run().catch((err) => console.log(err))

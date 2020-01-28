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

import { EventHandler, UlaResponse, Plugin } from 'universal-ledger-agent'
import { SchemaController } from '@ula-aca/schema'
import { CredentialDefinitionController } from '@ula-aca/credential-definition'
import {
  ConnectionController,
  ConnectionEventHandler
} from '@ula-aca/connection'
import { LedgerController } from '@ula-aca/ledger'
import { WalletController } from '@ula-aca/wallet'
import {
  PresentProofController,
  PresentProofEventHandler
} from '@ula-aca/present-proof'
import {
  IssueCredentialController,
  IssueCredentialEventHandler
} from '@ula-aca/issue-credential'
import { WebhookRelayEventRouter } from '@ula-aca/webhook-relay-event-router'
import { CredentialController } from '@ula-aca/credential'
import TestPresentProofEventHandler from './eventHandlers/TestPresentProofEventHandler'
import TestIssueCredentialEventHandler from './eventHandlers/TestIssueCredentialEventHandler'
import TestConnectionEventHandler from './eventHandlers/TestConnectionEventHandler'

function eventPromise(
  eventHandler: EventHandler,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: { type: string; body?: any }
): Promise<UlaResponse> {
  return new Promise(resolve => {
    eventHandler.processMsg(message, resolve)
  })
}

function getEventHandlerPlugins(): {
  presentProofHandler: PresentProofEventHandler
  issueCredentialHandler: IssueCredentialEventHandler
  connectionHandler: ConnectionEventHandler
} {
  return {
    presentProofHandler: new TestPresentProofEventHandler(),
    issueCredentialHandler: new TestIssueCredentialEventHandler(),
    connectionHandler: new TestConnectionEventHandler()
  }
}

function getEventHandler({
  acaUrl,
  acaWhrUrl,
  acaWhrApiKey,
  eventHandlerPlugins = []
}: {
  acaUrl: string
  acaApiKey?: string
  acaWhrUrl: string
  acaWhrApiKey?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventHandlerPlugins?: Plugin[]
}): EventHandler {
  const plugins = [
    new SchemaController(acaUrl),
    new CredentialDefinitionController(acaUrl),
    new ConnectionController(acaUrl),
    new LedgerController(acaUrl),
    new WalletController(acaUrl),
    new PresentProofController(acaUrl),
    new IssueCredentialController(acaUrl),
    new CredentialController(acaUrl),
    new WebhookRelayEventRouter(acaWhrUrl, {
      headers: {
        Authorization: acaWhrApiKey
      }
    }),
    ...eventHandlerPlugins
  ]

  const eventHandler = new EventHandler(plugins)

  return eventHandler
}

export { getEventHandler, eventPromise, getEventHandlerPlugins }

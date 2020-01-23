import { ConnectionController } from '@ula-aca/connection'
import { SchemaController } from '@ula-aca/schema'
import { WebhookRelayEventRouter } from '@ula-aca/webhook-relay-event-router'
import { EventHandler } from 'universal-ledger-agent'
import { CredentialDefinitionController } from '@ula-aca/credential-definition'
import { IssueCredentialController } from '@ula-aca/issue-credential'
import { PresentProofController } from '@ula-aca/present-proof'
import { CredentialController } from '@ula-aca/credential/src'

function getEventHandler({
  acaUrl,
  acaWhrUrl,
  acaWhrApiKey,
  webhookEventHandlerPlugins = []
}: {
  acaUrl: string
  acaWhrUrl: string
  acaWhrApiKey: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webhookEventHandlerPlugins?: any[]
}): EventHandler {
  // Standard Plugins
  const connectionController = new ConnectionController(acaUrl)
  const schemaController = new SchemaController(acaUrl)
  const issueCredentialController = new IssueCredentialController(acaUrl)
  const presentProofController = new PresentProofController(acaUrl)
  const credentialDefinitionController = new CredentialDefinitionController(
    acaUrl
  )
  const credentialController = new CredentialController(acaUrl)

  const webhookRelay = new WebhookRelayEventRouter(acaWhrUrl, {
    headers: {
      Authorization: acaWhrApiKey
    }
  })

  const eventHandler = new EventHandler([
    schemaController,
    credentialDefinitionController,
    connectionController,
    presentProofController,
    issueCredentialController,
    credentialController,
    webhookRelay,
    ...webhookEventHandlerPlugins
  ])

  return eventHandler
}

export { getEventHandler }

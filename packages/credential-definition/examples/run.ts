import { logEvent } from '@ula-aca/test-utils'
import { EventHandler } from 'universal-ledger-agent'
import {
  createCredentialDefinition,
  getCreatedCredentialDefinitions,
  getCredentialDefinitionById
} from '.'
import {
  CredentialDefinitionController,
  CreateCredentialDefinitionBody,
  CredentialDefinitionMessageTypes,
  GetCreatedCredentialDefinitionsBody,
  GetCredentialDefinitionByIdBody
} from '../src'

async function run(): Promise<void> {
  const credentialDefinitionController = new CredentialDefinitionController(
    process.env.ACA_URL
  )
  const eventHandler = new EventHandler([credentialDefinitionController])

  // --- CREATE_CREDENTIAL_DEFINITION ---
  const createCredentialDefinitionBody: CreateCredentialDefinitionBody = {
    schema_id: 'Bqqp9wananY4uW2pRHACiT:2:Test:1.0',
    tag: 'my-cred-def'
  }
  const createdCredentialDefinition = await createCredentialDefinition(
    eventHandler,
    createCredentialDefinitionBody
  )
  logEvent({
    type: CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION,
    input: createCredentialDefinitionBody,
    output: createdCredentialDefinition
  })

  // --- GET_CREATED_CREDENTIAL_DEFINITIONS ---
  const getCreatedCredentialDefinitionsBody: GetCreatedCredentialDefinitionsBody = {
    credential_definition_id:
      createdCredentialDefinition.credential_definition_id
  }
  const createdCredentialDefinitions = await getCreatedCredentialDefinitions(
    eventHandler,
    getCreatedCredentialDefinitionsBody
  )
  logEvent({
    type: CredentialDefinitionMessageTypes.GET_CREATED_CREDENTIAL_DEFINITIONS,
    input: getCreatedCredentialDefinitionsBody,
    output: createdCredentialDefinitions
  })

  // --- GET_CREDENTIAL_DEFINITION_BY_ID ---
  const getCredentialDefinitionByIdBody: GetCredentialDefinitionByIdBody = {
    credential_definition_id:
      createdCredentialDefinition.credential_definition_id
  }
  const credentialDefinition = await getCredentialDefinitionById(
    eventHandler,
    getCredentialDefinitionByIdBody
  )
  logEvent({
    type: CredentialDefinitionMessageTypes.GET_CREDENTIAL_DEFINITION_BY_ID,
    input: getCredentialDefinitionByIdBody,
    output: credentialDefinition
  })
}

run().catch(e => {
  console.log(e)
})

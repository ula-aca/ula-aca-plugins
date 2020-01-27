import { logEvent } from '@ula-aca/test-utils'
import { EventHandler } from 'universal-ledger-agent'
import { getCredentials, getCredentialById, removeCredential } from '.'

import {
  CredentialController,
  GetCredentialsBody,
  CredentialMessageTypes,
  GetCredentialByIdBody,
  RemoveCredentialBody
} from '../src'

async function run(): Promise<void> {
  const credentialController = new CredentialController(
    process.env.ALICE_ACA_URL
  )
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
